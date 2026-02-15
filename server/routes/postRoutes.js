import express from 'express';
import * as postController from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/categories', postController.getCategories);
router.get('/slug/:slug', postController.getPostBySlug);

// Protected routes
router.post('/', protect, postController.createPost);
router.put('/:id/approve', protect, postController.approvePost);
router.delete('/:id', protect, postController.deletePost);

export default router;
