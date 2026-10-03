import os
import re
import asyncio
from collections import Counter
import httpx
from sqlmodel import Session
from dotenv import load_dotenv

from database import engine
from models import TranscriptRecord

load_dotenv()

API_KEY = os.getenv("GNANI_API_KEY")
BASE_URL = "https://api.vachana.ai"
HEADERS = {"X-API-Key-ID": API_KEY}

STOPWORDS = {
    "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", 
    "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", 
    "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", 
    "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", 
    "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", 
    "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", 
    "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", 
    "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", 
    "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", 
    "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", 
    "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", 
    "now", "uh", "um", "ah", "like", "yeah", "okay", "alright", "right", "well", "know", "mean"
}


def _clean_sentence(s: str) -> str:
    s = s.strip(" \t\n\r-\"'`*•")
    if not s:
        return ""
    s = s[0].upper() + s[1:]
    if s[-1] not in ".!?":
        s += "."
    return s


def _split_into_sentences(text: str) -> list[str]:
    cleaned_text = re.sub(r"\s+", " ", text).strip()
    raw_sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", cleaned_text) if s.strip()]

    if len(raw_sentences) <= 1 and len(cleaned_text.split()) > 25:
        words = cleaned_text.split()
        chunk_size = 15
        raw_sentences = [" ".join(words[i:i + chunk_size]) for i in range(0, len(words), chunk_size)]

    processed = []
    for s in raw_sentences:
        formatted = _clean_sentence(s)
        if len(formatted.split()) >= 3:
            processed.append(formatted)
    return processed


def generate_algorithmic_summary(text: str) -> str:
    if not text or not text.strip():
        return "No speech content detected in the recording to summarize."

    sentences = _split_into_sentences(text)
    if not sentences:
        fallback = _clean_sentence(text[:300])
        return f"### Key Highlights\n- {fallback}\n\n### Executive Summary\n{fallback}"

    if len(sentences) <= 2:
        bullets = "\n".join([f"- {s}" for s in sentences])
        body = " ".join(sentences)
        return f"### Key Highlights\n{bullets}\n\n### Executive Summary\n{body}"

    meaningful_words = [
        w.lower() for w in re.findall(r"\b[a-zA-Z]{3,}\b", text) 
        if w.lower() not in STOPWORDS
    ]

    if not meaningful_words:
        highlights = sentences[:min(3, len(sentences))]
        bullets = "\n".join([f"- {h}" for h in highlights])
        return f"### Key Highlights\n{bullets}\n\n### Executive Summary\n{' '.join(sentences)}"

    freq = Counter(meaningful_words)
    max_freq = max(freq.values(), default=1)
    word_weights = {w: count / max_freq for w, count in freq.items()}

    scored_sentences = []
    for i, sent in enumerate(sentences):
        sent_words = [
            w.lower() for w in re.findall(r"\b[a-zA-Z]{3,}\b", sent) 
            if w.lower() not in STOPWORDS
        ]
        if not sent_words:
            scored_sentences.append((0.0, i, sent))
            continue

        raw_score = sum(word_weights.get(w, 0.0) for w in sent_words)
        score = raw_score / (len(sent_words) ** 0.55)

        if i == 0:
            score *= 1.25
        elif i == len(sentences) - 1:
            score *= 1.10

        scored_sentences.append((score, i, sent))

    ranked = sorted(scored_sentences, key=lambda x: x[0], reverse=True)

    num_highlights = min(4, max(2, len(sentences) // 3))
    highlight_indices = {item[1] for item in ranked[:num_highlights]}
    highlights = [sent for i, sent in enumerate(sentences) if i in highlight_indices]

    num_summary = min(6, max(3, len(sentences) // 2))
    summary_indices = {item[1] for item in ranked[:num_summary]}
    summary_sentences = [sent for i, sent in enumerate(sentences) if i in summary_indices]

    bullets = "\n".join([f"- {h}" for h in highlights])

    if len(summary_sentences) > 4:
        half = len(summary_sentences) // 2
        p1 = " ".join(summary_sentences[:half])
        p2 = " ".join(summary_sentences[half:])
        overview = f"{p1}\n\n{p2}"
    else:
        overview = " ".join(summary_sentences)

    return f"### Key Highlights\n{bullets}\n\n### Executive Summary\n{overview}"


async def summarize_transcript_with_llm(client: httpx.AsyncClient, text: str) -> str:
    if not text or not text.strip():
        return "No speech content detected in the recording to summarize."

    groq_api_key = os.getenv("GROQ_API_KEY")
    if groq_api_key:
        prompt = (
            "You are an expert audio transcription analyst. Provide a well-structured summary of the following audio transcript.\n"
            "Format your response in Markdown with two clear sections:\n"
            "### Key Highlights\n"
            "- Bullet points of the most important takeaways\n\n"
            "### Executive Summary\n"
            "A concise 2-3 paragraph explanation of the main discussion.\n\n"
            f"Transcript:\n\"\"\"\n{text}\n\"\"\""
        )
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
                print(f"Groq API returned HTTP {res.status_code}: {res.text}. Falling back to algorithmic summarizer.")
        except Exception as e:
            print(f"Groq summarization request failed ({e}). Falling back to algorithmic summarizer.")

    return generate_algorithmic_summary(text)


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