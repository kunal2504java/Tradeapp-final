import 'dotenv/config'; 
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const adminEmail = 'dev@gmail.com'; // Change this
    const adminPassword = 'Get2417@'; // CHANGE THIS

    const passwordHash = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            role: 'ADMIN', // Ensure the role is updated if user exists
        },
        create: {
            full_name: 'Admin User',
            email: adminEmail,
            password_hash: passwordHash,
            referral_code: 'ADMINUSE', // An admin might not need a real one
            role: 'ADMIN', // Set the role to ADMIN on creation
        },
    });

    // Ensure wallet exists for the admin user
    await prisma.wallet.upsert({
        where: { user_id: admin.id },
        update: {},
        create: {
            user_id: admin.id,
            balance: 0,
        },
    });

    console.log('Admin user created/updated successfully:', admin.email);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

