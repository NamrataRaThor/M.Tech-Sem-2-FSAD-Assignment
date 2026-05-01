# Local Setup Guide

Follow these instructions to run the StudySync Campus microservices and frontend on your local development machine.

## Prerequisites
- **Node.js**: v18 or v20
- **npm**: v9+
- **Docker & Docker Compose**: Required for running the PostgreSQL database.

## 1. Environment Configuration
Copy the sample environment file to the root.
```bash
cp .env.example .env
```
Ensure `.env` contains the `DATABASE_URL` pointing to the local Docker database.
See `ENVIRONMENT_CONFIG.md` for detailed variable explanations.

## 2. Start Infrastructure
Start the PostgreSQL database and pgAdmin interface using Docker Compose.
```bash
docker compose up -d postgres pgadmin
```
*(Wait a few seconds for the database to initialize).*

## 3. Install Dependencies
Install dependencies for all workspaces (frontend, backend services, shared packages) from the root.
```bash
npm install
```

## 4. Database Schema Generation
Generate the Prisma client for the shared package. The backend services rely on `@studysync/shared` for database access.
```bash
npm run build --workspace=@studysync/shared
```

## 5. Start the Application
Run the entire stack concurrently using npm workspaces.
```bash
npm run dev
```

This command will start:
- **API Gateway**: `http://localhost:3000`
- **Auth Service**: `http://localhost:3001`
- **User Service**: `http://localhost:3002`
- **Group Service**: `http://localhost:3003`
- **Booking Service**: `http://localhost:3004`
- **Notification Service**: `http://localhost:3005`
- **Frontend App**: `http://localhost:5173`

## Troubleshooting

### Docker Not Found
If `docker compose` fails, ensure Docker Desktop is running. You can verify this by running `docker --version`. If it's missing, install it via `brew install --cask docker` (macOS) or download it from docker.com.

### Port Conflicts
If a service fails to start, check if the port is already in use (e.g., another Postgres instance on 5432).
```bash
lsof -i :5432 # macOS/Linux
```
