import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Internal route for other services to create notifications
router.post('/', NotificationController.createNotification);

router.use(requireAuth);
router.get('/', NotificationController.getNotifications);
router.put('/:id/read', NotificationController.markAsRead);

export default router;
