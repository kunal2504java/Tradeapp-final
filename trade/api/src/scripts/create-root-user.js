import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateUniqueReferralCode } from '../utils/referralCode.js';

const prisma = new PrismaClient();

async function createRootUser() {
  try {
    console.log('Creating root user...');
    
    const referralCode = await generateUniqueReferralCode();
    const passwordHash = await bcrypt.hash('admin123', 10);
    
    const rootUser = await prisma.users.create({
      data: {
        full_name: 'Root Admin',
        email: 'admin@foxtrading.com',
        password_hash: passwordHash,
        referral_code: referralCode,
        role: 'ADMIN',
        // No sponsor for root user
        sponsor_id: null,
        wallets: {
          create: { balance: 10000 } // Give admin some initial balance
        }
      }
    });
    
    console.log(`✅ Root user created successfully!`);
    console.log(`📧 Email: admin@foxtrading.com`);
    console.log(`🔑 Password: admin123`);
    console.log(`🔗 Referral Code: ${referralCode}`);
    console.log(`\n🎯 Use this referral code for new registrations: ${referralCode}`);
    
  } catch (error) {
    console.error('❌ Error creating root user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createRootUser();
