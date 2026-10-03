import os
import asyncio
import httpx
from sqlmodel import Session
from dotenv import load_dotenv

from database import engine
from models import TranscriptRecord

load_dotenv()

API_KEY = os.getenv("GNANI_API_KEY")
BASE_URL = "https://api.vachana.ai"
HEADERS = {"X-API-Key-ID": API_KEY}

async def summarize_transcript_with_llm(client: httpx.AsyncClient, text: str) -> str:
    if not text or not text.strip():
        return "No speech content detected in the recording to summarize."

    prompt = (
        "You are an expert audio transcription analyst. Provide a well-structured summary of the following audio transcript.\n"
        "Format your response in Markdown with two clear sections:\n"
        "### Key Highlights\n"
        "- Bullet points of the most important takeaways\n\n"
        "### Executive Summary\n"
        "A concise 2-3 paragraph explanation of the main discussion.\n\n"
        f"Transcript:\n\"\"\"\n{text}\n\"\"\""
    )

    groq_api_key = os.getenv("GROQ_API_KEY")
    if groq_api_key:
        try:
            res = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={"Authorization": f"Bearer {groq_api_key}"},
                json={
                    "model": "llama-3.3-70b-versatile",
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.3,
                },
                timeout=25.0
            )
            if res.status_code == 200:
                return res.json()["choices"][0]["message"]["content"]
            else:
                print(f"Groq API error ({res.status_code}): {res.text}")
        except Exception as e:
            print(f"Groq summarization failed, falling back: {e}")

    clean_text = text.replace("\n", " ").strip()
    raw_sentences = [s.strip() for s in clean_text.split(".") if len(s.strip()) > 15]
    if not raw_sentences:
        return clean_text[:400]

    highlights = raw_sentences[:min(4, len(raw_sentences))]
    overview = " ".join(raw_sentences[min(4, len(raw_sentences)):min(8, len(raw_sentences))])
    if not overview:
        overview = " ".join(raw_sentences[:min(3, len(raw_sentences))])

    bullets = "\n".join([f"- {h}." for h in highlights])
    return (
        f"### Key Highlights\n"
        f"{bullets}\n\n"
        f"### Executive Summary\n"
        f"{overview}."
    )


async def process_audio_task(record_id: int, file_path: str):
    with Session(engine) as session:
        record = session.get(TranscriptRecord, record_id)
        if not record:
            return
        
        try:
            async with httpx.AsyncClient(timeout=35.0) as client:
                record.status = "uploading_to_gnani"
                session.commit()
                
                config = '{"model":"gnani-prisma-v2.5","language_code":"en-IN","mode":"transcribe"}'
                with open(file_path, "rb") as audio_file:
                    data = {"config": config}
                    files = {"files": (os.path.basename(file_path), audio_file)}
                    
                    res = await client.post(f"{BASE_URL}/stt/v3/batch/jobs", headers=HEADERS, data=data, files=files)
                    res.raise_for_status()
                    gnani_job_id = res.json()["job_id"]
                    record.job_id = gnani_job_id
                    session.commit()
                
                record.status = "processing_audio"
                session.commit()
                
                await asyncio.sleep(5)
                while True:
                    start_res = await client.post(f"{BASE_URL}/stt/v3/batch/jobs/{gnani_job_id}/start", headers=HEADERS)
                    if start_res.status_code == 429:
                        await asyncio.sleep(15)
                        continue
                    start_res.raise_for_status()
                    break

                await asyncio.sleep(10)
                while True:
                    poll_res = await client.get(f"{BASE_URL}/stt/v3/batch/jobs/{gnani_job_id}", headers=HEADERS)
                    if poll_res.status_code == 429:
                        await asyncio.sleep(15)
                        continue
                    poll_res.raise_for_status()
                    
                    status = poll_res.json().get("status")
                    if status in ["COMPLETED", "FAILED", "PARTIAL_FAILURE", "START_FAILED", "CANCELLED"]:
                        break
                    await asyncio.sleep(10)

                if status != "COMPLETED":
                    record.status = f"failed_at_gnani: Speech recognition job ended with status {status}"
                    session.commit()
                    return

                await asyncio.sleep(5)
                files_res = await client.get(f"{BASE_URL}/stt/v3/batch/jobs/{gnani_job_id}/files?status=COMPLETED", headers=HEADERS)
                files_res.raise_for_status()
                files_list = files_res.json().get("data", [])
                if not files_list:
                    raise Exception("No transcript files returned by Gnani ASR")
                
                transcript_url = files_list[0]["transcript_url"]

                text_res = await client.get(transcript_url)
                text_res.raise_for_status()
                full_transcript = text_res.json().get("full_transcript", "")

                record.transcript_text = full_transcript
                record.status = "summarizing"
                session.commit()

                summary = await summarize_transcript_with_llm(client, full_transcript)
                record.summary_text = summary
                record.status = "completed"
                session.commit()

        except httpx.TimeoutException as e:
            record.status = "failed_timeout: Connection to speech recognition service timed out. Please retry."
            session.commit()
            print(f"Background task timeout: {e}")
        except httpx.HTTPStatusError as e:
            code = e.response.status_code
            if code in [401, 403]:
                record.status = "failed_auth: Gnani ASR API Key is unauthorized or expired. Check GNANI_API_KEY in .env."
            elif code == 400:
                record.status = "failed_audio: Audio file rejected by Gnani ASR. The file may be corrupted or in an unsupported codec."
            elif code == 413:
                record.status = "failed_size: File size exceeds external API upload limits."
            else:
                record.status = f"failed_http_{code}: Transcription server returned an error (HTTP {code})."
            session.commit()
            print(f"Background task HTTP error: {e}")
        except Exception as e:
            err_msg = str(e)
            record.status = f"failed: {err_msg[:120]}" if err_msg else "failed: Unknown processing error"
            session.commit()
            print(f"Background task failed: {e}")