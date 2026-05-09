# School Equipment Lending Portal - Product Specification

## 1. Complete Product Vision
**School Equipment Lending Portal** is a streamlined, premium platform designed to modernize the management and borrowing of academic resources (lab gear, electronics, sports equipment). It replaces chaotic spreadsheets and paper forms with a centralized, cinematic digital environment. Drawing inspiration from high-end consumer technology interfaces, the platform features a "Dream Edition" dark UI with bronze and gold gradients, glassmorphism, and intuitive navigation.

## 2. User Personas
* **The Student (Emily, 21):** Needs to quickly find and request equipment for her final year project. She values a clear catalog and transparent tracking of her borrowing requests.
* **The Lab Technician/Staff (Marcus, 45):** Manages the physics department's inventory. Needs a robust tool to add/remove equipment, check current stock levels, and quickly approve or reject student requests.
* **The Administrator (Sarah, 50):** Oversees the entire school's resources and user accounts. Requires full access to ensure equipment accountability and system integrity.

## 3. User Roles & Permissions
* **Student:** Can browse the equipment catalog, submit lending requests, and track the status of their own requests.
* **Staff:** Can manage inventory (Add/Delete items) and process (Approve/Reject) student lending requests.
* **Admin:** Superuser with full control over all equipment, all lending requests, and user management capabilities.

## 4. Features List
* **Cinematic Dashboard:** A personalized, aesthetic home screen highlighting available equipment and request statuses.
* **Real-time Inventory Catalog:** A dynamic list of all school equipment with current availability and condition tracking.
* **Lending Request Engine:** A streamlined workflow for students to request items with specific notes (e.g., project details).
* **Staff Management Hub:** A dedicated interface for Staff and Admins to approve/reject requests and update the catalog.
* **Role-Based Access Control (RBAC):** UI elements and API endpoints are strictly secured based on the user's role.
* **"Dream Edition" Visuals:** Deep void backgrounds with translucent glass panels and ethereal gradients.

## 5. Information Architecture
* `/dashboard` - Personalized home screen.
* `/dashboard/requests` - View and track personal lending requests (Students) or manage all system requests (Staff/Admin).
* `/dashboard/admin` - Inventory management and system administration (Staff/Admin only).
* `/login` & `/signup` - Secure authentication portals.

## 6. Technical Architecture
The platform utilizes a **Consolidated Monolithic Architecture** for simplicity and reliability.
* **Frontend:** React 18 (Vite) for high-performance cinematic rendering.
* **Backend:** Node.js/Express single-server API.
* **Database:** PostgreSQL for relational data (users, equipment, requests), managed via Prisma ORM.
* **Authentication:** JWT-based stateless authentication with secure HTTP-only cookies.

## 7. Database Schema Overview (Prisma)
* **User:** `id`, `email`, `name`, `passwordHash`, `role` (STUDENT/STAFF/ADMIN), `createdAt`
* **Equipment:** `id`, `name`, `category`, `condition`, `quantity`, `isAvailable`, `description`
* **LendingRequest:** `id`, `userId`, `equipmentId`, `status` (PENDING/APPROVED/REJECTED/RETURNED), `notes`
* **RefreshToken:** `id`, `token`, `userId`, `expiresAt`

## 8. Frontend Architecture
* **Framework:** React 18+ (Functional Components & Hooks).
* **State Management:** React Query for server-state caching and synchronization.
* **Routing:** React Router v6.
* **Styling:** Tailwind CSS mixed with Framer Motion for complex animations. No generic component libraries are used in order to maintain custom aesthetic control ("Dream Edition").

## 9. UI Design System
* **Visual Language:** Cinematic futuristic depth with a premium bronze/gold palette.
* **Surfaces:** Layered floating components using heavy glassmorphism (`backdrop-filter: blur`).
* **Borders:** Subtle glowing borders on dark surfaces.
* **Colors:** Deep Void (`#050507`), Champagne (`#F7E7CE`), and Gold/Bronze accents.

## 10. Deployment Strategy
* **Backend & DB:** Dockerized PostgreSQL database with a Node.js backend.
* **Frontend:** Built via Vite for static hosting or served alongside the backend.

## 11. Security Considerations
* **Authentication:** Short-lived JWT access tokens with secure refresh tokens.
* **Authorization:** Strict RBAC checks in the Express middleware before processing any inventory or request modifications.
* **Data Privacy:** Encrypted passwords (bcrypt) and protected database access.
