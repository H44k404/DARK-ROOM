import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

const CATEGORY_MAP = {
    19: 3, // local -> Local
    2: 1,  // featured -> Featured
};

const DEFAULT_CATEGORY_ID = 3;

async function migrate() {
    const data = JSON.parse(fs.readFileSync('./wp-data.json', 'utf8'));

    console.log(`Starting migration of ${data.length} posts...`);

    for (const post of data) {
        try {
            const categoryId = post.categories.map(id => CATEGORY_MAP[id]).find(id => id !== undefined) || DEFAULT_CATEGORY_ID;

            let postType = 'article';
            let audioUrl = null;
            let videoUrl = null;

            const content = post.content?.rendered || '';

            // Detect Soundcloud (Audio)
            if (content.includes('soundcloud.com')) {
                postType = 'audio';
                const match = content.match(/https:\/\/soundcloud\.com\/[^\s"']+/);
                if (match) audioUrl = match[0];
            }
            // Detect YouTube (Video)
            else if (content.includes('youtube.com') || content.includes('youtu.be')) {
                postType = 'video';
                const match = content.match(/https:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s"']+/);
                if (match) videoUrl = match[0];
            }

            await prisma.post.upsert({
                where: { slug: post.slug },
                update: {
                    title: post.title?.rendered || 'No Title',
                    content: content,
                    excerpt: post.excerpt?.rendered || '',
                    featuredImage: post.jetpack_featured_media_url,
                    status: post.status === 'publish' ? 'published' : 'draft',
                    publishedAt: new Date(post.date),
                    categoryId,
                    postType,
                    audioUrl,
                    videoUrl,
                },
                create: {
                    title: post.title?.rendered || 'No Title',
                    slug: post.slug,
                    content: content,
                    excerpt: post.excerpt?.rendered || '',
                    featuredImage: post.jetpack_featured_media_url,
                    status: post.status === 'publish' ? 'published' : 'draft',
                    publishedAt: new Date(post.date),
                    categoryId,
                    postType,
                    audioUrl,
                    videoUrl,
                }
            });
            console.log(`Migrated (${postType}): ${post.title?.rendered || 'No Title'}`);
        } catch (error) {
            console.error(`Failed to migrate post ${post.id}:`, error);
        }
    }

    console.log('Migration finished.');
    await prisma.$disconnect();
}

migrate();
