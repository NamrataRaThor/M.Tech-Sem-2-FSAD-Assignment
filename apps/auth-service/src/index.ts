import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import swaggerUi from 'swagger-ui-express';

const port = process.env.PORT || 3001;

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Auth Service API",
    version: "1.0.0"
  },
  paths: {
    "/api/auth/signup": {
      post: {
        summary: "Sign up a new user",
        responses: { "201": { description: "User created" } }
      }
    },
    "/api/auth/login": {
      post: {
        summary: "Log in a user",
        responses: { "200": { description: "Logged in successfully" } }
      }
    }
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`[Auth Service] Running on port ${port}`);
  });
}

export { app };
