# Backend

# SoulCode Backend

FastAPI-based REST API powering the SoulCode platform.

This service handles authentication, session tracking, weekly aggregation logic, and database interaction.  
It is designed with environment-aware configuration to support both local development and production deployment.

---

## 🏗 Architecture

- FastAPI
- SQLAlchemy (ORM)
- PostgreSQL (production)
- SQLite (local development)
- JWT authentication (python-jose)
- Password hashing (passlib + bcrypt)

---

## 🔐 Authentication Flow

1. User registers → password hashed securely
2. User logs in → JWT access token generated
3. Protected endpoints require `Authorization: Bearer <token>`

---

## 🗄 Database Strategy

The application dynamically switches database based on environment variables:

- **Local** → SQLite (`sqlite:///./soulcode.db`)
- **Production** → PostgreSQL (Render `DATABASE_URL`)

Example logic:

```python
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./soulcode.db")



▶ Run Locally
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload

API available at:

http://127.0.0.1:8000

Swagger docs:

http://127.0.0.1:8000/docs



🌍 Production Deployment

Hosted on Render Web Service

Connected to Render PostgreSQL database

Environment variables managed in cloud

CORS configured for deployed frontend domain

Auto-deploy via GitHub integration



📌 Design Principles

Modular router structure

Clean separation of concerns

Environment-driven configuration

Production-ready database handling

Secure authentication design