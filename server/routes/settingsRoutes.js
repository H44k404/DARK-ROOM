import express from 'express';
import { getSetting, updateSetting } from '../controllers/settingsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:key', getSetting);
router.put('/:key', protect, updateSetting);

export default router;
