import app from './app';
import swaggerUi from 'swagger-ui-express';

const port = process.env.PORT || 3002;

const swaggerDocument = {
  openapi: "3.0.0",
  info: { title: "User Service API", version: "1.0.0" },
  paths: {
    "/api/users/profile": {
      get: { summary: "Get profile" },
      put: { summary: "Update profile" }
    }
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`[User Service] Running on port ${port}`));
}

export { app };
