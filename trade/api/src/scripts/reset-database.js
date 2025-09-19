import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetDatabase() {
  try {
    console.log('🔄 Starting database reset...');
    
    // Delete in correct order to handle foreign key constraints
    console.log('Deleting transactions...');
    await prisma.transactions.deleteMany({});
    
    console.log('Deleting investments...');
    await prisma.investments.deleteMany({});
    
    console.log('Deleting wallets...');
    await prisma.wallets.deleteMany({});
    
    console.log('Deleting users...');
    const deletedUsers = await prisma.users.deleteMany({});
    
    console.log(`✅ Database reset complete! Deleted ${deletedUsers.count} users and all related data`);
    
  } catch (error) {
    console.error('❌ Error during database reset:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();
