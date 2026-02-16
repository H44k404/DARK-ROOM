import prisma from '../db.js';

export const getPosts = async (req, res) => {
    try {
        const { category, type, limit = 10, skip = 0, status = 'published' } = req.query;

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
        const { title, slug, content, excerpt, featuredImage, postType, categoryId, images } = req.body;

        // Determine initial status: Super Admin publishes directly, others set to pending
        const status = req.user.role === 'super_admin' ? 'published' : 'pending';

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                featuredImage,
                postType,
                categoryId: parseInt(categoryId),
                status,
                publishedAt: status === 'published' ? new Date() : null,
                images: images ? {
                    create: images.map(img => ({ url: img.url, alt: img.alt, caption: img.caption }))
                } : undefined
            }
        });

        res.status(201).json(post);
    } catch (error) {
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
