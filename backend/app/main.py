from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.auth.router import router as auth_router
from app.db.database import Base, engine
from app.db.models import User, Entry
from app.entries.router import router as entries_router

app = FastAPI(title="SoulCode API", version="0.1.0")
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://soulcode-frontend-mahtab.onrender.com",
    ],
    allow_origin_regex=r"^https://.*\.onrender\.com$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(entries_router)


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok", "app": "SoulCode"}