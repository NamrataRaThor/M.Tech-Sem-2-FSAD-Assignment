import { prisma } from '../utils/db';
import { CustomError } from '../utils/customError';

export class BookingService {
  static async getResources() {
    return (prisma as any).resource.findMany();
  }

  static async getBookings(userId: string) {
    return (prisma as any).booking.findMany({
      where: { userId },
      include: { resource: true },
      orderBy: { startTime: 'asc' },
    });
  }

  static async createBooking(userId: string, data: any) {
    const { resourceId, startTime, endTime } = data;
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      throw new CustomError('Invalid time range', 400);
    }

    // Using Prisma Transaction for overlap prevention & audit logging
    return (prisma as any).$transaction(async (tx: any) => {
      // 1. Check for overlapping bookings
      const overlaps = await tx.booking.findFirst({
        where: {
          resourceId,
          status: 'CONFIRMED',
          OR: [
            { startTime: { lt: end }, endTime: { gt: start } }, // overlap condition
          ],
        },
      });

      if (overlaps) {
        throw new CustomError('Resource is already booked for this time period', 409);
      }

      // 2. Create the booking
      const booking = await tx.booking.create({
        data: {
          resourceId,
          userId,
          startTime: start,
          endTime: end,
          status: 'CONFIRMED',
        },
      });

      // 3. Create AuditLog
      await tx.auditLog.create({
        data: {
          bookingId: booking.id,
          action: 'CREATED',
          userId,
        },
      });

      return booking;
    });
  }
}
