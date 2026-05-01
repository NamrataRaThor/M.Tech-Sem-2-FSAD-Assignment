# StudySync Campus

A cinematic, microservice-based web application designed to elevate the campus learning experience. "Where dreams collaborate."

![StudySync Dream Edition](production_artifacts/studysync_dream_overhaul_mockup_1777650479198.png)

## Overview
StudySync Campus is a comprehensive student dashboard featuring smart group matching, resource booking, and activity tracking. It leverages a modern microservices architecture on the backend and a highly polished, GSAP-animated frontend.

## Key Features
- **Cinematic UI**: "Dream Edition" aesthetics with bronze auroras, film grain, and glassmorphism.
- **Microservices Backend**: 6 independently deployable Node.js services (API Gateway, Auth, User, Group, Booking, Notification).
- **Secure Authentication**: JWT-based auth with HTTP-only cookies and bcrypt password hashing.
- **Robust Data Layer**: PostgreSQL database managed via Prisma ORM.

## Quick Start

1. **Clone & Install**
   ```bash
   npm install
   ```
2. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
3. **Start Database**
   ```bash
   docker compose up -d postgres
   ```
4. **Run Application (Monorepo)**
   ```bash
   npm run dev
   ```
   *The frontend will be available at `http://localhost:5173` and the API at `http://localhost:3000`.*

## Documentation Directory
Extensive documentation is located in the `docs/` folder:
- **[Architecture & ERD](docs/ARCHITECTURE.md)**
- **[API Specs](docs/API_DOCUMENTATION.md)**
- **[Component Hierarchy](docs/COMPONENT_HIERARCHY.md)**
- **[Local Setup & Env Config](docs/SETUP_GUIDE.md)**
- **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)**

## Project Structure
```text
├── apps/
│   ├── api-gateway/       # Express proxy
│   ├── auth-service/      # JWT & bcrypt logic
│   ├── user-service/      # Profile & Feed logic
│   ├── group-service/     # Matchmaking logic
│   ├── booking-service/   # Resource allocation
│   ├── notification-service/
│   └── frontend/          # React + Vite + Tailwind UI
├── packages/
│   └── shared/            # Prisma schema, Zod validators, utils
├── docs/                  # Documentation & Architecture
└── tools/                 # Playwright automation & capture scripts
```

## Built With
- **Frontend**: React 18, Vite, TailwindCSS, Framer Motion, React Query, Zustand.
- **Backend**: Node.js, Express, Prisma, Zod, PostgreSQL, Docker.