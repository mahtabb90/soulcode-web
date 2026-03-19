from fastapi import APIRouter, Depends, HTTPException, status
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
    
@router.get("/{entry_id}", response_model=EntryOut)
def get_entry(
    entry_id: int,
    db: Session = Depends(get_db),
    current_user_email=Depends(get_current_user_email),
):
    entry = (
        db.query(Entry)
        .filter(Entry.id == entry_id, Entry.user_email == current_user_email)
        .first()
    )

    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entry not found",
        )

    return entry


@router.put("/{entry_id}", response_model=EntryOut)
def update_entry(
    entry_id: int,
    payload: EntryCreate,
    db: Session = Depends(get_db),
    current_user_email=Depends(get_current_user_email),
):
    entry = (
        db.query(Entry)
        .filter(Entry.id == entry_id, Entry.user_email == current_user_email)
        .first()
    )

    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entry not found",
        )

    entry.entry_type = payload.entry_type
    entry.minutes = payload.minutes
    entry.chakra = payload.chakra
    entry.note = payload.note

    db.commit()
    db.refresh(entry)
    return entry


@router.delete("/{entry_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_entry(
    entry_id: int,
    db: Session = Depends(get_db),
    current_user_email=Depends(get_current_user_email),
):
    entry = (
        db.query(Entry)
        .filter(Entry.id == entry_id, Entry.user_email == current_user_email)
        .first()
    )

    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entry not found",
        )

    db.delete(entry)
    db.commit()    
    
@router.get("/summary/weekly")
def get_weekly_summary(
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user_email),
) -> dict:
    return weekly_summary(db=db, user_email=email)