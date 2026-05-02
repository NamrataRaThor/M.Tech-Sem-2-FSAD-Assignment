import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError';
import { ApiResponse } from '@studysync/shared';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error]:', err);

  // Handle Prisma Unique Constraint Errors
  if (err.code === 'P2002') {
    const target = err.meta?.target || [];
    const field = target.includes('email') ? 'Email' : 'Field';
    return res.status(400).json({
      status: 'error',
      message: `${field} already exists. Please use a different one.`
    });
  }

  if (err instanceof CustomError) {
    const response: ApiResponse<null> = {
      status: 'error',
      message: err.message,
    };
    return res.status(err.statusCode).json(response);
  }

  const response: ApiResponse<null> = {
    status: 'error',
    message: err.message || 'Internal Server Error',
  };
  res.status(err.statusCode || 500).json(response);
};
