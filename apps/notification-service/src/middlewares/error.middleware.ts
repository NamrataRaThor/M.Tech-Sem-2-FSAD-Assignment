import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error]:', err);
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ status: 'error', message: err.message });
  }
  res.status(500).json({ status: 'error', message: 'Internal Server Error' });
};
