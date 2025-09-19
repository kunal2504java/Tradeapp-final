import prisma from '../lib/prisma.js';

// This function is now correct because the profit rate is saved correctly on the investment.
export async function runMonthlyTradingBonus() {
  const activeInvestments = await prisma.investment.findMany({
    where: { status: 'active' },
  });

  for (const inv of activeInvestments) {
    const bonus = inv.amount * inv.monthly_profit_rate / 100;
    // The type annotation for 'tx' is removed from the transaction
    await prisma.$transaction(async (tx) => {
      await tx.wallet.update({
        where: { user_id: inv.user_id },
        data: { balance: { increment: bonus } },
      });
      await tx.transaction.create({
        data: {
          user_id: inv.user_id, amount: bonus, type: 'credit', income_source: 'trading_bonus',
          description: `Monthly trading bonus for investment ${inv.id}`,
        },
      });
    });
  }
  console.log(`Processed ${activeInvestments.length} monthly trading bonuses.`);
}

export async function runMonthlyReferralIncome() {
  const referralPercentages = [
    12, // Level 1
    8,  // Level 2
    5, 5, 5, // Levels 3-5
    3, 3, 3, 3, 3, // Levels 6-10
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1 // Levels 11-20
  ];
  
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const tradingBonuses = await prisma.transactions.findMany({
    where: { income_source: 'trading_bonus', timestamp: { gte: startOfMonth } },
  });

  for (const bonus of tradingBonuses) {
    let currentUserId = bonus.user_id;
    for (let level = 0; level < referralPercentages.length; level++) {
      const user = await prisma.users.findUnique({ where: { id: currentUserId }, select: { sponsor_id: true } });
      const sponsorId = user?.sponsor_id;
      if (!sponsorId) break;

      const referralAmount = bonus.amount * referralPercentages[level] / 100;
      await prisma.$transaction(async (tx) => {
        await tx.wallets.update({ where: { user_id: sponsorId }, data: { balance: { increment: referralAmount } } });
        await tx.transactions.create({
          data: {
            user_id: sponsorId, amount: referralAmount, type: 'credit', income_source: 'referral_income',
            description: `Level ${level + 1} referral income`,
          },
        });
      });
      currentUserId = sponsorId;
    }
  }
  console.log('Processed monthly referral income.');
}

export async function runMonthlySalary() {
  const salaryRanks = [
    { threshold: 5000, amount: 100, rank: 1 },
    { threshold: 15000, amount: 250, rank: 2 },
    { threshold: 50000, amount: 500, rank: 3 },
    { threshold: 80000, amount: 750, rank: 4 },
    { threshold: 100000, amount: 1000, rank: 5 },
  ];
  
  const allUsers = await prisma.users.findMany({ select: { id: true, created_at: true } });

  // Helper function to get all downline user IDs
  const getDownlineIds = async (startUserId) => {
    const allDescendants = new Set();
    const queue = [startUserId];
    
    while (queue.length > 0) {
      const currentId = queue.shift();
      const children = await prisma.users.findMany({ 
        where: { sponsor_id: currentId }, 
        select: { id: true } 
      });
      
      for (const child of children) {
        if (!allDescendants.has(child.id)) {
          allDescendants.add(child.id);
          queue.push(child.id);
        }
      }
    }
    return Array.from(allDescendants);
  };

  for (const user of allUsers) {
    // Get all downline users (direct and indirect)
    const downlineIds = await getDownlineIds(user.id);

    // Calculate total downline volume
    const volumeResult = await prisma.investments.aggregate({ 
      _sum: { amount: true }, 
      where: { user_id: { in: downlineIds } } 
    });
    
    const totalVolume = volumeResult._sum.amount ?? 0;
    const eligibleRank = salaryRanks.slice().reverse().find(r => totalVolume >= r.threshold);

    if (eligibleRank) {
      await prisma.$transaction(async (tx) => {
        await tx.wallets.update({ where: { user_id: user.id }, data: { balance: { increment: eligibleRank.amount } } });
        await tx.transactions.create({
          data: {
            user_id: user.id, amount: eligibleRank.amount, type: 'credit', income_source: 'salary_income',
            description: `Monthly salary for total downline volume $${totalVolume}`,
          },
        });
        
        // Fast Track Rewards logic
        const rewards = await tx.rewards.findMany();
        for (const reward of rewards) {
          if (eligibleRank.rank >= reward.rank_to_achieve) {
            const existingReward = await tx.user_rewards.findFirst({ where: { user_id: user.id, reward_id: reward.id }});
            if (existingReward && existingReward.status !== 'in_progress') continue;

            const deadline = new Date(user.created_at);
            deadline.setDate(deadline.getDate() + reward.timeframe_days);

            if (new Date() <= deadline) {
              await tx.wallets.update({ where: { user_id: user.id }, data: { balance: { increment: reward.bonus_amount } } });
              await tx.transactions.create({ data: { user_id: user.id, amount: reward.bonus_amount, type: 'credit', income_source: 'fast_track_reward', description: reward.reward_name } });
              await tx.user_rewards.upsert({
                where: { id: existingReward?.id || '' },
                update: { status: 'achieved', achieved_date: new Date() },
                create: { user_id: user.id, reward_id: reward.id, status: 'achieved', achieved_date: new Date() },
              });
            } else {
              await tx.user_rewards.upsert({
                where: { id: existingReward?.id || '' },
                update: { status: 'expired' },
                create: { user_id: user.id, reward_id: reward.id, status: 'expired' },
              });
            }
          }
        }
      });
    }
  }
  console.log('Processed monthly salaries and rewards.');
}
