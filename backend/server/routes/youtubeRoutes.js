import express from 'express';
import * as youtubeController from '../controllers/youtubeController.js';

const router = express.Router();

router.get('/latest', youtubeController.getLatestVideos);

export default router;
