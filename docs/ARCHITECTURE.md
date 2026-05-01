# Architecture Overview

## System Architecture

StudySync Campus is built using a **Microservices Architecture** pattern to ensure scalability, independent deployability, and clear separation of concerns.

```mermaid
graph TD
    Client[Frontend (React/Vite)] -->|HTTP| Gateway[API Gateway (Express)]
    
    Gateway -->|Proxy| Auth[Auth Service]
    Gateway -->|Proxy| User[User Service]
    Gateway -->|Proxy| Group[Group Service]
    Gateway -->|Proxy| Booking[Booking Service]
    Gateway -->|Proxy| Notif[Notification Service]

    Auth --> DB[(PostgreSQL)]
    User --> DB
    Group --> DB
    Booking --> DB
    Notif --> DB

    style Gateway fill:#f9f,stroke:#333,stroke-width:2px
    style DB fill:#ff9,stroke:#333,stroke-width:2px
```

## Technology Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS, PostCSS
- **Animations**: Framer Motion, GSAP ("Dream Edition" visual overhaul)
- **State Management**: Zustand (Global), React Query (Server State)
- **Routing**: React Router DOM v6

### Backend Microservices
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Database Engine**: PostgreSQL 15 (Dockerized)
- **Validation**: Zod
- **Authentication**: JWT (JSON Web Tokens) via HttpOnly cookies.

## Microservice Breakdown

1. **API Gateway (`:3000`)**: Acts as the single entry point. Handles JWT verification, CORS, and request proxying using `http-proxy-middleware`.
2. **Auth Service (`:3001`)**: Manages user registration, login, password hashing (bcrypt), and token generation.
3. **User Service (`:3002`)**: Manages user profiles, biographies, and activity feeds.
4. **Group Service (`:3003`)**: Manages study groups and peer matching.
5. **Booking Service (`:3004`)**: Handles physical resource allocation (rooms, equipment) and prevents scheduling conflicts.
6. **Notification Service (`:3005`)**: Manages system alerts and reminders for upcoming bookings or group activities.

## Data Isolation
While a single physical PostgreSQL instance is used in development for ease of setup, Prisma schemas are namespaced, representing logical separation of concerns. In a production environment, each service could connect to its own isolated database instance.
