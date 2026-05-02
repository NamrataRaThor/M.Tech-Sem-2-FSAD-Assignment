import { Router } from 'express';
import { RequestController } from '../controllers/request.controller';
import { requireAuth, requireRole } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', requireAuth, RequestController.getAll);
router.get('/:id', requireAuth, RequestController.getById);
router.post('/', requireAuth, RequestController.create);

// Staff and Admin can update status
router.patch('/:id/status', requireAuth, requireRole(['STAFF', 'ADMIN']), RequestController.updateStatus);
router.delete('/:id', requireAuth, requireRole('ADMIN'), RequestController.delete);

export default router;
