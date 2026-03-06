# React + Vite

---

# 🎨 `frontend/README.md`

```markdown
# SoulCode Frontend

React + Vite frontend for the SoulCode platform.

This client application provides a chakra-inspired interface for tracking wellness data and visualizing energy patterns.

---

## 🧠 Core Features

- Register & Login (JWT-based)
- Protected dashboard routes
- Chakra-themed UI
- Weekly insight summary
- Custom SVG 7-day trend visualization
- Animated landing page

---

## 🏗 Architecture

- React (Vite)
- React Router
- Fetch-based API client
- Environment-based API configuration
- Production rewrite rule for routing

---

## 🌍 Environment Configuration

API base URL is environment-driven:


VITE_API_URL=https://your-backend.onrender.com


Local fallback:

http://localhost:8000


---

## ▶ Run Locally

```bash
cd frontend
npm install
npm run dev

App runs at:

http://localhost:5173


🚀 Production Deployment

Hosted as Render Static Site

Built with npm run build

Publish directory: dist

Rewrite rule:

/* → /index.html (200)

This ensures React Router works correctly in production.

🎨 Design Philosophy

The UI is intentionally designed to blend:

Minimalist structure

Energy-inspired color system

Data-driven feedback

Emotional + analytical experience

SoulCode demonstrates how frontend architecture and visual identity can support behavioral awareness systems.
