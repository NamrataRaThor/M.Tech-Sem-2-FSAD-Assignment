import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/utils/db';

jest.mock('../src/utils/db', () => ({
  prisma: {
    $transaction: jest.fn(),
    resource: {
      findMany: jest.fn(),
    },
    booking: {
      findMany: jest.fn(),
    }
  }
}));

describe('Booking Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should list resources', async () => {
    ((prisma as any).resource.findMany as jest.Mock).mockResolvedValue([{ id: 'r1', name: 'Room 1' }]);
    const res = await request(app).get('/api/bookings/resources');
    expect(res.status).toBe(200);
    expect(res.body.data.resources.length).toBe(1);
  });

  it('should prevent double booking and rollback transaction', async () => {
    // Mock the transaction callback directly
    ((prisma as any).$transaction as jest.Mock).mockImplementation(async (callback) => {
      const txMock = {
        booking: {
          findFirst: jest.fn().mockResolvedValue({ id: 'existing_booking' }), // returns an overlapping booking
          create: jest.fn(),
        },
        auditLog: {
          create: jest.fn(),
        }
      };
      return callback(txMock);
    });

    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', 'Bearer token')
      .send({
        resourceId: 'r1',
        startTime: '2026-05-02T10:00:00.000Z',
        endTime: '2026-05-02T11:00:00.000Z'
      });

    expect(res.status).toBe(409);
    expect(res.body.message).toBe('Resource is already booked for this time period');
  });

  it('should create booking successfully inside transaction', async () => {
    ((prisma as any).$transaction as jest.Mock).mockImplementation(async (callback) => {
      const txMock = {
        booking: {
          findFirst: jest.fn().mockResolvedValue(null), // no overlap
          create: jest.fn().mockResolvedValue({ id: 'b1', resourceId: 'r1' }),
        },
        auditLog: {
          create: jest.fn(),
        }
      };
      return callback(txMock);
    });

    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', 'Bearer token')
      .send({
        resourceId: 'r1',
        startTime: '2026-05-02T10:00:00.000Z',
        endTime: '2026-05-02T11:00:00.000Z'
      });

    expect(res.status).toBe(201);
    expect(res.body.data.booking.id).toBe('b1');
  });
});
