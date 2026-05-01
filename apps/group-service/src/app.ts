import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware';
import groupRoutes from './routes/group.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/groups', groupRoutes);
app.get('/health', (req, res) => res.json({ status: 'Group service healthy' }));

app.use(errorHandler);

export default app;
