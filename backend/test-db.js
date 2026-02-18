console.log('Starting test-db.js');
import prisma from './server/db.js';

console.log('Imported prisma client');

async function main() {
    try {
        console.log('Attempting to connect...');
        const count = await prisma.user.count();
        console.log('Connection successful. User count:', count);
    } catch (e) {
        console.error('Connection failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
