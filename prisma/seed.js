import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

async function main() {
    console.log('Start seeding ...');

    // Categories
    const categories = [
        { name: 'Sri Lanka', slug: 'sri-lanka' },
        { name: 'Political', slug: 'political' },
        { name: 'Feature', slug: 'feature' },
        { name: 'International', slug: 'international' },
        { name: 'Other', slug: 'other' }
    ];

    console.log('Seeding categories...');
    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat
        });
    }

    // Admin User
    console.log('Seeding admin user...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    try {
        await prisma.user.upsert({
            where: { email: 'superadmin@darkroom.lk' },
            update: {
                password: adminPassword,
                role: 'super_admin'
            },
            create: {
                email: 'superadmin@darkroom.lk',
                username: 'superadmin',
                password: adminPassword,
                name: 'Super Admin',
                role: 'super_admin'
            },
        });
    } catch (err) {
        console.log('Admin user might already exist with a different email or username, skipping.');
    }

    // Default Settings (Ticker, Donation)
    // Ticker
    await prisma.setting.upsert({
        where: { key: 'ticker' },
        update: {},
        create: {
            key: 'ticker',
            value: JSON.stringify({
                enabled: true,
                message: 'BREAKING: Important announcement - Major economic reforms announced by the government • Stay tuned for live updates'
            })
        }
    });

    // Donation
    await prisma.setting.upsert({
        where: { key: 'donation' },
        update: {},
        create: {
            key: 'donation',
            value: JSON.stringify({
                paypal: { enabled: true, email: 'donate@darkroom.lk', link: 'https://paypal.me/darkroomlk' },
                bank: { enabled: true, bankName: 'Commercial Bank of Ceylon', accountName: 'Dark Room Media', accountNumber: '8123456789', branch: 'Colombo Main' },
                crypto: { enabled: true, btcAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', usdtAddress: 'TXTuYtXbK2GqJzQ...' }
            })
        }
    });

    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
