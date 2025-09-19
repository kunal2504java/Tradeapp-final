import prisma from '../lib/prisma.js';

async function linkSponsor() {
  try {
    const userEmail = process.argv[2];
    const sponsorReferralCode = process.argv[3];
    
    if (!userEmail || !sponsorReferralCode) {
      console.log('Usage: node link-sponsor.js <user_email> <sponsor_referral_code>');
      console.log('Example: node link-sponsor.js saurabh@example.com CD4DH56X');
      return;
    }
    
    console.log(`\n🔗 Linking user ${userEmail} to sponsor with referral code ${sponsorReferralCode}\n`);
    
    // Find the user
    const user = await prisma.users.findUnique({
      where: { email: userEmail },
      select: {
        id: true,
        email: true,
        full_name: true,
        sponsor_id: true
      }
    });
    
    if (!user) {
      console.error(`❌ User with email ${userEmail} not found`);
      return;
    }
    
    if (user.sponsor_id) {
      console.error(`❌ User already has a sponsor (sponsor_id: ${user.sponsor_id})`);
      console.log('   Cannot change sponsor once set.');
      return;
    }
    
    // Find the sponsor
    const sponsor = await prisma.users.findUnique({
      where: { referral_code: sponsorReferralCode },
      select: {
        id: true,
        email: true,
        full_name: true,
        referral_code: true
      }
    });
    
    if (!sponsor) {
      console.error(`❌ Sponsor with referral code ${sponsorReferralCode} not found`);
      return;
    }
    
    // Check for circular reference
    if (sponsor.id === user.id) {
      console.error('❌ A user cannot be their own sponsor');
      return;
    }
    
    // Update the user with sponsor_id
    const updatedUser = await prisma.users.update({
      where: { id: user.id },
      data: { sponsor_id: sponsor.id }
    });
    
    console.log('✅ Successfully linked!');
    console.log(`   User: ${user.full_name} (${user.email})`);
    console.log(`   Sponsor: ${sponsor.full_name} (${sponsor.email})`);
    
    // Check sponsor's referral count
    const referralCount = await prisma.users.count({
      where: { sponsor_id: sponsor.id }
    });
    
    console.log(`\n📊 ${sponsor.full_name} now has ${referralCount} direct referral(s)`);
    
    // List all referrals
    const allReferrals = await prisma.users.findMany({
      where: { sponsor_id: sponsor.id },
      select: { full_name: true, email: true }
    });
    
    console.log('   Direct referrals:');
    allReferrals.forEach(ref => {
      console.log(`      - ${ref.full_name} (${ref.email})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

linkSponsor();