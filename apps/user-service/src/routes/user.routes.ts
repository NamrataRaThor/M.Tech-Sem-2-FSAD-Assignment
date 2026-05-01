import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.use(requireAuth);
router.get('/profile', UserController.getProfile);
router.put('/profile', UserController.updateProfile);
router.get('/feed', UserController.getFeed);

export default router;
