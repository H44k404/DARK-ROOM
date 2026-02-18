import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateSlug(title) {
    return title.toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\p{L}\p{N}-]/gu, '') // Remove non-letter/number/dash chars (Unicode safe)
        .replace(/-+/g, '-')            // Collapse multiple dashes
        .replace(/^-+|-+$/g, '');       // Trim dashes
}

async function main() {
    console.log('Starting slug fix...');
    const posts = await prisma.post.findMany();

    for (const post of posts) {
        let baseSlug = generateSlug(post.title);

        // If slug became empty (e.g. all special chars), use 'post' + id
        if (!baseSlug) {
            baseSlug = `post-${post.id}`;
        }

        let uniqueSlug = baseSlug;
        let counter = 1;

        // Ensure uniqueness
        while (await prisma.post.findFirst({
            where: {
                slug: uniqueSlug,
                id: { not: post.id } // Exclude self
            }
        })) {
            uniqueSlug = `${baseSlug}-${counter}`;
            counter++;
        }

        if (post.slug !== uniqueSlug) {
            console.log(`Updating [${post.id}]: "${post.slug}" -> "${uniqueSlug}"`);
            await prisma.post.update({
                where: { id: post.id },
                data: { slug: uniqueSlug }
            });
        }
    }
    console.log('Slug fix complete.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
