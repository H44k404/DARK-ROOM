import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function verifyLogin() {
    const email = 'superadmin@darkroom.lk';
    const password = 'admin123';

    console.log(`Checking user: ${email}`);
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        console.error('❌ User NOT FOUND in database!');
        return;
    }

    console.log('✅ User FOUND:', user.username, user.email, user.role);
    console.log('Stored Hash:', user.password);

    console.log(`Verifying password: "${password}"`);
    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
        console.log('✅ Password Match! Login should work.');
    } else {
        console.error('❌ Password MISMATCH! The stored hash does not match "admin123".');

        // Attempt to fix it
        console.log('🔄 Attempting to fix password...');
        const newHash = await bcrypt.hash(password, 10);
        await prisma.user.update({
            where: { email },
            data: { password: newHash }
        });
        console.log('✅ Password updated manually. Try logging in now.');
    }
}

verifyLogin()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
