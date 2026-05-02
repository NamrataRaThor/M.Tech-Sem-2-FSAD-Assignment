import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.signup(req.body);
      
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        status: 'success',
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        status: 'success',
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res.status(401).json({ status: 'error', message: 'Refresh token required' });
      }

      const result = await AuthService.refresh(refreshToken);
      res.status(200).json({
        status: 'success',
        data: {
          accessToken: result.accessToken,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await AuthService.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.status(200).json({ status: 'success', message: 'Logged out successfully' });
    } catch (e) {
      next(e);
    }
  }

  static async getMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new Error('User missing from request');
      const user = await AuthService.getMe(req.user.userId);
      res.status(200).json({ status: 'success', data: { user } });
    } catch (e) {
      next(e);
    }
  }
}
