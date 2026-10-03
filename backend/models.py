from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, timezone

def get_utc_now() -> datetime:
    return datetime.now(timezone.utc)

class TranscriptRecord(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    job_id: Optional[str] = Field(default=None, index=True)
    status: str
    filename: Optional[str] = None
    transcript_text: Optional[str] = None
    summary_text: Optional[str] = None
    created_at: Optional[datetime] = Field(default_factory=get_utc_now)


