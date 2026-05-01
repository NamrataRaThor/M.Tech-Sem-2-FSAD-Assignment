import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/utils/db';

jest.mock('../src/utils/db', () => ({
  prisma: {
    notification: {
      findMany: jest.fn(),
      create: jest.fn(),
      updateMany: jest.fn(),
    }
  }
}));

describe('Notification Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should list notifications', async () => {
    ((prisma as any).notification.findMany as jest.Mock).mockResolvedValue([{ id: 'n1', content: 'Test' }]);
    const res = await request(app).get('/api/notifications').set('Authorization', 'Bearer token');
    expect(res.status).toBe(200);
    expect(res.body.data.notifications.length).toBe(1);
  });

  it('should create a notification', async () => {
    ((prisma as any).notification.create as jest.Mock).mockResolvedValue({ id: 'n1', content: 'Test' });
    const res = await request(app)
      .post('/api/notifications')
      .send({ userId: '123', type: 'ALERT', content: 'Test' });
    expect(res.status).toBe(201);
    expect(res.body.data.notification.content).toBe('Test');
  });
});
