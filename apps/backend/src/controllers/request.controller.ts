import { Request, Response, NextFunction } from 'express';
import { RequestService } from '../services/request.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export class RequestController {
  static async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      // If student, only show their own requests
      const filters = req.user?.role === 'STUDENT' ? { userId: req.user.userId } : {};
      const requests = await RequestService.getAll(filters);
      res.json({ status: 'success', data: { requests } });
    } catch (e) {
      next(e);
    }
  }

  static async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const request = await RequestService.getById(req.params.id);
      
      // Authorization check
      if (req.user?.role === 'STUDENT' && request.userId !== req.user.userId) {
        return res.status(403).json({ status: 'error', message: 'Forbidden' });
      }

      res.json({ status: 'success', data: { request } });
    } catch (e) {
      next(e);
    }
  }

  static async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new Error('User missing from request');
      const request = await RequestService.create(req.user.userId, req.body);
      res.status(201).json({ status: 'success', data: { request } });
    } catch (e) {
      next(e);
    }
  }

  static async updateStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const request = await RequestService.updateStatus(req.params.id, req.body.status);
      res.json({ status: 'success', data: { request } });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await RequestService.delete(req.params.id);
      res.json({ status: 'success', message: 'Request deleted' });
    } catch (e) {
      next(e);
    }
  }
}
