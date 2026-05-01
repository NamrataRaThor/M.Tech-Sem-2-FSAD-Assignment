import { Request, Response, NextFunction } from 'express';
import { NotificationService } from '../services/notification.service';

export class NotificationController {
  static async getNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId || '123';
      const notifications = await NotificationService.getNotifications(userId);
      res.json({ status: 'success', data: { notifications } });
    } catch (e) {
      next(e);
    }
  }

  static async createNotification(req: Request, res: Response, next: NextFunction) {
    try {
      // In production, this should be protected to internal requests only
      const notification = await NotificationService.createNotification(req.body);
      res.status(201).json({ status: 'success', data: { notification } });
    } catch (e) {
      next(e);
    }
  }

  static async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId || '123';
      const { id } = req.params;
      await NotificationService.markAsRead(id, userId);
      res.json({ status: 'success', message: 'Marked as read' });
    } catch (e) {
      next(e);
    }
  }
}
