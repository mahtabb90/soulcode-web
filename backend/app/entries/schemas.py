from datetime import datetime
from pydantic import BaseModel

CHAKRAS = {"root", "sacral", "solar", "heart", "throat", "third", "crown"}
TYPES = {"meditation", "yoga"}


class EntryCreate(BaseModel):
    entry_type: str
    minutes: int
    chakra: str
    note: str | None = None


class EntryOut(BaseModel):
    id: int
    user_email: str
    entry_type: str
    minutes: int
    chakra: str
    note: str | None
    created_at: datetime

    class Config:
        from_attributes = True