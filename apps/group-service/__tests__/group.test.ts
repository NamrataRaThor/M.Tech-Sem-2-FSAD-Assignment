import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/utils/db';

jest.mock('../src/utils/db', () => ({
  prisma: {
    group: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    groupMember: {
      findUnique: jest.fn(),
    },
    groupInvitation: {
      create: jest.fn(),
    },
    studySession: {
      create: jest.fn(),
    }
  }
}));

describe('Group Service', () => {
  it('should create group', async () => {
    ((prisma as any).group.create as jest.Mock).mockResolvedValue({ id: '1', name: 'Test Group' });
    const res = await request(app).post('/api/groups').set('Authorization', 'Bearer token').send({ name: 'Test Group' });
    expect(res.status).toBe(201);
    expect(res.body.data.group.name).toBe('Test Group');
  });

  it('should fetch groups', async () => {
    ((prisma as any).group.findMany as jest.Mock).mockResolvedValue([{ id: '1', name: 'Test Group' }]);
    const res = await request(app).get('/api/groups').set('Authorization', 'Bearer token');
    expect(res.status).toBe(200);
    expect(res.body.data.groups.length).toBe(1);
  });
});
