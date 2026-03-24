# 🌌 SoulCode

**Full-stack AI-inspired wellness platform**
Where spirituality meets technology.

---

## 🚀 Overview

SoulCode is a full-stack application that transforms subjective wellness experiences into structured, analyzable data.

Users can track meditation and yoga sessions, visualize trends, and explore energy patterns through a chakra-based system.

---

## 🧠 Tech Stack

**Backend**

* FastAPI
* SQLAlchemy
* PostgreSQL (Neon)
* JWT Authentication (python-jose)
* Password hashing (passlib / bcrypt)

**Frontend**

* React (Vite)
* React Router
* TailwindCSS
* Custom SVG data visualization

**Deployment**

* Render (Web Service + Static Site)
* Neon PostgreSQL
* Environment-based configuration

---

## 🔐 Authentication

* JWT-based authentication
* Secure password hashing
* Protected API routes
* Token-based authorization

---

## 📊 Features

* User registration & login
* Create wellness entries (meditation / yoga)
* Chakra-based categorization
* Weekly summary analytics
* Dynamic 7-day trend visualization
* Production deployment (cloud)

---

## 🏗️ Architecture

React → FastAPI → SQLAlchemy → PostgreSQL

---

## 🌍 Live Demo

Frontend:
https://soulcode-frontend-mahtab.onrender.com

API Docs:
https://soulcode-api-mahtab.onrender.com/docs

---

## ⚙️ Local Setup

```bash
# Clone repo
git clone https://github.com/mahtabb90/soulcode-web.git
cd soulcode-web

# Backend
cd backend
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd ../frontend
npm install
npm run dev
```

---

## 💡 Future Improvements

* AI-generated insights (LLM)
* CI/CD pipeline
* Docker support
* Role-based access

---

## 👩‍💻 Author

**Mahtab Nezam**
AI Developer (Python, AI, Fullstack)

---

## ✨ Philosophy

Technology can help humans understand themselves better.
