import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const guestEmail = 'guest@demo.local';
  
  const user = await prisma.users.upsert({
    where: { email: guestEmail },
    update: {},
    create: {
      full_name: 'Guest Demo',
      email: guestEmail,
      // Note: This is a placeholder password hash for "password123"
      password_hash: '$2a$10$O2m9Oe4C6xZzK8g0z5i3QeS98pW8m2Hk4X7kI6r0tPz9w8q3c9b5C',
      referral_code: 'GUESTDEMO',
      role: 'USER',
    },
  });

  await prisma.wallets.upsert({
    where: { user_id: user.id },
    update: {},
    create: {
      user_id: user.id,
      balance: 5000,
    },
  });

  console.log('Seed complete: Guest user created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
