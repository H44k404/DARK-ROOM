import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

console.log('Imported PrismaClient');
console.log('DATABASE_URL:', process.env.DATABASE_URL);

try {
    const prisma = new PrismaClient();
    console.log('Instantiated PrismaClient (standard v5)');

    prisma.$connect().then(() => {
        console.log('Connected successfully via $connect');
        return prisma.$disconnect();
    }).catch(e => {
        console.error('Connection failed:', e);
        process.exit(1);
    });

} catch (e) {
    console.error('Failed to instantiate PrismaClient:', e);
    process.exit(1);
}
