import { prisma } from '../utils/db';

export class NotificationService {
  static async getNotifications(userId: string) {
    return (prisma as any).notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async createNotification(data: any) {
    return (prisma as any).notification.create({
      data: {
        userId: data.userId,
        type: data.type,
        content: data.content,
      },
    });
  }

  static async markAsRead(notificationId: string, userId: string) {
    return (prisma as any).notification.updateMany({
      where: { id: notificationId, userId },
      data: { read: true },
    });
  }
}
