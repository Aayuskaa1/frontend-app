# Full-Stack Monorepo

A Sprint 36A-style reference project with an Express + MongoDB backend and a Next.js 16 frontend.

## Structure

```
├── README.md
├── backend/    # Express + TypeScript + MongoDB API
└── frontend/   # Next.js 16 + React 19 frontend
```

## Prerequisites

- Node.js 20+
- MongoDB running locally (default: `mongodb://localhost:27017/class-36a-db`)

## Quick Start (from repo root)

```bash
# Install dependencies once
npm install --prefix backend
npm install --prefix frontend

# Terminal 1 — API (port 8089)
npm run dev:backend

# Terminal 2 — Next.js (port 3000)
npm run dev
```

## Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Server runs at `http://localhost:8089`.

## Frontend Setup

```bash
cd frontend
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8089" > .env.local
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Auth Flow

1. Register at `/register`
2. Login at `/login`
3. Redirect to `/dashboard` with cookie-based session
