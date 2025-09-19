import prisma from './src/lib/prisma.js';

async function testOAuthReferral() {
    try {
        console.log('=== Testing OAuth Referral Code Functionality ===\n');
        
        // Get an existing user to use as sponsor
        const existingUsers = await prisma.users.findMany({
            select: {
                id: true,
                email: true,
                full_name: true,
                referral_code: true
            },
            take: 3
        });
        
        console.log('Existing users in the database:');
        existingUsers.forEach(user => {
            console.log(`- ${user.full_name} (${user.email}): ${user.referral_code}`);
        });
        
        if (existingUsers.length > 0) {
            const sponsor = existingUsers[0];
            console.log(`\nUse this referral code for testing: ${sponsor.referral_code}`);
            console.log(`This will link new OAuth users to sponsor: ${sponsor.full_name}`);
            
            // Generate OAuth URL with referral code
            const oauthUrl = `http://localhost:4000/api/auth/google?ref=${sponsor.referral_code}`;
            console.log(`\nOAuth URL with referral code:\n${oauthUrl}`);
            
            // Check current referrals for this sponsor
            const currentReferrals = await prisma.users.findMany({
                where: { sponsor_id: sponsor.id },
                select: {
                    full_name: true,
                    email: true,
                    created_at: true
                }
            });
            
            console.log(`\nCurrent referrals under ${sponsor.full_name}:`);
            if (currentReferrals.length === 0) {
                console.log('- No referrals yet');
            } else {
                currentReferrals.forEach(ref => {
                    console.log(`- ${ref.full_name} (${ref.email}) - joined ${ref.created_at}`);
                });
            }
        }
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testOAuthReferral();