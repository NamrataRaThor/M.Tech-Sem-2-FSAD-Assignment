import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError';
import { ApiResponse } from '@studysync/shared';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error]:', err);

  if (err instanceof CustomError) {
    const response: ApiResponse<null> = {
      status: 'error',
      message: err.message,
    };
    return res.status(err.statusCode).json(response);
  }

  const response: ApiResponse<null> = {
    status: 'error',
    message: 'Internal Server Error',
  };
  res.status(500).json(response);
};
