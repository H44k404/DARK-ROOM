import express from 'express';
import multer from 'multer';
import os from 'os';
import path from 'path';
import { deployFrontend } from '../controllers/deploymentController.js';

const router = express.Router();

// Use temp directory for file uploads
const tempDir = os.tmpdir();
const upload = multer({
    dest: tempDir,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    }
});

// Deploy frontend endpoint
router.post('/frontend', upload.single('frontend'), deployFrontend);

export default router;
