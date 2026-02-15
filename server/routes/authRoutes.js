import express from 'express';
import { loginUser, getMe, registerUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', protect, getMe);

// 2FA Routes
router.post('/setup-2fa', protect, setup2FA);
router.post('/verify-2fa', protect, verify2FA);

// Password Reset Routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
