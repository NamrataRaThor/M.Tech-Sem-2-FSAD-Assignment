import app from './app';
import swaggerUi from 'swagger-ui-express';

const port = process.env.PORT || 3005;

const swaggerDocument = {
  openapi: "3.0.0",
  info: { title: "Notification Service API", version: "1.0.0" },
  paths: {
    "/api/notifications": {
      post: { summary: "Create notification" },
      get: { summary: "List user notifications" }
    }
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`[Notification Service] Running on port ${port}`));
}

export { app };
