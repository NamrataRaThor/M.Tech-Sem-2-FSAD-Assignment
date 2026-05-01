import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/utils/db';

jest.mock('../src/utils/db', () => ({
  prisma: {
    profile: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
    },
    activity: {
      findMany: jest.fn(),
    }
  }
}));

describe('User Service', () => {
  it('should get profile', async () => {
    ((prisma as any).profile.findUnique as jest.Mock).mockResolvedValue({ id: '1', userId: '123', bio: 'Hello' });
    const res = await request(app).get('/api/users/profile').set('Authorization', 'Bearer token');
    expect(res.status).toBe(200);
    expect(res.body.data.profile.bio).toBe('Hello');
  });

  it('should update profile', async () => {
    ((prisma as any).profile.upsert as jest.Mock).mockResolvedValue({ id: '1', userId: '123', bio: 'Updated' });
    const res = await request(app).put('/api/users/profile').set('Authorization', 'Bearer token').send({ bio: 'Updated' });
    expect(res.status).toBe(200);
    expect(res.body.data.profile.bio).toBe('Updated');
  });
});
