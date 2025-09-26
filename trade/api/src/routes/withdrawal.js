import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { z } from 'zod';
import prisma from '../lib/prisma.js';

export const withdrawalRouter = Router();
withdrawalRouter.use(requireAuth);

// Validation schemas
const withdrawIncomeSchema = z.object({
  amount: z.number()
    .min(10, 'Minimum withdrawal amount is $10')
    .refine((val) => val % 10 === 0, 'Amount must be in multiples of $10'),
  withdrawal_address: z.string().min(1, 'Withdrawal address is required'),
  blockchain: z.string().min(1, 'Blockchain selection is required')
});

const withdrawInvestmentSchema = z.object({
  investment_id: z.string().min(1, 'Investment ID is required'),
  withdrawal_address: z.string().min(1, 'Withdrawal address is required'),
  blockchain: z.string().min(1, 'Blockchain selection is required')
});

/**
 * POST /api/withdrawal/income
 * Withdraw earned income from wallet balance
 */
withdrawalRouter.post('/income', async (req, res) => {
  const userId = req.user.id;
  const parse = withdrawIncomeSchema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({ 
      success: false, 
      error: parse.error.flatten() 
    });
  }

  const { amount, withdrawal_address, blockchain } = parse.data;

  try {
    const result = await prisma.$transaction(async (prisma) => {
      // Get user's wallet with lock
      let wallet = await prisma.wallets.findUnique({
        where: { user_id: userId },
      });

      // If wallet doesn't exist, create one with 0 balance
      if (!wallet) {
        wallet = await prisma.wallets.create({
          data: {
            user_id: userId,
            balance: 0,
          },
        });
      }

      // Check if user has enough balance
      if (Number(wallet.balance) < amount) {
        throw new Error(`Insufficient balance. Available: $${Number(wallet.balance)}, Requested: $${amount}`);
      }

      // Create withdrawal transaction
      const transaction = await prisma.transactions.create({
        data: {
          user_id: userId,
          amount,
          type: 'debit',
          income_source: 'income_withdrawal',
          status: 'PENDING',
          description: `Income withdrawal of $${amount} to ${blockchain} address ${withdrawal_address.substring(0, 10)}...`,
        },
      });

      // Update wallet balance (deduct immediately for pending withdrawal)
      await prisma.wallets.update({
        where: { user_id: userId },
        data: { balance: { decrement: amount } },
      });

      return transaction;
    });

    res.status(201).json({
      success: true,
      message: 'Income withdrawal request submitted successfully. Processing may take 24-48 hours.',
      transaction: {
        id: result.id,
        amount: Number(result.amount),
        status: result.status,
        timestamp: result.timestamp,
      },
    });
  } catch (error) {
    console.error('Income withdrawal failed:', error);
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

/**
 * POST /api/withdrawal/investment
 * Withdraw investment principal (with 6-month lock period)
 */
withdrawalRouter.post('/investment', async (req, res) => {
  const userId = req.user.id;
  const parse = withdrawInvestmentSchema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({ 
      success: false, 
      error: parse.error.flatten() 
    });
  }

  const { investment_id, withdrawal_address, blockchain } = parse.data;

  try {
    const result = await prisma.$transaction(async (prisma) => {
      // Get the investment with lock
      const investment = await prisma.investments.findUnique({
        where: { 
          id: investment_id,
          user_id: userId // Ensure user owns the investment
        },
      });

      if (!investment) {
        throw new Error('Investment not found or access denied');
      }

      // Check if investment is active
      if (investment.status !== 'active') {
        throw new Error(`Cannot withdraw from ${investment.status} investment`);
      }

      // Check 6-month lock period
      const currentDate = new Date();
      const investmentDate = new Date(investment.start_date);
      const monthsDifference = (currentDate.getFullYear() - investmentDate.getFullYear()) * 12 + 
                              (currentDate.getMonth() - investmentDate.getMonth());
      
      if (monthsDifference < 6) {
        const unlockDate = new Date(investmentDate);
        unlockDate.setMonth(unlockDate.getMonth() + 6);
        throw new Error(`Investment locked until ${unlockDate.toLocaleDateString()}. Lock period: 6 months from investment date.`);
      }

      // Check if there's already a pending withdrawal for this investment
      const existingWithdrawal = await prisma.transactions.findFirst({
        where: {
          user_id: userId,
          description: { contains: investment_id },
          income_source: 'investment_withdrawal',
          status: 'PENDING'
        }
      });

      if (existingWithdrawal) {
        throw new Error('There is already a pending withdrawal request for this investment');
      }

      // Create withdrawal transaction
      const transaction = await prisma.transactions.create({
        data: {
          user_id: userId,
          amount: investment.amount,
          type: 'debit',
          income_source: 'investment_withdrawal',
          status: 'PENDING',
          description: `Investment withdrawal of $${investment.amount} from ${investment.package_name} (ID: ${investment_id}) to ${blockchain} address ${withdrawal_address.substring(0, 10)}...`,
        },
      });

      // Mark investment as withdrawn (pending)
      await prisma.investments.update({
        where: { id: investment_id },
        data: { status: 'withdrawing' },
      });

      return { transaction, investment };
    });

    res.status(201).json({
      success: true,
      message: 'Investment withdrawal request submitted successfully. Processing may take 3-5 business days.',
      transaction: {
        id: result.transaction.id,
        amount: Number(result.transaction.amount),
        status: result.transaction.status,
        timestamp: result.transaction.timestamp,
        investment: {
          id: result.investment.id,
          package_name: result.investment.package_name,
          start_date: result.investment.start_date,
        }
      },
    });
  } catch (error) {
    console.error('Investment withdrawal failed:', error);
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

/**
 * GET /api/withdrawal/history
 * Get withdrawal transaction history
 */
withdrawalRouter.get('/history', async (req, res) => {
  const userId = req.user.id;
  const { type, status, limit = '50', offset = '0' } = req.query;

  try {
    // Build where clause
    const whereClause = {
      user_id: userId,
      type: 'debit',
      income_source: { 
        in: ['withdrawal', 'income_withdrawal', 'investment_withdrawal'] 
      },
    };

    if (type && type !== 'ALL') {
      if (type === 'income') {
        whereClause.income_source = { in: ['withdrawal', 'income_withdrawal'] };
      } else if (type === 'investment') {
        whereClause.income_source = 'investment_withdrawal';
      }
    }

    if (status && status !== 'ALL') {
      whereClause.status = status;
    }

    // Fetch withdrawal transactions
    const withdrawals = await prisma.transactions.findMany({
      where: whereClause,
      select: {
        id: true,
        amount: true,
        income_source: true,
        status: true,
        description: true,
        timestamp: true,
      },
      orderBy: {
        timestamp: 'desc',
      },
      take: parseInt(limit),
      skip: parseInt(offset),
    });

    // Transform data
    const formattedWithdrawals = withdrawals.map((withdrawal) => {
      // Extract blockchain and address info from description
      let blockchain = 'N/A';
      let address = null;
      let investmentId = null;
      let packageName = null;
      
      if (withdrawal.description) {
        const blockchainMatch = withdrawal.description.match(/to (\w+) address/);
        if (blockchainMatch) {
          blockchain = blockchainMatch[1];
        }
        
        const addressMatch = withdrawal.description.match(/address ([a-zA-Z0-9]{10})\.\.\./);
        if (addressMatch) {
          address = addressMatch[1] + '...';
        }
        
        const investmentIdMatch = withdrawal.description.match(/ID: ([a-zA-Z0-9]+)\)/);
        if (investmentIdMatch) {
          investmentId = investmentIdMatch[1];
        }
        
        const packageMatch = withdrawal.description.match(/from (.+?) \(ID:/);
        if (packageMatch) {
          packageName = packageMatch[1];
        }
      }

      return {
        id: withdrawal.id,
        amount: parseFloat(withdrawal.amount.toString()),
        type: withdrawal.income_source === 'investment_withdrawal' ? 'investment' : 'income',
        status: withdrawal.status,
        blockchain,
        address,
        investmentId,
        packageName,
        description: withdrawal.description,
        timestamp: withdrawal.timestamp.toISOString(),
      };
    });

    // Get total count for pagination
    const totalCount = await prisma.transactions.count({
      where: whereClause,
    });

    res.json({
      success: true,
      withdrawals: formattedWithdrawals,
      pagination: {
        total: totalCount,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: parseInt(offset) + formattedWithdrawals.length < totalCount,
      },
    });
  } catch (error) {
    console.error('Error fetching withdrawal history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch withdrawal history',
    });
  }
});

/**
 * GET /api/withdrawal/investments
 * Get user's investments with withdrawal eligibility
 */
withdrawalRouter.get('/investments', async (req, res) => {
  const userId = req.user.id;

  try {
    const investments = await prisma.investments.findMany({
      where: {
        user_id: userId,
        status: { in: ['active', 'withdrawing'] }
      },
      select: {
        id: true,
        amount: true,
        package_name: true,
        start_date: true,
        unlock_date: true,
        status: true,
        monthly_profit_rate: true,
      },
      orderBy: {
        start_date: 'desc',
      },
    });

    const investmentsWithEligibility = investments.map((investment) => {
      const currentDate = new Date();
      const investmentDate = new Date(investment.start_date);
      const monthsDifference = (currentDate.getFullYear() - investmentDate.getFullYear()) * 12 + 
                              (currentDate.getMonth() - investmentDate.getMonth());
      
      const isEligible = monthsDifference >= 6 && investment.status === 'active';
      const daysUntilEligible = isEligible ? 0 : Math.max(0, 180 - Math.floor((currentDate - investmentDate) / (1000 * 60 * 60 * 24)));
      
      const eligibleDate = new Date(investmentDate);
      eligibleDate.setMonth(eligibleDate.getMonth() + 6);

      return {
        id: investment.id,
        amount: parseFloat(investment.amount.toString()),
        package_name: investment.package_name,
        start_date: investment.start_date.toISOString(),
        unlock_date: investment.unlock_date.toISOString(),
        status: investment.status,
        monthly_profit_rate: parseFloat(investment.monthly_profit_rate.toString()),
        withdrawal_eligible: isEligible,
        eligible_date: eligibleDate.toISOString(),
        days_until_eligible: daysUntilEligible,
        lock_period_months: 6,
      };
    });

    res.json({
      success: true,
      investments: investmentsWithEligibility,
    });
  } catch (error) {
    console.error('Error fetching investments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch investments',
    });
  }
});

/**
 * GET /api/withdrawal/stats
 * Get withdrawal statistics for the user
 */
withdrawalRouter.get('/stats', async (req, res) => {
  const userId = req.user.id;

  try {
    // Get wallet balance
    const wallet = await prisma.wallets.findUnique({
      where: { user_id: userId },
    });

    // Get total withdrawals
    const totalWithdrawals = await prisma.transactions.aggregate({
      _sum: { amount: true },
      _count: { id: true },
      where: {
        user_id: userId,
        type: 'debit',
        income_source: { in: ['withdrawal', 'income_withdrawal', 'investment_withdrawal'] },
        status: 'COMPLETED',
      },
    });

    // Get pending withdrawals
    const pendingWithdrawals = await prisma.transactions.aggregate({
      _sum: { amount: true },
      _count: { id: true },
      where: {
        user_id: userId,
        type: 'debit',
        income_source: { in: ['withdrawal', 'income_withdrawal', 'investment_withdrawal'] },
        status: 'PENDING',
      },
    });

    // Get eligible investments count
    const investments = await prisma.investments.findMany({
      where: {
        user_id: userId,
        status: 'active'
      },
      select: {
        start_date: true,
      },
    });

    const currentDate = new Date();
    const eligibleInvestments = investments.filter(investment => {
      const monthsDifference = (currentDate.getFullYear() - investment.start_date.getFullYear()) * 12 + 
                              (currentDate.getMonth() - investment.start_date.getMonth());
      return monthsDifference >= 6;
    });

    res.json({
      success: true,
      stats: {
        available_balance: wallet ? parseFloat(wallet.balance.toString()) : 0,
        total_withdrawn: totalWithdrawals._sum.amount ? parseFloat(totalWithdrawals._sum.amount.toString()) : 0,
        total_withdrawal_count: totalWithdrawals._count.id || 0,
        pending_amount: pendingWithdrawals._sum.amount ? parseFloat(pendingWithdrawals._sum.amount.toString()) : 0,
        pending_count: pendingWithdrawals._count.id || 0,
        eligible_investments_count: eligibleInvestments.length,
        total_investments_count: investments.length,
      },
    });
  } catch (error) {
    console.error('Error fetching withdrawal stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch withdrawal stats',
    });
  }
});

export default withdrawalRouter;