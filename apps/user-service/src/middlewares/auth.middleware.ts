import { Request, Response, NextFunction } from 'express';

// Mock auth middleware for demonstration in this service
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }
  (req as any).user = { userId: '123' }; // Mock extracted user
  next();
};
