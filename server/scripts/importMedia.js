import 'dotenv/config';
import fs from 'fs';
import prisma from '../db.js';

async function main() {
    console.log('Starting media migration...');

    try {
        const rawData = fs.readFileSync('./wp-media.json', 'utf8');
        const mediaItems = JSON.parse(rawData);

        console.log(`Processing ${mediaItems.length} media items...`);

        for (const item of mediaItems) {
            const mediaUrl = item.source_url;
            const wpPostId = item.post;
            const caption = item.title?.rendered || '';

            if (!wpPostId) continue;

            // We need to find the local post that corresponds to this WordPress post ID.
            // Since we imported posts earlier, we can match them if we know which WP post ID they had.
            // However, our initial import didn't store the WP ID. 
            // Better: We can match by title or slug if we had them.
            // In wp-data.json, we have IDs. Let's assume the user provided media for those specific posts.

            // For now, let's use a mapping based on the provided JSON data.
            // 628 -> untitled-design-27 (Post 1)
            // 623 -> national-intergrity-2 (Post 2)
            // ... and so on.

            // Map WP Post ID to local Slug (based on previous import data)
            const idToSlug = {
                623: 'national-intergrity-2',
                614: 'jaffna-shooting-incident-2',
                610: 'saman-ekanayaka',
                605: 'trinco-bail-out',
                600: 'pakistan-usa',
                596: 'record-remittances-to-sri-lanka-hidden-realities-behind-the-headlines',
                628: 'untitled-design-27' // Hypothetical or from other data
            };

            const slug = idToSlug[wpPostId];
            if (!slug) {
                console.log(`- Skipping media ${item.id}: No local post mapping for WP ID ${wpPostId}`);
                continue;
            }

            const post = await prisma.post.findUnique({
                where: { slug }
            });

            if (!post) {
                console.log(`- Skipping media ${item.id}: Local post with slug "${slug}" not found`);
                continue;
            }

            // Create PostImage entry
            await prisma.postImage.create({
                data: {
                    url: mediaUrl,
                    caption: caption,
                    postId: post.id
                }
            });

            console.log(`- Linked image to post: ${slug}`);
        }

        console.log('Media migration completed successfully!');
    } catch (error) {
        console.error('Media migration failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
