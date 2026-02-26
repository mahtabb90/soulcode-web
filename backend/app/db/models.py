from datetime import datetime, timezone

from sqlalchemy import Integer, String, DateTime, Text
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class Entry(Base):
    __tablename__ = "entries"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_email: Mapped[str] = mapped_column(String(255), index=True)

    entry_type: Mapped[str] = mapped_column(String(50))  # meditation | yoga
    minutes: Mapped[int] = mapped_column(Integer)

    chakra: Mapped[str] = mapped_column(String(50))  # root/sacral/...
    note: Mapped[str | None] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )