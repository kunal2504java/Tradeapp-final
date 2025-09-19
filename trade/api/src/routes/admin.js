import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import prisma from '../lib/prisma.js';
export const adminRouter = Router();

// Protect all routes in this file so only logged-in admins can access them
adminRouter.use(requireAuth, requireAdmin);

/**
 * Route to get all transactions with a 'PENDING' status.
 * This is for the admin's "Manage Deposits" page.
 */
adminRouter.get('/deposits/pending', async (req, res) => {
  try {
    const pendingRequests = await prisma.transactions.findMany({
      where: { 
        status: 'PENDING',
        type: 'credit',
        OR: [
          { income_source: 'manual_deposit' },
          { income_source: { contains: '_deposit' } } // BTC_deposit, ETH_deposit, etc.
        ]
      },
      include: {
        users: {
          select: {
            full_name: true,
            email: true,
          },
        },
      },
      orderBy: {
        timestamp: 'asc',
      },
    });
    res.json(pendingRequests);
  } catch (error) {
    console.error('Failed to fetch pending deposits:', error);
    res.status(500).json({ error: 'Failed to fetch pending requests.', details: error.message });
  }
});

/**
 * Route to approve a pending deposit.
 * It updates the transaction status and increments the user's wallet balance.
 */
adminRouter.post('/deposits/approve/:transactionId', async (req, res) => {
  const { transactionId } = req.params;
  try {
    // Start a transaction to ensure data consistency
    const result = await prisma.$transaction(async (prisma) => {
      // 1. Get and lock the transaction
      const transaction = await prisma.transactions.findUnique({
        where: { id: transactionId },
        select: { 
          id: true,
          user_id: true,
          amount: true,
          status: true 
        }
      });

      if (!transaction || transaction.status !== 'PENDING') {
        throw new Error('Pending transaction not found');
      }

      // 2. Update transaction status to COMPLETED
      await prisma.transactions.update({
        where: { id: transactionId },
        data: { status: 'COMPLETED' },
      });

      // 3. Get or create user's wallet
      let wallet = await prisma.wallets.findUnique({
        where: { user_id: transaction.user_id },
      });

      if (!wallet) {
        wallet = await prisma.wallets.create({
          data: {
            user_id: transaction.user_id,
            balance: 0,
          },
        });
      }

      // 4. Update wallet balance
      await prisma.wallets.update({
        where: { user_id: transaction.user_id },
        data: { 
          balance: { 
            increment: Number(transaction.amount) 
          } 
        },
      });

      return { success: true };
    });

    res.json({ message: 'Deposit approved successfully' });
  } catch (error) {
    console.error('Failed to approve deposit:', error);
    res.status(500).json({ 
      error: 'Failed to approve deposit.',
      details: error.message 
    });
  }
});

/**
 * Route to decline a pending deposit.
 * It updates the transaction status to 'FAILED'.
 */
adminRouter.post('/deposits/reject/:transactionId', async (req, res) => {
  const { transactionId } = req.params;
  const { reason } = req.body;

  try {
    const transaction = await prisma.transactions.findUnique({ 
      where: { id: transactionId } 
    });

    if (!transaction || transaction.status !== 'PENDING') {
      return res.status(404).json({ error: 'Pending transaction not found.' });
    }

    await prisma.transactions.update({
      where: { id: transactionId },
      data: { 
        status: 'REJECTED',
        description: `${transaction.description} (Rejected: ${reason || 'No reason provided'})`
      },
    });

    res.json({ message: 'Deposit rejected successfully' });
  } catch (error) {
    console.error('Failed to reject deposit:', error);
    res.status(500).json({ 
      error: 'Failed to reject deposit.',
      details: error.message 
    });
  }  
});
