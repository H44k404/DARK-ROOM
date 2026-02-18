import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('file:')) {
    try {
        await prisma.$queryRawUnsafe('PRAGMA journal_mode = WAL;');
        console.log('SQLite WAL mode enabled');
    } catch (error) {
        console.error('Failed to enable WAL mode:', error);
    }
}

export default prisma;
