import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware';
import bookingRoutes from './routes/booking.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/bookings', bookingRoutes);
app.get('/health', (req, res) => res.json({ status: 'Booking service healthy' }));

app.use(errorHandler);

export default app;
