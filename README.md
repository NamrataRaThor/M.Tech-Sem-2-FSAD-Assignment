# School Equipment Lending Portal

A streamlined, premium platform for managing and borrowing school equipment (lab gear, electronics, sports equipment, etc.).

## 🎥 Demonstration Video
**[https://drive.google.com/drive/u/0/folders/1hzNTQmuiM9Z_XwANAg0E3qyVuelGPv-k]**

## 📌 Technical Scope & Constraints
- **Authentication**: A simulated, simplified token-based JWT authentication is used.
- **Data Persistence**: The application uses a local Dockerized PostgreSQL instance. It is assumed the evaluator will run `docker-compose up -d postgres` before starting the application.
- **Roles**: Users are strictly categorized as `STUDENT`, `STAFF`, or `ADMIN`.
- **Concurrency**: Basic checks prevent overlapping bookings for the same item quantity, but advanced race-condition locking is outside the current scope.

## Architecture
- **Frontend**: React + Vite (Port 5174 in dev)
- **Backend**: Consolidated Express.js Monolith (Port 3000)
- **Database**: PostgreSQL with Prisma ORM

## 🚀 Setup & Installation

### 1. Start the Database
Ensure Docker is running and start the Postgres container:
```bash
docker-compose up -d postgres
```

### 2. Configure Environment
Create a `.env` file in the root directory:
```bash
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/studysync?schema=public"
JWT_ACCESS_SECRET=supersecret_access_key
JWT_REFRESH_SECRET=supersecret_refresh_key
CLIENT_URL=http://localhost:5174
VITE_API_URL=http://localhost:3000/api
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Sync Database Schema
```bash
# Push schema to database
npx prisma db push --schema=apps/backend/prisma/schema.prisma --accept-data-loss
```

### 5. Run the Application
```bash
npm run dev
```

---

## 👥 User Roles & Permissions

| Feature | Student | Staff | Admin |
| :--- | :---: | :---: | :---: |
| **Browse Equipment** | ✅ | ✅ | ✅ |
| **Request Equipment** | ✅ | ✅ | ✅ |
| **View Own Requests** | ✅ | ✅ | ✅ |
| **Manage Inventory** | ❌ | ✅ | ✅ |
| **Approve/Reject Requests** | ❌ | ✅ | ✅ |

### The Workflow:
1.  **Students** can browse items and submit a "Lending Request".
2.  **Staff** can manage the inventory (Add/Delete items) and process student requests.
3.  **Admins** have full control over all equipment and all users.
4.  **Borrowing**: When a Staff member requests an item, another Staff or Admin should ideally approve it to maintain accountability.

## 🛠 Features
- **Cinematic Design**: Glassmorphism UI with premium bronze/gold aesthetics.
- **RBAC (Role-Based Access Control)**: UI elements and API endpoints are secured based on user roles.
- **Real-time Inventory**: Automatic updates when items are requested or returned.
- **Responsive Layout**: Optimized for both desktop and mobile views.