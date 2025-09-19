import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { z } from 'zod';
import prisma from '../lib/prisma.js';
export const walletRouter = Router();
walletRouter.use(requireAuth);

const depositRequestSchema = z.object({
  amount: z.number()
    .min(100, 'Minimum deposit amount is $100')
    .refine((val) => val % 10 === 0, 'Amount must be in multiples of $10'),
  blockchain: z.string().min(1, 'Blockchain is required'),
  transaction_hash: z.string().optional()
});

walletRouter.post('/deposit-request', async (req, res) => {
  const userId = req.user.id;
  const parse = depositRequestSchema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }

  const { amount, blockchain, transaction_hash } = parse.data;

  try {
    // Create a PENDING transaction. This does NOT update the wallet balance yet.
    const depositRequest = await prisma.transactions.create({
      data: {
        user_id: userId,
        amount,
        type: 'credit',
        income_source: `${blockchain}_deposit`,
        status: 'PENDING',
        description: `User deposit request of $${amount} via ${blockchain}${transaction_hash ? ` (Tx: ${transaction_hash})` : ''}.`,
      },
    });
    res.status(201).json({ 
      message: 'Deposit request submitted successfully. It will be reviewed by an admin.', 
      request: depositRequest 
    });
  } catch (error) {
    console.error('Deposit request failed:', error);
    res.status(500).json({ error: 'Failed to submit deposit request.' });
  }
});

walletRouter.get('/balance', async (req, res) => {
  const userId = req.user.id;
  try {
    let wallet = await prisma.wallets.findUnique({ where: { user_id: userId } });
    
    // If wallet doesn't exist, create one with 0 balance
    if (!wallet) {
      wallet = await prisma.wallets.create({
        data: {
          user_id: userId,
          balance: 0,
        },
      });
    }
    
    return res.json({ balance: wallet.balance });
  } catch (error) {
    console.error('Error in /balance:', error);
    return res.status(500).json({ error: 'Failed to load balance', details: error.message });
  }
});

walletRouter.get('/transactions', async (req, res) => {
  const userId = req.user.id;
  const limit = Math.min(Number(req.query.limit ?? 20), 100);
  const offset = Number(req.query.offset ?? 0);
  
  try {
    // Only show completed transactions to users
    const items = await prisma.transactions.findMany({
      where: { 
        user_id: userId,
        OR: [
          { status: 'COMPLETED' },
          { status: 'REJECTED' }
        ]
      },
      orderBy: { timestamp: 'desc' },
      skip: offset,
      take: limit,
      include: {
        // Include user details if needed
        users: {
          select: {
            full_name: true,
            email: true
          }
        }
      }
    });
    
    const total = await prisma.transactions.count({ 
      where: { 
        user_id: userId,
        OR: [
          { status: 'COMPLETED' },
          { status: 'REJECTED' }
        ]
      } 
    });
    
    return res.json({ 
      items: items.map(tx => ({
        ...tx,
        amount: Number(tx.amount) // Convert Decimal to number for JSON
      })), 
      limit, 
      offset, 
      total 
    });
  } catch (error) {
    console.error('Failed to load transactions:', error);
    return res.status(500).json({ 
      error: 'Failed to load transactions',
      details: error.message 
    });
  }
});

const withdrawSchema = z.object({ 
  amount: z.number()
    .min(10, 'Minimum withdrawal amount is $10')
    .refine((val) => val % 10 === 0, 'Amount must be in multiples of $10')
});

walletRouter.post('/withdraw', async (req, res) => {
  const userId = req.user.id;
  const parse = withdrawSchema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }

  const { amount } = parse.data;

  try {
    // Start a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // 1. Get or create the user's wallet with a row lock
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

      // 2. Check if the user has enough balance
      if (wallet.balance < amount) {
        throw new Error('Insufficient balance');
      }

      // 3. Create the withdrawal transaction
      const transaction = await prisma.transactions.create({
        data: {
          user_id: userId,
          amount,
          type: 'debit',
          income_source: 'withdrawal',
          description: `Withdrawal request of $${amount}.`,
        },
      });

      // 4. Update the wallet balance
      await prisma.wallets.update({
        where: { user_id: userId },
        data: { balance: { decrement: amount } },
      });

      return transaction;
    });

    res.status(201).json({
      message: 'Withdrawal request submitted successfully.',
      transaction: result,
    });
  } catch (error) {
    console.error('Withdrawal failed:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get wallet addresses for deposits
walletRouter.get('/addresses', async (req, res) => {
  const userId = req.user.id;
  try {
    const addresses = await prisma.wallet_addresses.findMany({
      where: { 
        user_id: userId,
        is_active: true 
      },
      select: {
        blockchain: true,
        address: true,
        created_at: true
      },
      orderBy: { blockchain: 'asc' }
    });
    
    return res.json({ addresses });
  } catch (error) {
    console.error('Failed to load wallet addresses:', error);
    return res.status(500).json({ 
      error: 'Failed to load wallet addresses',
      details: error.message 
    });
  }
});

// Get available blockchains
walletRouter.get('/blockchains', async (req, res) => {
  try {
    const blockchains = [
      { 
        name: 'Bitcoin', 
        symbol: 'BTC', 
        icon: '₿',
        minDeposit: 100,
        minWithdraw: 10
      },
      { 
        name: 'Ethereum', 
        symbol: 'ETH', 
        icon: 'Ξ',
        minDeposit: 100,
        minWithdraw: 10
      },
      { 
        name: 'Tether USD', 
        symbol: 'USDT', 
        icon: '₮',
        minDeposit: 100,
        minWithdraw: 10
      },
      { 
        name: 'USD Coin', 
        symbol: 'USDC', 
        icon: '$',
        minDeposit: 100,
        minWithdraw: 10
      },
      { 
        name: 'Binance Coin', 
        symbol: 'BNB', 
        icon: 'B',
        minDeposit: 100,
        minWithdraw: 10
      }
    ];
    
    return res.json({ blockchains });
  } catch (error) {
    console.error('Failed to load blockchains:', error);
    return res.status(500).json({ 
      error: 'Failed to load blockchains',
      details: error.message 
    });
  }
});