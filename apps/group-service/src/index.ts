import app from './app';
import swaggerUi from 'swagger-ui-express';

const port = process.env.PORT || 3003;

const swaggerDocument = {
  openapi: "3.0.0",
  info: { title: "Group Service API", version: "1.0.0" },
  paths: {
    "/api/groups": {
      post: { summary: "Create group" },
      get: { summary: "List groups" }
    }
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`[Group Service] Running on port ${port}`));
}

export { app };
