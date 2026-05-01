# Environment Configuration

StudySync Campus requires environment variables to configure database connections, JWT secrets, and port bindings.

## Root Configuration
Create a `.env` file in the root directory. This file is loaded by the individual microservices.

```env
# Database Configuration
# The shared PostgreSQL instance. Note the schema parameters for logical separation.
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/studysync"

# Authentication Secrets
JWT_ACCESS_SECRET="supersecret_access_key_change_in_production"
JWT_REFRESH_SECRET="supersecret_refresh_key_change_in_production"

# API Gateway Routing (Local Development)
AUTH_SERVICE_URL="http://localhost:3001"
USER_SERVICE_URL="http://localhost:3002"
GROUP_SERVICE_URL="http://localhost:3003"
BOOKING_SERVICE_URL="http://localhost:3004"
NOTIFICATION_SERVICE_URL="http://localhost:3005"

# Frontend Configuration
VITE_API_URL="http://localhost:3000/api"
```

## Docker Compose Configuration
If running the entire stack via Docker Compose (`docker compose up --build`), the `.env` variables are overridden by the `environment` keys in `docker-compose.yml` to use internal Docker network hostnames (e.g., `http://auth-service:3001` instead of `localhost`).

### Security Note
**Never commit your `.env` file to version control.** The `JWT_ACCESS_SECRET` must be cryptographically secure in production.
