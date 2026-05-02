import jwt from 'jsonwebtoken';

const accessSecret = process.env.JWT_ACCESS_SECRET || 'access_secret_key';
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'refresh_secret_key';

export const generateAccessToken = (userId: string, role: string, name: string) => {
  return jwt.sign({ userId, role, name }, accessSecret, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, refreshSecret, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessSecret) as { userId: string; role: string; name: string };
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshSecret) as { userId: string };
};
