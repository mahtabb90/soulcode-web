from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.entries.summary import weekly_summary
from app.db.database import get_db
from app.db.models import Entry
from app.entries.schemas import EntryCreate, EntryOut, CHAKRAS, TYPES
from app.auth.router import get_current_user_email  # we reuse JWT dependency

router = APIRouter(prefix="/entries", tags=["entries"])


@router.post("", response_model=EntryOut, status_code=201)
def create_entry(
    data: EntryCreate,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email),
) -> EntryOut:
    entry_type = data.entry_type.strip().lower()
    chakra = data.chakra.strip().lower()

    if entry_type not in TYPES:
        raise HTTPException(status_code=400, detail="Invalid entry_type")
    if chakra not in CHAKRAS:
        raise HTTPException(status_code=400, detail="Invalid chakra")
    if data.minutes <= 0 or data.minutes > 600:
        raise HTTPException(status_code=400, detail="Invalid minutes")

    entry = Entry(
        user_email=email,
        entry_type=entry_type,
        minutes=data.minutes,
        chakra=chakra,
        note=data.note,
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


@router.get("", response_model=list[EntryOut])
def list_entries(
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email),
) -> list[EntryOut]:
    return (
        db.query(Entry)
        .filter(Entry.user_email == email)
        .order_by(Entry.created_at.desc())
        .all()
    )
    
@router.get("/summary/weekly")
def get_weekly_summary(
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email),
) -> dict:
    return weekly_summary(db=db, user_email=email)