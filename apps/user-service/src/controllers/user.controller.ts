import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId || 'test-user-id';
      const profile = await UserService.getProfile(userId);
      res.json({ status: 'success', data: { profile } });
    } catch (e) {
      next(e);
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId || 'test-user-id';
      const profile = await UserService.updateProfile(userId, req.body);
      res.json({ status: 'success', data: { profile } });
    } catch (e) {
      next(e);
    }
  }

  static async getFeed(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId || 'test-user-id';
      const feed = await UserService.getFeed(userId);
      res.json({ status: 'success', data: { feed } });
    } catch (e) {
      next(e);
    }
  }
}
