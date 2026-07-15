# Stryper Interior & Infra — Full Stack Project

## Project Structure

```
stryper--infra/
├── frontend/    ← React + Vite frontend (TailwindCSS, Framer Motion)
└── backend/     ← Node.js + Express REST API (SQLite, JWT, Multer)
```

---

## 🚀 Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```
Opens at **http://localhost:5173**

---

### Backend

```bash
cd backend
npm install
npm run dev     # (uses nodemon for hot reload)
# or
npm start       # (production)
```
API runs at **http://localhost:3001**

> Copy `backend/.env.example` to `backend/.env` and fill in your values before starting.

---

## 🔌 API Overview

| Resource | Endpoint | Public | Admin |
|---|---|---|---|
| Projects | `/api/projects` | GET | POST, DELETE |
| Blogs | `/api/blogs` | GET | POST, DELETE |
| Testimonials | `/api/testimonials` | GET | POST, DELETE |
| Inquiries | `/api/inquiries` | POST | GET, PATCH, DELETE |
| Careers | `/api/careers` | POST | GET, PATCH, DELETE |
| Notifications | `/api/notifications` | — | ALL |
| Stats | `/api/stats` | POST /increment | GET |
| Auth | `/api/auth/login` | POST | — |
| Upload | `/api/upload/image` | — | POST |
| Upload | `/api/upload/resume` | POST | — |

### Admin Authentication
Send `Authorization: Bearer <token>` header with your JWT for all admin routes.

Get a token via:
```
POST /api/auth/login
{ "password": "infra@@2026" }
```

---

## 🗄️ Database

SQLite file stored at `backend/db/stryper.db` (auto-created on first run).  
Pre-seeded with 8 projects, 6 testimonials, 3 blogs, 2 sample inquiries, and 1 career application.

---

## 📁 Uploaded Files

All uploads stored in `backend/uploads/`:
- `uploads/images/` — project/blog images
- `uploads/resumes/` — career application resumes

Served statically at `http://localhost:3001/uploads/...`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, TailwindCSS v4, Framer Motion |
| Backend | Node.js, Express 4 |
| Database | SQLite (better-sqlite3) |
| Auth | JWT (jsonwebtoken) |
| File Upload | Multer |
