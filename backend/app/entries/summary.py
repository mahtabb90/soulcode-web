from datetime import datetime, timedelta, timezone
from collections import Counter

from sqlalchemy.orm import Session

from app.db.models import Entry


def weekly_summary(db: Session, user_email: str) -> dict:
    now = datetime.now(timezone.utc)
    week_ago = now - timedelta(days=7)

    entries = (
        db.query(Entry)
        .filter(Entry.user_email == user_email)
        .filter(Entry.created_at >= week_ago)
        .all()
    )

    total_minutes = sum(e.minutes for e in entries)
    by_type = Counter(e.entry_type for e in entries)
    by_chakra = Counter(e.chakra for e in entries)

    dominant_chakra = by_chakra.most_common(1)[0][0] if by_chakra else None

    return {
        "days": 7,
        "entries": len(entries),
        "total_minutes": total_minutes,
        "minutes_meditation": sum(e.minutes for e in entries if e.entry_type == "meditation"),
        "minutes_yoga": sum(e.minutes for e in entries if e.entry_type == "yoga"),
        "dominant_chakra": dominant_chakra,
        "by_type": dict(by_type),
        "by_chakra": dict(by_chakra),
    }