# Entity Relationship Diagrams

This document outlines the data schemas and their relationships across the microservices. While each microservice manages its own logical domain, they reference common keys (like `userId`).

## Unified ERD Map

```mermaid
erDiagram
    User ||--o{ Profile : has
    User ||--o{ ActivityFeed : generates
    User ||--o{ GroupMember : belongs_to
    User ||--o{ Booking : makes
    User ||--o{ Notification : receives

    Group ||--o{ GroupMember : contains
    Resource ||--o{ Booking : booked_for

    User {
        string id PK
        string email
        string passwordHash
        string role
        datetime createdAt
    }

    Profile {
        string id PK
        string userId FK
        string bio
        string avatarUrl
    }

    ActivityFeed {
        string id PK
        string userId FK
        string action
        datetime createdAt
    }

    Group {
        string id PK
        string name
        string description
    }

    GroupMember {
        string id PK
        string groupId FK
        string userId FK
        string role "ADMIN or MEMBER"
    }

    Resource {
        string id PK
        string name
        string type "ROOM or EQUIPMENT"
        int capacity
    }

    Booking {
        string id PK
        string userId FK
        string resourceId FK
        datetime startTime
        datetime endTime
        string status
    }

    Notification {
        string id PK
        string userId FK
        string message
        boolean read
        datetime createdAt
    }
```

## Schema Domains

1. **Auth Service**: Owns the `User` table (credentials and identity).
2. **User Service**: Owns `Profile` and `ActivityFeed`. Maps to `User.id`.
3. **Group Service**: Owns `Group` and `GroupMember`.
4. **Booking Service**: Owns `Resource` and `Booking`.
5. **Notification Service**: Owns `Notification`.
