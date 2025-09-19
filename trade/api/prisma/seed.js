import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create guest user
  const guestEmail = 'guest@demo.local';
  const guestPassword = 'password123';
  const hashedPassword = await bcrypt.hash(guestPassword, 10);
  
  // Create or update guest user
  const user = await prisma.users.upsert({
    where: { email: guestEmail },
    update: {},
    create: {
      full_name: 'Guest Demo',
      email: guestEmail,
      password_hash: hashedPassword,
      referral_code: 'GUESTDEMO',
      role: 'USER',
      created_at: new Date()
    },
  });

  // Create or update wallet for guest user
  await prisma.wallets.upsert({
    where: { user_id: user.id },
    update: {},
    create: {
      user_id: user.id,
      balance: 5000,
    },
  });

  console.log('✅ Seed complete: Guest user created');
  console.log(`   Email: ${guestEmail}`);
  console.log(`   Password: ${guestPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
