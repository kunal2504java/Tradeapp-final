import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { z } from 'zod';
import prisma from '../lib/prisma.js';
export const investmentRouter = Router();

// This middleware ensures that for all subsequent routes on this router,
// req.user will be defined.
investmentRouter.use(requireAuth);

const depositSchema = z.object({
  amount: z.number().positive(),
  package_name: z.string().min(1),
});

investmentRouter.post('/deposit', async (req, res) => {
  const parse = depositSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

  const { amount, package_name } = parse.data;
  // In JS, we can directly access req.user after requireAuth has run.
  const userId = req.user.id;

  try {
    const startDate = new Date();
    const unlockDate = new Date(startDate);
    unlockDate.setMonth(unlockDate.getMonth() + 6);

    let profitRate = 0;
    if (amount >= 100 && amount <= 999) {
      profitRate = 12;
    } else if (amount >= 1000) {
      profitRate = 15;
    }

    if (profitRate === 0) {
      return res.status(400).json({ error: 'Investment amount does not fit any package.' });
    }

    const newInvestment = await prisma.$transaction(async (tx) => {
      const investmentCount = await tx.investments.count({ where: { user_id: userId } });
      
      const createdInvestment = await tx.investments.create({
        data: {
          user_id: userId,
          amount,
          package_name,
          monthly_profit_rate: profitRate,
          status: 'active',
          start_date: startDate,
          unlock_date: unlockDate,
        },
      });

      // If this is the user's very first investment, process direct income for their sponsor.
      if (investmentCount === 0) {
        const user = await tx.users.findUnique({ where: { id: userId }, select: { sponsor_id: true } });
        const sponsorId = user?.sponsor_id;
        if (sponsorId) {
          const directIncome = amount * 0.05; // 5% direct income
          await tx.wallets.update({
            where: { user_id: sponsorId },
            data: { balance: { increment: directIncome } },
          });
          await tx.transactions.create({
            data: {
              user_id: sponsorId,
              amount: directIncome,
              type: 'credit',
              income_source: 'direct_income',
              description: `Direct income (5%) from referral's first deposit`,
            },
          });
        }
      }
      return createdInvestment;
    });

    return res.status(201).json(newInvestment);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Deposit failed' });
  }
});

investmentRouter.get('/history', async (req, res) => {
  const userId = req.user.id;
  try {
    const history = await prisma.investments.findMany({
      where: { user_id: userId },
      orderBy: { start_date: 'desc' },
    });
    return res.json(history);
  } catch {
    return res.status(500).json({ error: 'Failed to load investments' });
  }
});
