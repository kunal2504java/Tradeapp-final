import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import prisma from '../lib/prisma.js';
export const rewardsRouter = Router();
rewardsRouter.use(requireAuth);

rewardsRouter.get('/status', async (req, res) => {
  const userId = req.user.id;
  try {
    const [rewards, user, userRewards] = await Promise.all([
      prisma.rewards.findMany(),
      prisma.users.findUnique({
        where: { id: userId },
        select: { created_at: true }  // Using created_at instead of registrationDate
      }),
      prisma.user_rewards.findMany({
        where: { user_id: userId }
      }),
    ]);

    const regDate = user?.created_at || new Date();

    const statuses = rewards.map((r) => {
      const ur = userRewards.find((ur) => ur.reward_id === r.id);
      const deadline = new Date(regDate);
      deadline.setDate(deadline.getDate() + r.timeframe_days);
      const remainingMs = Math.max(0, deadline.getTime() - new Date().getTime());
      
      return {
        rewardId: r.id,
        rewardName: r.reward_name,
        bonusAmount: r.bonus_amount,
        timeframeInDays: r.timeframe_days,
        status: ur?.status ?? 'in_progress',
        deadlineDate: deadline,
        remainingMs,
      };
    });
    return res.json(statuses);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to load rewards status' });
  }
});
