import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export class UserController {
  static async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new Error('Unauthorized');
      const profile = await UserService.getProfile(req.user.userId);
      res.json({ status: 'success', data: { profile } });
    } catch (e) {
      next(e);
    }
  }

  static async updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new Error('Unauthorized');
      const profile = await UserService.updateProfile(req.user.userId, req.body);
      res.json({ status: 'success', data: { profile } });
    } catch (e) {
      next(e);
    }
  }
}
