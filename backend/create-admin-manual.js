import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    try {
        const adminPassword = await bcrypt.hash('admin123', 10);
        const admin = await prisma.user.create({
            data: {
                email: 'admin@darkroom.lk',
                username: 'admin',
                password: adminPassword,
                name: 'Super Admin',
                role: 'super_admin'
            }
        });
        console.log('Admin created:', admin);
    } catch (error) {
        console.error('Failed to create admin:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
