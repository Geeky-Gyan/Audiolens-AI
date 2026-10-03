import os
import shutil
from contextlib import asynccontextmanager
from fastapi import FastAPI, UploadFile, File, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Session, select
from fastapi.responses import FileResponse

from database import engine
from models import TranscriptRecord
from workers import process_audio_task

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOADS_DIR = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOADS_DIR, exist_ok=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    os.makedirs(UPLOADS_DIR, exist_ok=True)
    yield

app = FastAPI(title="Audio Transcription API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/upload")
async def upload_audio(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    with Session(engine) as session:
        new_record = TranscriptRecord(status="received", filename=file.filename)
        session.add(new_record)
        session.commit()
        session.refresh(new_record)

    file_path = os.path.join(UPLOADS_DIR, f"{new_record.id}_{file.filename}")
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    background_tasks.add_task(process_audio_task, new_record.id, file_path)

    return {"message": "Upload successful", "record_id": new_record.id}


@app.get("/api/status/{record_id}")
def get_status(record_id: int):
    with Session(engine) as session:
        record = session.get(TranscriptRecord, record_id)
        if not record:
            raise HTTPException(status_code=404, detail="Record not found")
            
        return {
            "record_id": record.id,
            "status": record.status,
            "filename": record.filename,
            "transcript_text": record.transcript_text,
            "summary_text": record.summary_text,
            "created_at": record.created_at
        }


@app.get("/api/records")
def list_records():
    with Session(engine) as session:
        statement = select(TranscriptRecord).order_by(TranscriptRecord.id.desc())
        records = session.exec(statement).all()
        return records


@app.get("/api/records/{record_id}")
def get_record(record_id: int):
    with Session(engine) as session:
        record = session.get(TranscriptRecord, record_id)
        if not record:
            raise HTTPException(status_code=404, detail="Record not found")
        return record


@app.delete("/api/records")
def clear_all_records():
    with Session(engine) as session:
        statement = select(TranscriptRecord)
        records = session.exec(statement).all()
        for record in records:
            if record.filename:
                file_path = os.path.join(UPLOADS_DIR, f"{record.id}_{record.filename}")
                if os.path.exists(file_path):
                    try:
                        os.remove(file_path)
                    except Exception:
                        pass
            session.delete(record)
        session.commit()
        return {"message": "All records cleared successfully", "count": len(records)}

@app.delete("/api/records/{record_id}")
def delete_record(record_id: int):
    with Session(engine) as session:
        record = session.get(TranscriptRecord, record_id)
        if not record:
            raise HTTPException(status_code=404, detail="Record not found")
        
        if record.filename:
            file_path = os.path.join(UPLOADS_DIR, f"{record.id}_{record.filename}")
            if os.path.exists(file_path):
                try:
                    os.remove(file_path)
                except Exception:
                    pass
        
        session.delete(record)
        session.commit()
        return {"message": "Record deleted successfully", "id": record_id}


@app.get("/api/audio/{record_id}")
def get_audio_file(record_id: int):
    with Session(engine) as session:
        record = session.get(TranscriptRecord, record_id)
        if not record or not record.filename:
            raise HTTPException(status_code=404, detail="Record not found")
        
        file_path = os.path.join(UPLOADS_DIR, f"{record.id}_{record.filename}")
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="Audio file not found on disk")
        
        return FileResponse(file_path)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
