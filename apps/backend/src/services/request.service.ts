import { prisma } from '../utils/db';
import { CustomError } from '../utils/customError';
import { RequestStatus } from '@prisma/client';

export class RequestService {
  static async getAll(filters: any = {}) {
    return prisma.lendingRequest.findMany({
      where: filters,
      include: {
        user: { select: { name: true, email: true, role: true } },
        equipment: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getById(id: string) {
    const request = await prisma.lendingRequest.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, email: true, role: true } },
        equipment: true,
      },
    });
    if (!request) throw new CustomError('Lending request not found', 404);
    return request;
  }

  static async create(userId: string, data: any) {
    // Check if equipment exists and is available
    const equipment = await prisma.equipment.findUnique({
      where: { id: data.equipmentId },
    });

    if (!equipment) throw new CustomError('Equipment not found', 404);
    if (!equipment.isAvailable || equipment.quantity <= 0) {
      throw new CustomError('Equipment is currently not available', 400);
    }

    return prisma.lendingRequest.create({
      data: {
        userId,
        equipmentId: data.equipmentId,
        notes: data.notes,
        status: 'PENDING',
      },
    });
  }

  static async updateStatus(id: string, status: RequestStatus) {
    const request = await this.getById(id);

    // If status is APPROVED, we might want to decrease equipment quantity or set isAvailable to false
    // But for a simple portal, let's just update the status for now.
    // Logic for returning:
    if (status === 'RETURNED' && request.status !== 'RETURNED') {
      // Logic for return (e.g. increase quantity)
    }

    return prisma.lendingRequest.update({
      where: { id },
      data: { status },
    });
  }

  static async delete(id: string) {
    await this.getById(id);
    return prisma.lendingRequest.delete({
      where: { id },
    });
  }
}
