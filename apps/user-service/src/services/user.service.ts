import { prisma } from '../utils/db';
import { CustomError } from '../utils/customError';

export class UserService {
  static async getProfile(userId: string) {
    const profile = await (prisma as any).profile.findUnique({ where: { userId } });
    if (!profile) throw new CustomError('Profile not found', 404);
    return profile;
  }

  static async updateProfile(userId: string, data: any) {
    return (prisma as any).profile.upsert({
      where: { userId },
      update: data,
      create: { userId, ...data },
    });
  }

  static async getFeed(userId: string) {
    return (prisma as any).activity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }
}
