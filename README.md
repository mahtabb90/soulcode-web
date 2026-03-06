# soulcode-web

🌌 SoulCode
Where spirituality meets technology.

A full-stack AI-inspired wellness platform designed to help users decode their inner energy patterns through structured tracking, data visualization, and secure authentication.

✨ Vision

SoulCode is more than a wellness tracker.
It is a system for transforming subjective energy into structured, analyzable data.

The platform bridges:

🧘 Spiritual awareness (chakras, reflection, presence)

📊 Data structure (tracked sessions, minutes, categories)

🔐 Secure architecture (JWT authentication)

🚀 Production deployment (cloud-hosted fullstack application)

SoulCode demonstrates how emotional and spiritual experiences can be modeled through clean software architecture.

🏗️ Architecture Overview

SoulCode is built as a production-ready fullstack application.

Frontend (React + Vite)
        ↓
REST API (FastAPI)
        ↓
PostgreSQL (Render Cloud Database)
Environments
Environment	Backend	Database	Purpose
Local	FastAPI (uvicorn)	SQLite	Development
Production	FastAPI (Render Web Service)	PostgreSQL (Render DB)	Live deployment

The application automatically switches database based on environment variables.

🔐 Authentication System

JWT-based authentication

Secure password hashing (bcrypt via passlib)

Protected API routes

Token stored client-side (localStorage)

CORS configured for production frontend domain

Auth Flow:

User registers → password hashed

User logs in → receives JWT access token

Protected endpoints require Authorization: Bearer <token>

📊 Core Features
✅ User Authentication

Register

Login

Token validation

/auth/me endpoint

✅ Energy Tracking

Create session entries

Type (meditation / yoga)

Minutes

Chakra category

Optional note

✅ Weekly Summary Engine

Aggregated total minutes

Session count

Dominant chakra detection

✅ Trend Visualization

Custom SVG 7-day energy graph

Dynamic data rendering

Chakra-inspired UI theme

✅ Production Deployment

Backend deployed on Render Web Service

Frontend deployed as Static Site

PostgreSQL cloud database

Environment-based configuration

CORS hardened for production

React Router rewrite rules configured

🧠 Technical Stack
Backend

FastAPI

SQLAlchemy (ORM)

PostgreSQL (production)

SQLite (local development)

python-jose (JWT)

passlib (bcrypt hashing)

Uvicorn

Frontend

React (Vite)

React Router

Chakra-inspired UI design

Custom animated landing page

Custom SVG chart rendering

Fetch-based API client with env-based base URL

Deployment & DevOps

Render (Web Service + Static Site)

Environment Variables

Production CORS configuration

Case-sensitive production debugging

Postgres driver management (psycopg2-binary)

Git-based auto deployment workflow

🌍 Live Application

Frontend:
👉 https://soulcode-frontend-mahtab.onrender.com

Backend API Docs:
👉 https://soulcode-api-mahtab.onrender.com/docs

⚙️ Local Development
1️⃣ Clone repository
git clone https://github.com/mahtabb90/soulcode-web.git
cd soulcode-web
2️⃣ Backend setup
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend runs on:

http://127.0.0.1:8000
3️⃣ Frontend setup
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🗄️ Database Strategy

The application uses environment-based configuration:

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./soulcode.db")

Local → SQLite

Production → PostgreSQL (Render Internal URL)

This allows seamless switching between development and production without modifying business logic.

🔄 Deployment Workflow

Develop locally

Test locally (SQLite)

Push to GitHub

Render auto-builds:

Installs dependencies

Connects to PostgreSQL

Runs uvicorn

Application becomes live

Frontend:

Built with npm run build

Deployed as static site

Rewrite rule /* → /index.html for React Router

💡 Design Philosophy

SoulCode is intentionally built with:

Clean separation of concerns

Modular router structure

ORM abstraction

Environment-aware configuration

Cloud-native deployment

User-centered UI

It demonstrates not only coding ability, but architectural thinking.

🚀 Future Improvements

AI-based weekly insights (LLM integration)

Persistent disk monitoring

Role-based user profiles

API rate limiting

CI/CD testing pipeline

Dockerized deployment

👩‍💻 Author

Mahtab Nezam
AI Developer Student
Passionate about the intersection of technology, psychology, and inner systems.

🧭 Final Note

SoulCode represents a core belief:

Technology can help humans understand themselves better.

It is not only a tracking system.
It is a structured reflection engine.