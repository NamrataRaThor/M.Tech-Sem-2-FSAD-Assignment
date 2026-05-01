import { prisma } from '../utils/db';
import { CustomError } from '../utils/customError';

export class GroupService {
  static async createGroup(userId: string, data: any) {
    return (prisma as any).group.create({
      data: {
        name: data.name,
        description: data.description,
        members: {
          create: { userId, role: 'ADMIN' },
        },
      },
      include: { members: true },
    });
  }

  static async getGroups(userId: string) {
    return (prisma as any).group.findMany({
      where: { members: { some: { userId } } },
      include: { members: true },
    });
  }

  static async inviteUser(groupId: string, inviterId: string, inviteeId: string) {
    const member = await (prisma as any).groupMember.findUnique({
      where: { groupId_userId: { groupId, userId: inviterId } },
    });
    
    if (!member || member.role !== 'ADMIN') {
      throw new CustomError('Only admins can invite', 403);
    }

    return (prisma as any).groupInvitation.create({
      data: { groupId, inviterId, inviteeId },
    });
  }

  static async scheduleSession(groupId: string, data: any) {
    return (prisma as any).studySession.create({
      data: {
        groupId,
        title: data.title,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
      },
    });
  }
}
