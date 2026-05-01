# StudySync Campus - System Architecture

## 1. Service Responsibilities
* **API Gateway (Node.js/Express):** Central entry point. Handles rate limiting, request routing, CORS, and initial JWT validation.
* **Auth Service:** Manages user registration, login, JWT token generation/validation, password hashing, and SSO integration.
* **User Service:** Manages user profiles, preferences (UI themes/ambient lighting), and user connections.
* **Group Service:** Manages study groups, member roles, metadata, and group-specific settings.
* **Booking Service:** Manages campus facility resources, room availability, and scheduling reservations.
* **Notification Service:** Asynchronous service handling smart reminders, push notifications, emails, and WebSockets for real-time alerts.
* **Admin Service:** Handles campus-wide administration, metrics, system health, and moderator actions.

## 2. Communication Flow
* **Synchronous (REST/HTTP):** Used for client-to-API Gateway communication and critical read/write operations between services.
* **Asynchronous (Message Broker - RabbitMQ/Kafka):** Used for event-driven workflows that do not require immediate responses (e.g., Group Service publishing a `GroupCreated` event -> Notification Service sends alerts).
* **Real-time (WebSockets):** Handled by the Gateway or a dedicated WebSocket server attached to the Notification service for chat and live UI updates.

## 3. REST Endpoint Map
* **Gateway (`/api`)**
  * `-> /auth/*` (Routed to Auth Service)
  * `-> /users/*` (Routed to User Service)
  * `-> /groups/*` (Routed to Group Service)
  * `-> /bookings/*` (Routed to Booking Service)
  * `-> /admin/*` (Routed to Admin Service)

## 4. Database Ownership (Microservice Pattern)
Each service owns its domain data. We utilize PostgreSQL as the primary RDBMS.
* **Auth DB:** Credentials, Auth tokens, SSO mappings.
* **User DB:** Profile data, UI preferences, social graphs.
* **Group DB:** Group configurations, memberships.
* **Booking DB:** Facilities, schedules, reservations.
* **Admin DB:** Audit logs, platform metrics.
* *Note: Notification Service uses Redis for ephemeral states and WebSocket connections.*

## 5. Event Flow
```mermaid
graph TD
    A[Client] -->|POST /api/bookings| B(API Gateway)
    B -->|REST| C(Booking Service)
    C -->|Save to DB| D[(Booking DB)]
    C -->|Publish Event: BookingCreated| E[RabbitMQ/Kafka]
    E -->|Consume Event| F(Notification Service)
    F -->|WebSocket/Push| A
```

## 6. Sequence Diagrams

### Study Session Booking Flow
```mermaid
sequenceDiagram
    participant Client
    participant Gateway as API Gateway
    participant Booking as Booking Service
    participant Group as Group Service
    participant Broker as Message Broker
    participant Notify as Notification Service

    Client->>Gateway: POST /api/bookings {groupId, roomId, time}
    Gateway->>Gateway: Validate JWT
    Gateway->>Booking: Forward Request
    Booking->>Group: GET /api/groups/{id}/members (Verify Auth)
    Group-->>Booking: Return Members (200 OK)
    Booking->>Booking: Check Room Availability
    Booking->>Booking: Create Reservation (Save to DB)
    Booking-->>Gateway: 201 Created (Booking Details)
    Gateway-->>Client: 201 Created
    Booking->>Broker: Publish `BookingCreated` Event
    Broker->>Notify: Consume Event
    Notify->>Client: Send Real-Time Notification (WebSocket)
```

## 7. ER Diagrams
```mermaid
erDiagram
    USERS ||--o{ GROUP_MEMBERS : "has"
    GROUPS ||--o{ GROUP_MEMBERS : "contains"
    GROUPS ||--o{ BOOKINGS : "makes"
    RESOURCES ||--o{ BOOKINGS : "reserved in"

    USERS {
        uuid id PK
        string email
        string password_hash
        jsonb preferences
        timestamp created_at
    }

    GROUPS {
        uuid id PK
        string name
        string theme_config
    }

    GROUP_MEMBERS {
        uuid group_id FK
        uuid user_id FK
        string role
    }

    RESOURCES {
        uuid id PK
        string name
        int capacity
        string type
    }

    BOOKINGS {
        uuid id PK
        uuid group_id FK
        uuid resource_id FK
        timestamp start_time
        timestamp end_time
    }
```

## 8. API Contracts

### Create Booking Example
**Endpoint:** `POST /api/bookings`
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "groupId": "uuid",
  "resourceId": "uuid",
  "startTime": "2026-05-10T14:00:00Z",
  "endTime": "2026-05-10T16:00:00Z"
}
```
**Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "bookingId": "uuid",
    "status": "CONFIRMED"
  }
}
```

## 9. Validation Strategy
* **Layer 1 (API Gateway):** Basic structural validation (Content-Type, Payload limits).
* **Layer 2 (Microservices):** Deep schema validation using **Zod** or **Joi** before processing business logic.
* **Layer 3 (Database):** Constraints, foreign keys, and ENUM checks.

## 10. Logging Strategy
* **Format:** Structured JSON logging (Winston/Pino in Node.js).
* **Correlation IDs:** API Gateway injects an `x-correlation-id` header passed to all downstream services for distributed tracing.
* **Aggregation:** Logs pushed to ELK Stack (Elasticsearch, Logstash, Kibana) or Datadog.

## 11. Error Handling
Standardized error responses across all services:
```json
{
  "error": {
    "code": "ROOM_UNAVAILABLE",
    "message": "The selected resource is already booked for this timeframe.",
    "details": ["Overlap with booking ID: 1234"]
  },
  "correlationId": "req-abc-123"
}
```

## 12. Security Layers
* **Edge:** Cloudflare (DDoS protection, WAF).
* **Gateway:** Rate Limiting (Redis), Helmet.js (HTTP Headers).
* **Internal:** Services reside in a private VPC subnet. No public IP access. Communication secured via mTLS.
* **Data:** AES-256 encryption at rest (AWS KMS). PII data masked in logs.

## 13. JWT Flow
1. Client logs in -> Auth Service validates credentials.
2. Auth Service issues Access Token (15m expiry) and HTTP-Only, Secure, SameSite Refresh Token (7 days expiry).
3. Client attaches Access Token to requests via `Authorization: Bearer` header.
4. API Gateway validates signature/expiry statelessly.
5. If expired, client calls `/api/auth/refresh` with the HTTP-Only cookie to get a new Access Token.

## 14. Docker Architecture
* **Frontend:** Nginx container serving static Vite build.
* **Gateway:** Node.js container based on `node:18-alpine`.
* **Services:** Separate Dockerfiles for each microservice, orchestrated via `docker-compose` locally and Kubernetes in production.
* **Sidecars:** Datadog agent or FluentBit running alongside services for telemetry.

## 15. Environment Variable Plan
Secrets securely managed via AWS Secrets Manager or HashiCorp Vault.
```env
# API Gateway
PORT=3000
JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----..."
RABBITMQ_URL="amqp://user:pass@broker:5672"

# Booking Service
PORT=3004
DB_HOST=pg-booking-db
DB_USER=booking_user
DB_PASS=*******
DB_NAME=bookings
REDIS_URL="redis://cache:6379"
```
