import request from 'supertest';
import { app } from '../src/index';
import { prisma } from '../src/utils/db';
import { hashPassword } from '../src/utils/hash';

jest.mock('../src/utils/db', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    refreshToken: {
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    }
  }
}));

describe('Auth Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should signup a new user', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.user.create as jest.Mock).mockResolvedValue({
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      role: 'USER',
      passwordHash: 'hashedpassword'
    });
    (prisma.refreshToken.create as jest.Mock).mockResolvedValue({
      token: 'some-refresh-token'
    });

    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      });

    expect(res.status).toBe(201);
    expect(res.body.data.user.email).toBe('test@example.com');
    expect(res.body.data.accessToken).toBeDefined();
  });

  it('should fail to signup with same email', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: '123' });

    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      });

    expect(res.status).toBe(400);
  });

  it('should login an existing user', async () => {
    const hashed = await hashPassword('password123');
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      role: 'USER',
      passwordHash: hashed
    });
    (prisma.refreshToken.create as jest.Mock).mockResolvedValue({
      token: 'some-refresh-token'
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
  });
});
