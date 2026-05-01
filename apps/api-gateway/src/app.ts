import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Auth Service Proxy
app.use('/api/auth', createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
  changeOrigin: true,
}));

// User Service Proxy
app.use('/api/users', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL || 'http://localhost:3002',
  changeOrigin: true,
}));

// Group Service Proxy
app.use('/api/groups', createProxyMiddleware({
  target: process.env.GROUP_SERVICE_URL || 'http://localhost:3003',
  changeOrigin: true,
}));

app.get('/health', (req, res) => res.json({ status: 'Gateway is running' }));

export default app;
