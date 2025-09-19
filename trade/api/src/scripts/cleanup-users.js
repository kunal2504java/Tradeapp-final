import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupAllUsers() {
  try {
    console.log('Starting user cleanup...');
    
    // Option 1: Delete all users and related data (cascading deletes)
    // This will automatically delete related investments, transactions, wallets due to cascade rules
    const deletedUsers = await prisma.users.deleteMany({});
    
    console.log(`✅ Deleted ${deletedUsers.count} users and all related data`);
    
    // Reset auto-increment sequences if needed (PostgreSQL)
    // await prisma.$executeRaw`ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function cleanupUsersExceptAdmin() {
  try {
    console.log('Starting user cleanup (keeping admin users)...');
    
    // Delete all users except admins
    const deletedUsers = await prisma.users.deleteMany({
      where: {
        role: {
          not: 'ADMIN'
        }
      }
    });
    
    console.log(`✅ Deleted ${deletedUsers.count} non-admin users and related data`);
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function cleanupSpecificUser(email) {
  try {
    console.log(`Deleting user: ${email}`);
    
    const deletedUser = await prisma.users.delete({
      where: { email }
    });
    
    console.log(`✅ Deleted user: ${deletedUser.full_name} (${deletedUser.email})`);
    
  } catch (error) {
    console.error('❌ Error deleting user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the appropriate cleanup function
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'all':
    cleanupAllUsers();
    break;
  case 'except-admin':
    cleanupUsersExceptAdmin();
    break;
  case 'user':
    if (args[1]) {
      cleanupSpecificUser(args[1]);
    } else {
      console.log('Please provide an email: node cleanup-users.js user email@example.com');
    }
    break;
  default:
    console.log(`
Usage:
  node cleanup-users.js all              # Delete ALL users and data
  node cleanup-users.js except-admin     # Delete all users except admins
  node cleanup-users.js user <email>     # Delete specific user by email
    `);
}
