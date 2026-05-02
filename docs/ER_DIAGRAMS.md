# Entity Relationship Diagram

This document outlines the database schema and relationships for the School Equipment Lending Portal.

## Database Schema (Prisma)

```mermaid
erDiagram
    User ||--o{ LendingRequest : places
    User ||--o{ RefreshToken : has
    Equipment ||--o{ LendingRequest : included_in

    User {
        string id PK
        string email UK
        string name
        string passwordHash
        enum role "STUDENT, STAFF, ADMIN"
        datetime createdAt
    }

    Equipment {
        string id PK
        string name
        string category
        string condition
        int quantity
        boolean isAvailable
        string description
        datetime updatedAt
    }

    LendingRequest {
        string id PK
        string userId FK
        string equipmentId FK
        enum status "PENDING, APPROVED, REJECTED, RETURNED"
        datetime requestDate
        datetime returnDate
        string notes
        datetime updatedAt
    }

    RefreshToken {
        string id PK
        string token UK
        string userId FK
        datetime expiresAt
    }
```

## Core Relationships

1.  **User -> LendingRequest (1:N)**: A user can submit multiple requests over time.
2.  **Equipment -> LendingRequest (1:N)**: An item can be part of many lending requests throughout its lifecycle.
3.  **User -> RefreshToken (1:N)**: A user can have multiple active sessions (tokens) across different devices.
