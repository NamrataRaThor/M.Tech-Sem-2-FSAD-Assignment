import { Router } from 'express';
import { GroupController } from '../controllers/group.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.use(requireAuth);
router.post('/', GroupController.createGroup);
router.get('/', GroupController.getGroups);
router.post('/:groupId/invite', GroupController.inviteUser);
router.post('/:groupId/sessions', GroupController.scheduleSession);

export default router;
