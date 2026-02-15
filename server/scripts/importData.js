import 'dotenv/config';
import fs from 'fs';
import prisma from '../db.js';

const categoryMap = {
    2: 'featured',
    18: 'foreign',
    19: 'local'
};

const CATEGORY_NAMES = {
    'featured': 'Featured',
    'foreign': 'Foreign',
    'local': 'Local'
};

async function main() {
    console.log('Starting data migration...');

    try {
        const rawData = fs.readFileSync('./wp-data.json', 'utf8');
        const posts = JSON.parse(rawData);

        // 1. Ensure Categories exist
        console.log('Ensuring categories exist...');
        const categories = {};
        for (const [id, slug] of Object.entries(categoryMap)) {
            const category = await prisma.category.upsert({
                where: { slug },
                update: {},
                create: {
                    name: CATEGORY_NAMES[slug],
                    slug
                }
            });
            categories[id] = category.id;
        }

        // 2. Import Posts
        console.log(`Importing ${posts.length} posts...`);
        for (const wpPost of posts) {
            const title = wpPost.title.rendered;
            const slug = wpPost.slug;
            const content = wpPost.content?.rendered || '';
            const excerpt = wpPost.excerpt?.rendered || '';
            const featuredImage = wpPost.jetpack_featured_media_url || null;
            const publishedAt = new Date(wpPost.date);

            // Map category (use first one found in map)
            let categoryId = null;
            if (wpPost.categories && wpPost.categories.length > 0) {
                for (const catId of wpPost.categories) {
                    if (categories[catId]) {
                        categoryId = categories[catId];
                        break;
                    }
                }
            }

            // Default to 'featured' if no mapping found
            if (!categoryId) {
                categoryId = categories[2];
            }

            await prisma.post.upsert({
                where: { slug },
                update: {},
                create: {
                    title,
                    slug,
                    content,
                    excerpt,
                    featuredImage,
                    postType: 'article',
                    status: 'published',
                    publishedAt,
                    categoryId
                }
            });
            console.log(`- Imported: ${title}`);
        }

        console.log('Migration completed successfully!');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
