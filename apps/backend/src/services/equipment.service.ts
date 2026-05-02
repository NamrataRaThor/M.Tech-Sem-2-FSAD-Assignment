import { prisma } from '../utils/db';
import { CustomError } from '../utils/customError';

export class EquipmentService {
  static async getAll() {
    return prisma.equipment.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getById(id: string) {
    const equipment = await prisma.equipment.findUnique({
      where: { id },
    });
    if (!equipment) throw new CustomError('Equipment not found', 404);
    return equipment;
  }

  static async create(data: any) {
    return prisma.equipment.create({
      data: {
        name: data.name,
        category: data.category,
        condition: data.condition,
        quantity: data.quantity || 1,
        description: data.description,
        isAvailable: data.isAvailable !== undefined ? data.isAvailable : true,
      },
    });
  }

  static async update(id: string, data: any) {
    await this.getById(id);
    return prisma.equipment.update({
      where: { id },
      data: {
        name: data.name,
        category: data.category,
        condition: data.condition,
        quantity: data.quantity,
        description: data.description,
        isAvailable: data.isAvailable,
      },
    });
  }

  static async delete(id: string) {
    await this.getById(id);
    return prisma.equipment.delete({
      where: { id },
    });
  }
}
