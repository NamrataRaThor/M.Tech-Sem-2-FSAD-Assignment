import express from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error.middleware';

// Routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import equipmentRoutes from './routes/equipment.routes';
import requestRoutes from './routes/request.routes';

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    // Allow all local origins during development
    if (!origin || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(compression());
app.use(express.json());
app.use(cookieParser());

// Health check
app.get('/health', (req, res) => res.json({ status: 'Backend is healthy' }));

// Mount routes directly
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/requests', requestRoutes);

app.use(errorHandler);

export default app;
