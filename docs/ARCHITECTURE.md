# Architecture Overview

## System Architecture

The School Equipment Lending Portal follows a **Consolidated Monolith Architecture** for simplicity, rapid deployment, and easier maintenance. It combines all core logic into a single backend service that interacts with a central PostgreSQL database.

```mermaid
graph TD
    Client[Frontend (React/Vite)] -->|HTTP/REST| Backend[Backend Service (Express)]
    Backend -->|ORM| Prisma[Prisma Client]
    Prisma -->|SQL| DB[(PostgreSQL)]
    
    subgraph "Backend Modules"
    Auth[Auth & Roles]
    Inv[Inventory Management]
    Req[Lending Requests]
    end
    
    Backend --- Auth
    Backend --- Inv
    Backend --- Req

    style Backend fill:#f9f,stroke:#333,stroke-width:2px
    style DB fill:#ff9,stroke:#333,stroke-width:2px
```

## Technology Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion ("Dream Edition" visual overhaul)
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM v6

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Database Engine**: PostgreSQL (Dockerized)
- **Authentication**: JWT (JSON Web Tokens) with Role-Based Access Control (RBAC)

## Core Logic Modules

1. **Auth Module**: Manages user registration (Student/Staff/Admin) and secure JWT authentication.
2. **Inventory Module**: Handles the equipment catalog, tracking item conditions and availability.
3. **Lending Module**: Manages the lifecycle of requests (Pending -> Approved -> Returned).
