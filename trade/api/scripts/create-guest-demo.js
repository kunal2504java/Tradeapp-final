import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function createGuestDemo() {
  const hashedPassword = await bcrypt.hash('guestdemo123', 10);
  
  try {
    const user = await prisma.users.create({
      data: {
        email: 'guest@demo.com',
        password_hash: hashedPassword,
        full_name: 'Guest Demo',
        referral_code: 'GUESTDEMO',
        role: 'USER'
      }
    });
    console.log('✅ Created guest demo user:', user);
  } catch (error) {
    console.error('❌ Error creating guest demo user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createGuestDemo();
