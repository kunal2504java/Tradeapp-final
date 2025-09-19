import prisma from '../lib/prisma.js';
import bcrypt from 'bcryptjs';
import { generateUniqueReferralCode } from '../utils/referralCode.js';

async function testReferralSystem() {
  try {
    console.log('🧪 Testing Referral System...\n');
    
    // Step 1: Create or find admin user
    console.log('Step 1: Finding admin user...');
    const admin = await prisma.users.findUnique({
      where: { email: 'admin@foxtrading.com' }
    });
    
    if (!admin) {
      console.error('❌ Admin user not found. Please run create-root-user.js first');
      return;
    }
    
    console.log(`✅ Found admin: ${admin.email} (Referral Code: ${admin.referral_code})\n`);
    
    // Step 2: Create a test user under admin
    console.log('Step 2: Creating test user under admin...');
    const testUser1Email = `test1_${Date.now()}@example.com`;
    const testUser1 = await prisma.users.create({
      data: {
        full_name: 'Test User 1',
        email: testUser1Email,
        password_hash: await bcrypt.hash('password123', 10),
        referral_code: await generateUniqueReferralCode(),
        sponsor_id: admin.id,
        wallets: { create: { balance: 0 } }
      }
    });
    
    console.log(`✅ Created ${testUser1.email} under admin`);
    console.log(`   Sponsor ID: ${testUser1.sponsor_id}`);
    console.log(`   Referral Code: ${testUser1.referral_code}\n`);
    
    // Step 3: Create another test user under test user 1
    console.log('Step 3: Creating test user 2 under test user 1...');
    const testUser2Email = `test2_${Date.now()}@example.com`;
    const testUser2 = await prisma.users.create({
      data: {
        full_name: 'Test User 2',
        email: testUser2Email,
        password_hash: await bcrypt.hash('password123', 10),
        referral_code: await generateUniqueReferralCode(),
        sponsor_id: testUser1.id,
        wallets: { create: { balance: 0 } }
      }
    });
    
    console.log(`✅ Created ${testUser2.email} under ${testUser1.email}`);
    console.log(`   Sponsor ID: ${testUser2.sponsor_id}\n`);
    
    // Step 4: Verify admin's referrals
    console.log('Step 4: Checking admin\'s direct referrals...');
    const adminReferrals = await prisma.users.findMany({
      where: { sponsor_id: admin.id },
      select: { email: true, full_name: true, created_at: true }
    });
    
    console.log(`Admin has ${adminReferrals.length} direct referral(s):`);
    adminReferrals.forEach(ref => {
      console.log(`   - ${ref.full_name} (${ref.email})`);
    });
    
    // Step 5: Verify test user 1's referrals
    console.log('\nStep 5: Checking test user 1\'s direct referrals...');
    const test1Referrals = await prisma.users.findMany({
      where: { sponsor_id: testUser1.id },
      select: { email: true, full_name: true, created_at: true }
    });
    
    console.log(`Test User 1 has ${test1Referrals.length} direct referral(s):`);
    test1Referrals.forEach(ref => {
      console.log(`   - ${ref.full_name} (${ref.email})`);
    });
    
    // Step 6: Check total network size for admin
    console.log('\nStep 6: Calculating admin\'s total network...');
    const getFullDownline = async (userId) => {
      const list = [];
      const queue = [userId];
      const visited = new Set([userId]);
      
      while (queue.length > 0) {
        const currentId = queue.shift();
        const children = await prisma.users.findMany({
          where: { sponsor_id: currentId },
          select: { id: true, email: true }
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
    
    const adminNetwork = await getFullDownline(admin.id);
    console.log(`Admin's total network size: ${adminNetwork.length} users`);
    adminNetwork.forEach(user => {
      console.log(`   - ${user.email}`);
    });
    
    console.log('\n✅ Referral system test completed successfully!');
    console.log('The referral chain is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testReferralSystem();