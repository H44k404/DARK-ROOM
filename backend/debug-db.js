import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true
        }
    });

    console.log('--- Post Slugs Debug ---');
    if (posts.length === 0) {
        console.log('No posts found.');
    } else {
        posts.forEach(p => {
            console.log(`[${p.id}] "${p.title}" -> slug: "${p.slug}"`);
        });
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
