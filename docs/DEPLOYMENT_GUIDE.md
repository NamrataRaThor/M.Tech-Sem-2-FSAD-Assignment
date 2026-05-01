# Production Deployment Guide

Deploying StudySync Campus involves container orchestration, CI/CD pipelines, and secure secret management.

## 1. Containerization (Docker)

The repository includes a `docker-compose.yml` configured for orchestrating the entire stack.

To build production-ready images:
```bash
docker compose -f docker-compose.prod.yml build
```
*(Note: A production compose file should omit development volumes and use production-optimized node images).*

## 2. Cloud Architecture Recommendation

For a scalable, high-availability deployment, consider the following AWS architecture:
- **Compute**: Amazon EKS (Elastic Kubernetes Service) or ECS (Elastic Container Service) to run the 6 Node.js microservices.
- **Database**: Amazon RDS for PostgreSQL. This replaces the Dockerized Postgres container for managed backups, scaling, and high availability.
- **Frontend Hosting**: AWS Amplify, Vercel, or AWS S3 + CloudFront for hosting the built React/Vite static assets.
- **API Gateway**: AWS API Gateway or an NGINX Ingress controller in front of the Node.js API Gateway service.

## 3. CI/CD Pipeline (GitHub Actions)

A standard CI/CD pipeline should execute the following jobs on push to `main`:
1. **Lint & Test**: `npm run lint` & `npm run test`
2. **Build**: Build the Vite frontend and compile TypeScript for the backend.
3. **Docker Build & Push**: Build Docker images for each service and push to Amazon ECR or Docker Hub.
4. **Deploy**: Update ECS task definitions or Kubernetes deployments with the new image tags.

## 4. Security Considerations for Production

- **HTTPS/TLS**: Terminate SSL at the Load Balancer or API Gateway. Never expose internal microservices to the public internet.
- **Secrets**: Store `JWT_ACCESS_SECRET` and `DATABASE_URL` in AWS Secrets Manager or HashiCorp Vault. Do not inject them directly into Docker images.
- **CORS**: Configure the API Gateway to only accept origins from your production frontend URL (e.g., `https://app.studysync.campus`).
- **Rate Limiting**: Use Redis-backed rate limiting to protect the Auth Service against brute-force attacks across distributed instances.
