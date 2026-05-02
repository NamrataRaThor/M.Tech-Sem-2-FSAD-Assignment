import { prisma } from '../utils/db';
import { CustomError } from '../utils/customError';

export class UserService {
  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    if (!user) throw new CustomError('User not found', 404);
    return user;
  }

  static async updateProfile(userId: string, data: any) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        email: data.email,
      },
      select: { id: true, email: true, name: true, role: true },
    });
  }
}
