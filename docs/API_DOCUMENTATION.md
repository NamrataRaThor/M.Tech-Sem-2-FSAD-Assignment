# School Equipment Lending Portal: API Documentation

## Overview
The Equipment Portal API provides endpoints for user authentication, inventory management, and lending request processing.

**Base URL**: `http://localhost:3000/api`

---

## 1. Authentication

### `POST /auth/signup`
Creates a new user account.
- **Body**: 
  ```json
  {
    "name": "John Doe",
    "email": "john@university.edu",
    "password": "securepassword",
    "role": "STUDENT" // "STUDENT", "STAFF", or "ADMIN"
  }
  ```

### `POST /auth/login`
Authenticates a user and returns a Bearer token.
- **Body**:
  ```json
  { "email": "john@university.edu", "password": "securepassword" }
  ```
- **Response**:
  ```json
  { "user": { ... }, "accessToken": "jwt_token" }
  ```

---

## 2. Equipment Management

### `GET /equipment`
Retrieves all equipment in the inventory.
- **Response**: List of equipment objects.

### `POST /equipment` (Staff/Admin only)
Adds a new item to the inventory.
- **Body**:
  ```json
  {
    "name": "Lab Kit A",
    "category": "Science",
    "condition": "New",
    "description": "Standard physics kit"
  }
  ```

### `DELETE /equipment/:id` (Staff/Admin only)
Removes an item from the inventory.

---

## 3. Lending Requests

### `GET /requests`
Retrieves lending requests. 
- **Students**: See only their own requests.
- **Staff/Admin**: See all system requests.

### `POST /requests`
Submits a request to borrow an item.
- **Body**:
  ```json
  {
    "equipmentId": "uuid",
    "notes": "Required for final project"
  }
  ```

### `PATCH /requests/:id/status` (Staff/Admin only)
Updates the status of a request.
- **Body**:
  ```json
  { "status": "APPROVED" } // "APPROVED", "REJECTED", "RETURNED"
  ```

---

## Security
All protected routes require a `Authorization: Bearer <token>` header. Role-Based Access Control (RBAC) is enforced on all management endpoints.
