import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware';
import userRoutes from './routes/user.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.get('/health', (req, res) => res.json({ status: 'User service healthy' }));

app.use(errorHandler);

export default app;
