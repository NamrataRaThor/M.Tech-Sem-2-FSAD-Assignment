# StudySync Campus: API Documentation

## Overview
The StudySync Campus API is built using a microservices architecture. All requests should be routed through the **API Gateway** running on port `3000`.

**Base URL**: `http://localhost:3000`

---

## 1. Auth Service

### `POST /api/auth/signup`
Creates a new user account.
- **Body**: 
  ```json
  {
    "email": "student@university.edu",
    "password": "securepassword",
    "role": "STUDENT" // optional
  }
  ```
- **Response** (201):
  ```json
  { "message": "User created successfully", "userId": "uuid" }
  ```

### `POST /api/auth/login`
Authenticates a user and sets a secure HttpOnly JWT cookie.
- **Body**:
  ```json
  { "email": "student@university.edu", "password": "securepassword" }
  ```
- **Response** (200):
  ```json
  { "message": "Logged in successfully" }
  ```

### `GET /api/auth/me`
Retrieves the currently authenticated user's session data.
- **Headers**: Cookie (`jwt`)
- **Response** (200):
  ```json
  { "userId": "uuid", "role": "STUDENT", "email": "student@university.edu" }
  ```

---

## 2. User Service

### `GET /api/users/profile`
Retrieves detailed profile information for the authenticated user.
- **Response** (200):
  ```json
  {
    "profile": {
      "id": "uuid",
      "userId": "uuid",
      "bio": "Computer Science major.",
      "avatarUrl": "https://..."
    }
  }
  ```

### `GET /api/users/feed`
Retrieves the recent activity feed for the user.
- **Response** (200):
  ```json
  [
    { "id": "1", "action": "Booked Study Room A", "createdAt": "2023-10-25T10:00:00Z" }
  ]
  ```

---

## 3. Group Service

### `GET /api/groups`
Retrieves a list of groups the user is a member of.
- **Response** (200):
  ```json
  [
    { "id": "1", "name": "CS Study Group", "description": "Algorithms prep" }
  ]
  ```

---

## 4. Booking Service

### `GET /api/bookings/resources`
Retrieves available resources (study rooms, projectors).
- **Response** (200):
  ```json
  [
    { "id": "res-1", "name": "Library Room 402", "type": "ROOM", "capacity": 4 }
  ]
  ```

### `POST /api/bookings`
Creates a new booking.
- **Body**:
  ```json
  {
    "resourceId": "res-1",
    "startTime": "2023-10-26T14:00:00Z",
    "endTime": "2023-10-26T16:00:00Z"
  }
  ```
- **Response** (201): Created booking object.

---

## 5. Notification Service

### `GET /api/notifications`
Retrieves the user's notifications.
- **Response** (200):
  ```json
  [
    { "id": "notif-1", "message": "Booking confirmed for Room 402", "read": false }
  ]
  ```

## Security
All protected routes (`/api/users/*`, `/api/bookings/*`, etc.) require a valid JWT passed in the `Cookie` header. The API Gateway validates the JWT before proxying the request to the underlying microservice.
