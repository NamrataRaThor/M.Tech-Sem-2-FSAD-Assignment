import app from './app';
import swaggerUi from 'swagger-ui-express';

const port = process.env.PORT || 3004;

const swaggerDocument = {
  openapi: "3.0.0",
  info: { title: "Booking Service API", version: "1.0.0" },
  paths: {
    "/api/bookings": {
      post: { summary: "Create booking" },
      get: { summary: "List user bookings" }
    }
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`[Booking Service] Running on port ${port}`));
}

export { app };
