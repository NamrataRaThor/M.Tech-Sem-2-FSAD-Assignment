import { Router } from 'express';
import { BookingController } from '../controllers/booking.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/resources', BookingController.getResources);
router.use(requireAuth);
router.get('/', BookingController.getBookings);
router.post('/', BookingController.createBooking);

export default router;
