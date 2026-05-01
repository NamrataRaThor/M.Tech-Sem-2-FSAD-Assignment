import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware';
import notificationRoutes from './routes/notification.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notifications', notificationRoutes);
app.get('/health', (req, res) => res.json({ status: 'Notification service healthy' }));

app.use(errorHandler);

export default app;
