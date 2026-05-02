import { Request, Response, NextFunction } from 'express';
import { EquipmentService } from '../services/equipment.service';

export class EquipmentController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const equipment = await EquipmentService.getAll();
      res.json({ status: 'success', data: { equipment } });
    } catch (e) {
      next(e);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const equipment = await EquipmentService.getById(req.params.id);
      res.json({ status: 'success', data: { equipment } });
    } catch (e) {
      next(e);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const equipment = await EquipmentService.create(req.body);
      res.status(201).json({ status: 'success', data: { equipment } });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const equipment = await EquipmentService.update(req.params.id, req.body);
      res.json({ status: 'success', data: { equipment } });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await EquipmentService.delete(req.params.id);
      res.json({ status: 'success', message: 'Equipment deleted' });
    } catch (e) {
      next(e);
    }
  }
}
