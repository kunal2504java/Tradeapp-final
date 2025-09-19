import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedRewards() {
  try {
    console.log('Seeding rewards table...');
    
    // Check if rewards already exist
    const existingRewards = await prisma.rewards.count();
    
    if (existingRewards > 0) {
      console.log('Rewards already exist. Skipping seed.');
      return;
    }
    
    // Create reward tiers
    const rewards = await prisma.rewards.createMany({
      data: [
        {
          reward_name: 'Fast Track Rank 1',
          bonus_amount: 50,
          rank_to_achieve: 1,
          timeframe_days: 30,
        },
        {
          reward_name: 'Fast Track Rank 2',
          bonus_amount: 150,
          rank_to_achieve: 2,
          timeframe_days: 60,
        },
        {
          reward_name: 'Fast Track Rank 3',
          bonus_amount: 500,
          rank_to_achieve: 3,
          timeframe_days: 90,
        },
        {
          reward_name: 'Fast Track Rank 4',
          bonus_amount: 1000,
          rank_to_achieve: 4,
          timeframe_days: 120,
        },
        {
          reward_name: 'Fast Track Rank 5',
          bonus_amount: 2000,
          rank_to_achieve: 5,
          timeframe_days: 180,
        },
      ],
    });
    
    console.log(`✅ Created ${rewards.count} reward tiers`);
    
  } catch (error) {
    console.error('❌ Error seeding rewards:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedRewards();