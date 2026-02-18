import express from 'express';
import { getStaff, addStaffMember, deleteStaffMember, getUserProfile, updateUserProfile, updateUserRole } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/staff', protect, getStaff);
router.post('/add', protect, addStaffMember);
router.delete('/:id', protect, deleteStaffMember);

// Profile routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/:id/role', protect, updateUserRole);

export default router;
