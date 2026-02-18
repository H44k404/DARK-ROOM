import prisma from '../db.js';
import jwt from 'jsonwebtoken';


import { getIO } from '../socket.js';

export const getPosts = async (req, res) => {
    try {
        const { category, type, limit = 10, skip = 0, status = 'published' } = req.query;

        // If an Authorization header is present, try to decode it to set req.user (optional)
        if (!req.user && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // Fetch basic user data and attach to req.user (non-fatal)
                const user = await prisma.user.findUnique({ where: { id: decoded.id }, select: { id: true, username: true, role: true, email: true } });
                if (user) req.user = user;
            } catch (err) {
                // ignore token errors for optional auth
            }
        }

        // If not super_admin/admin/editor, can only see published
        const finalStatus = (req.user && (req.user.role === 'super_admin' || req.user.role === 'admin' || req.user.role === 'editor'))
            ? status
            : 'published';

        const query = {
            where: { status: finalStatus },
            include: {
                category: true,
                images: true
            },
            orderBy: { createdAt: 'desc' },
            take: parseInt(limit),
            skip: parseInt(skip)
        };

        if (category) {
            query.where.category = { slug: category };
        }
        if (type) {
            query.where.postType = type;
        }

        const posts = await prisma.post.findMany(query);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
};

export const getPostBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                category: true,
                images: true
            }
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Increment view count
        await prisma.post.update({
            where: { id: post.id },
            data: { viewCount: { increment: 1 } }
        });

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, slug, content, excerpt, featuredImage, postType, categoryId, images, videoUrl, audioUrl } = req.body;

        console.log('========== CREATE POST REQUEST ==========');
        console.log('Full body:', req.body);
        console.log('Extracted values:', { title, slug, content, excerpt, featuredImage, postType, categoryId, images, videoUrl, audioUrl });
        console.log('User info:', req.user);
        console.log('=========================================');

        // Validation
        if (!title || !slug || !content) {
            console.error('Missing required fields:', { title: !!title, slug: !!slug, content: !!content });
            return res.status(400).json({ message: 'Title, slug, and content are required' });
        }

        // Check if slug already exists
        const existingPost = await prisma.post.findUnique({
            where: { slug }
        });

        if (existingPost) {
            console.warn('Slug already exists:', slug);
            return res.status(400).json({ message: 'A post with this slug already exists. Please change the title or slug.' });
        }

        if (!categoryId) {
            console.error('categoryId is missing or falsy:', categoryId);
            return res.status(400).json({ message: 'Category ID is required' });
        }

        // Check if category exists
        const categoryExists = await prisma.category.findUnique({
            where: { id: parseInt(categoryId) }
        });

        if (!categoryExists) {
            console.error('Category does not exist:', categoryId);
            return res.status(400).json({ message: 'Selected category does not exist' });
        }

        // Determine initial status: Admin, editor, and super_admin publish directly, others set to pending
        const status = (req.user.role === 'super_admin' || req.user.role === 'admin' || req.user.role === 'editor') ? 'published' : 'pending';

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                featuredImage,
                postType,
                categoryId: parseInt(categoryId),
                videoUrl,
                audioUrl,
                status,
                publishedAt: status === 'published' ? new Date() : null,
                images: images ? {
                    create: images.map(img => ({ url: img.url, alt: img.alt, caption: img.caption }))
                } : undefined
            },
            include: {
                category: true // Include category for the frontend
            }
        });

        console.log('Post created successfully:', post.id);

        // Emit socket event if the post is published
        if (status === 'published') {
            try {
                const io = getIO();
                // Format post data to match what the frontend expects (similar to getPosts)
                const formattedPost = {
                    id: post.id,
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    featuredImage: post.featuredImage,
                    postType: post.postType,
                    categoryName: post.category?.name || 'Uncategorized',
                    publishedAt: post.publishedAt,
                    viewCount: post.viewCount || 0
                };
                io.emit('new-article', formattedPost);
            } catch (err) {
                console.error('Socket emit failed:', err);
            }
        }

        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);

        // Handle unique constraint violation (just in case race condition)
        if (error.code === 'P2002') {
            return res.status(400).json({ message: 'A post with this slug already exists.' });
        }

        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

export const approvePost = async (req, res) => {
    try {
        if (req.user.role !== 'super_admin') {
            return res.status(403).json({ message: 'Only Super Admin can approve posts' });
        }

        const { id } = req.params;
        const post = await prisma.post.update({
            where: { id: parseInt(id) },
            data: {
                status: 'published',
                publishedAt: new Date()
            }
        });

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error approving post', error: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.post.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' }
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

export const getStats = async (req, res) => {
    try {
        const totalPosts = await prisma.post.count();

        const viewsAggregation = await prisma.post.aggregate({
            _sum: {
                viewCount: true
            }
        });
        const totalViews = viewsAggregation._sum.viewCount || 0;

        const postsByType = await prisma.post.groupBy({
            by: ['postType'],
            _count: {
                postType: true
            }
        });

        // Format post type stats
        const typeStats = {
            article: 0,
            video: 0,
            audio: 0
        };
        postsByType.forEach(group => {
            if (typeStats[group.postType] !== undefined) {
                typeStats[group.postType] = group._count.postType;
            }
        });

        // Top 5 posts by view count
        const topPosts = await prisma.post.findMany({
            orderBy: { viewCount: 'desc' },
            take: 5,
            include: {
                category: true
            }
        });

        res.json({
            totalPosts,
            totalViews,
            typeStats,
            topPosts
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
};
export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: {
                category: true,
                images: true
            }
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, slug, content, excerpt, featuredImage, postType, categoryId, images, videoUrl, audioUrl } = req.body;

        // Validation
        if (!title || !slug || !content) {
            return res.status(400).json({ message: 'Title, slug, and content are required' });
        }

        if (!categoryId) {
            return res.status(400).json({ message: 'Category ID is required' });
        }

        // Check if category exists
        const categoryExists = await prisma.category.findUnique({
            where: { id: parseInt(categoryId) }
        });

        if (!categoryExists) {
            return res.status(400).json({ message: 'Selected category does not exist' });
        }

        const post = await prisma.post.update({
            where: { id: parseInt(id) },
            data: {
                title,
                slug,
                content,
                excerpt,
                featuredImage,
                postType,
                categoryId: parseInt(categoryId),
                videoUrl,
                audioUrl,
                // We typically don't update status/audit fields here randomly, unless specified
                images: images ? {
                    deleteMany: {}, // Optional: clear old images if replacing
                    create: images.map(img => ({ url: img.url, alt: img.alt, caption: img.caption }))
                } : undefined
            },
            include: {
                category: true
            }
        });

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
};
