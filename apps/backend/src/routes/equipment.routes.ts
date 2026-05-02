import { Router } from 'express';
import { EquipmentController } from '../controllers/equipment.controller';
import { requireAuth, requireRole } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', requireAuth, EquipmentController.getAll);
router.get('/:id', requireAuth, EquipmentController.getById);

// Management routes (Staff and Admin)
router.post('/', requireAuth, requireRole(['STAFF', 'ADMIN']), EquipmentController.create);
router.put('/:id', requireAuth, requireRole(['STAFF', 'ADMIN']), EquipmentController.update);
router.delete('/:id', requireAuth, requireRole(['STAFF', 'ADMIN']), EquipmentController.delete);

export default router;
