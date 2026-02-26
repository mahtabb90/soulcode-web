import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

#  Hämta DATABASE_URL från environment (Render)
DATABASE_URL = os.getenv("DATABASE_URL")

#  Om vi är i production (Postgres finns)
if DATABASE_URL:
    # Render ger ibland postgres:// men SQLAlchemy vill ha postgresql://
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,  # bra för production
    )

#  Annars kör vi SQLite lokalt
else:
    DATABASE_URL = "sqlite:///./soulcode.db"
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False},
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()