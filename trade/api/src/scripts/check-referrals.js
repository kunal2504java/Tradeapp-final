import prisma from '../lib/prisma.js';

async function checkReferrals() {
  try {
    const userId = process.argv[2];
    
    if (!userId) {
      console.log('Usage: node check-referrals.js <user_id>');
      console.log('\n📋 Listing all users and their relationships:\n');
      
      // List all users with their sponsor relationships
      const allUsers = await prisma.users.findMany({
        select: {
          id: true,
          email: true,
          full_name: true,
          referral_code: true,
          sponsor_id: true,
          created_at: true
        },
        orderBy: { created_at: 'asc' }
      });
      
      console.log('Total users in database:', allUsers.length);
      console.log('\n👥 User List:\n');
      
      for (const user of allUsers) {
        console.log(`📧 ${user.email}`);
        console.log(`   ID: ${user.id}`);
        console.log(`   Name: ${user.full_name}`);
        console.log(`   Referral Code: ${user.referral_code}`);
        console.log(`   Sponsor ID: ${user.sponsor_id || 'None (Root user)'}`);
        
        // Find sponsor details
        if (user.sponsor_id) {
          const sponsor = await prisma.users.findUnique({
            where: { id: user.sponsor_id },
            select: { email: true, full_name: true }
          });
          if (sponsor) {
            console.log(`   Sponsor: ${sponsor.full_name} (${sponsor.email})`);
          }
        }
        
        // Count direct referrals
        const referralCount = await prisma.users.count({
          where: { sponsor_id: user.id }
        });
        console.log(`   Direct Referrals: ${referralCount}`);
        
        console.log('   ---');
      }
      
      return;
    }
    
    // Check specific user
    console.log(`\n🔍 Checking referrals for user ID: ${userId}\n`);
    
    // Get user details
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        full_name: true,
        referral_code: true,
        sponsor_id: true,
        created_at: true
      }
    });
    
    if (!user) {
      console.error(`❌ User with ID ${userId} not found`);
      return;
    }
    
    console.log('👤 User Details:');
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.full_name}`);
    console.log(`   Referral Code: ${user.referral_code}`);
    console.log(`   Sponsor ID: ${user.sponsor_id || 'None'}`);
    console.log(`   Created: ${user.created_at}`);
    
    // Get sponsor details if exists
    if (user.sponsor_id) {
      const sponsor = await prisma.users.findUnique({
        where: { id: user.sponsor_id },
        select: { email: true, full_name: true, referral_code: true }
      });
      if (sponsor) {
        console.log(`\n👆 Sponsored by: ${sponsor.full_name} (${sponsor.email})`);
      }
    }
    
    // Get direct referrals
    console.log('\n👥 Direct Referrals:');
    const directReferrals = await prisma.users.findMany({
      where: { sponsor_id: userId },
      select: {
        id: true,
        email: true,
        full_name: true,
        referral_code: true,
        created_at: true
      },
      orderBy: { created_at: 'desc' }
    });
    
    if (directReferrals.length === 0) {
      console.log('   No direct referrals found');
      
      // Debug: Check if anyone has used this user's referral code
      console.log('\n🔍 Debug Info:');
      console.log(`   Looking for users with sponsor_id = ${userId}`);
      
      // Raw query to double-check
      const rawResult = await prisma.$queryRaw`
        SELECT id, email, full_name, sponsor_id 
        FROM users 
        WHERE sponsor_id = ${userId}
      `;
      console.log('   Raw query result:', rawResult);
      
    } else {
      console.log(`   Found ${directReferrals.length} direct referral(s):`);
      directReferrals.forEach((ref, index) => {
        console.log(`\n   ${index + 1}. ${ref.full_name} (${ref.email})`);
        console.log(`      ID: ${ref.id}`);
        console.log(`      Referral Code: ${ref.referral_code}`);
        console.log(`      Joined: ${ref.created_at}`);
      });
    }
    
    // Get total network size
    console.log('\n📊 Network Statistics:');
    const getFullDownline = async (startUserId) => {
      const list = [];
      const queue = [startUserId];
      const visited = new Set([startUserId]);
      
      while (queue.length > 0) {
        const currentId = queue.shift();
        const children = await prisma.users.findMany({
          where: { sponsor_id: currentId },
          select: { id: true, email: true, full_name: true }
        });
        
        for (const child of children) {
          if (!visited.has(child.id)) {
            list.push(child);
            queue.push(child.id);
            visited.add(child.id);
          }
        }
      }
      return list;
    };
    
    const network = await getFullDownline(userId);
    console.log(`   Total network size: ${network.length} users`);
    if (network.length > 0) {
      console.log('   Network members:');
      network.forEach(member => {
        console.log(`      - ${member.full_name} (${member.email})`);
      });
    }
    
    // Check recent registrations
    console.log('\n📅 Recent Registrations in System:');
    const recentUsers = await prisma.users.findMany({
      take: 5,
      orderBy: { created_at: 'desc' },
      select: {
        email: true,
        full_name: true,
        sponsor_id: true,
        created_at: true
      }
    });
    
    recentUsers.forEach(recent => {
      console.log(`   - ${recent.full_name} (${recent.email})`);
      console.log(`     Sponsor ID: ${recent.sponsor_id || 'None'}`);
      console.log(`     Registered: ${recent.created_at}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkReferrals();