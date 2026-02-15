import express from 'express';
import { getStaff, addStaffMember, deleteStaffMember } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/staff', protect, getStaff);
router.post('/add', protect, addStaffMember);
router.delete('/:id', protect, deleteStaffMember);

export default router;
