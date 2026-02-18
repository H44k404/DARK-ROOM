import express from 'express';
import * as postController from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/categories', postController.getCategories);
router.get('/stats', postController.getStats);
router.get('/slug/:slug', postController.getPostBySlug);

// Protected routes
router.post('/', protect, postController.createPost);
router.put('/:id', protect, postController.updatePost);
router.put('/:id/approve', protect, postController.approvePost);
router.delete('/:id', protect, postController.deletePost);

// Public route for fetching by ID (useful for editing checking? No, editing is protected)
// But for redundancy/admin use, let's keep it.
// Place it before or after slug? After specific routes.
router.get('/:id', postController.getPostById);

export default router;
