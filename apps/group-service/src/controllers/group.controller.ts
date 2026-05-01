import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../services/group.service';

export class GroupController {
  static async createGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId || '123';
      const group = await GroupService.createGroup(userId, req.body);
      res.status(201).json({ status: 'success', data: { group } });
    } catch (e) {
      next(e);
    }
  }

  static async getGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId || '123';
      const groups = await GroupService.getGroups(userId);
      res.status(200).json({ status: 'success', data: { groups } });
    } catch (e) {
      next(e);
    }
  }

  static async inviteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId || '123';
      const { groupId } = req.params;
      const { inviteeId } = req.body;
      const invite = await GroupService.inviteUser(groupId, userId, inviteeId);
      res.status(201).json({ status: 'success', data: { invite } });
    } catch (e) {
      next(e);
    }
  }

  static async scheduleSession(req: Request, res: Response, next: NextFunction) {
    try {
      const { groupId } = req.params;
      const session = await GroupService.scheduleSession(groupId, req.body);
      res.status(201).json({ status: 'success', data: { session } });
    } catch (e) {
      next(e);
    }
  }
}
