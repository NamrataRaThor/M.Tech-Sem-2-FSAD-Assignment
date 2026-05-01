import { Request, Response, NextFunction } from 'express';
import { BookingService } from '../services/booking.service';

export class BookingController {
  static async getResources(req: Request, res: Response, next: NextFunction) {
    try {
      const resources = await BookingService.getResources();
      res.json({ status: 'success', data: { resources } });
    } catch (e) {
      next(e);
    }
  }

  static async getBookings(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId || '123';
      const bookings = await BookingService.getBookings(userId);
      res.json({ status: 'success', data: { bookings } });
    } catch (e) {
      next(e);
    }
  }

  static async createBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId || '123';
      const booking = await BookingService.createBooking(userId, req.body);
      res.status(201).json({ status: 'success', data: { booking } });
    } catch (e) {
      next(e);
    }
  }
}
