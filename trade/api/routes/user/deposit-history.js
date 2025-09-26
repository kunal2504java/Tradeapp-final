const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

/**
 * GET /api/user/deposit-history
 * Get user's deposit transaction history
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { status, limit = '50', offset = '0' } = req.query;

    // Build where clause
    const whereClause = {
      user_id: userId,
      type: 'DEPOSIT',
    };

    if (status && status !== 'ALL') {
      whereClause.status = status;
    }

    // Fetch deposit transactions from the database
    const deposits = await prisma.transactions.findMany({
      where: whereClause,
      select: {
        id: true,
        amount: true,
        status: true,
        description: true,
        timestamp: true,
        income_source: true,
      },
      orderBy: {
        timestamp: 'desc',
      },
      take: parseInt(limit),
      skip: parseInt(offset),
    });

    // Transform the data to include blockchain information from description or income_source
    const formattedDeposits = deposits.map((deposit) => {
      // Extract blockchain info from description or default to BTC
      let blockchain = 'BTC';
      let txHash = null;
      
      if (deposit.description) {
        // Try to extract blockchain from description
        const blockchainMatch = deposit.description.match(/\b(BTC|ETH|USDT|USDC|BNB|ADA|SOL|MATIC)\b/i);
        if (blockchainMatch) {
          blockchain = blockchainMatch[1].toUpperCase();
        }
        
        // Try to extract transaction hash from description
        const txHashMatch = deposit.description.match(/(?:tx|hash|txid):\s*([a-fA-F0-9]{40,})/i);
        if (txHashMatch) {
          txHash = txHashMatch[1];
        }
      }
      
      // Use income_source as blockchain if it matches valid blockchains
      const validBlockchains = ['BTC', 'ETH', 'USDT', 'USDC', 'BNB', 'ADA', 'SOL', 'MATIC'];
      if (validBlockchains.includes(deposit.income_source)) {
        blockchain = deposit.income_source;
      }

      return {
        id: deposit.id,
        amount: parseFloat(deposit.amount.toString()),
        blockchain,
        status: deposit.status,
        description: deposit.description,
        timestamp: deposit.timestamp.toISOString(),
        txHash,
      };
    });

    // Get total count for pagination
    const totalCount = await prisma.transactions.count({
      where: whereClause,
    });

    res.json({
      success: true,
      deposits: formattedDeposits,
      pagination: {
        total: totalCount,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: parseInt(offset) + formattedDeposits.length < totalCount,
      },
    });
  } catch (error) {
    console.error('Error fetching deposit history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch deposit history',
    });
  }
});

/**
 * POST /api/user/deposit-history
 * Create a new deposit transaction record
 * (This would typically be called by a webhook from payment processor)
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { amount, blockchain, txHash, description } = req.body;

    if (!amount || !blockchain) {
      return res.status(400).json({
        success: false,
        error: 'Amount and blockchain are required',
      });
    }

    // Validate amount
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid deposit amount',
      });
    }

    // Create deposit transaction record
    const deposit = await prisma.transactions.create({
      data: {
        user_id: userId,
        amount: depositAmount,
        type: 'DEPOSIT',
        income_source: blockchain.toUpperCase(),
        status: 'PENDING',
        description: description || `${blockchain.toUpperCase()} deposit${txHash ? ` - TX: ${txHash}` : ''}`,
      },
    });

    res.json({
      success: true,
      message: 'Deposit transaction recorded successfully',
      deposit: {
        id: deposit.id,
        amount: parseFloat(deposit.amount.toString()),
        blockchain: blockchain.toUpperCase(),
        status: deposit.status,
        description: deposit.description,
        timestamp: deposit.timestamp.toISOString(),
        txHash,
      },
    });
  } catch (error) {
    console.error('Error creating deposit transaction:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create deposit transaction',
    });
  }
});

/**
 * PATCH /api/user/deposit-history/:transactionId
 * Update deposit transaction status (admin functionality)
 */
router.patch('/:transactionId', authenticateToken, async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Status is required',
      });
    }

    // Validate status
    const validStatuses = ['PENDING', 'COMPLETED', 'FAILED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status',
      });
    }

    // Update transaction status
    const updatedTransaction = await prisma.transactions.update({
      where: {
        id: transactionId,
        type: 'DEPOSIT',
      },
      data: {
        status,
      },
    });

    // If status is COMPLETED, update user's wallet balance
    if (status === 'COMPLETED') {
      await prisma.wallets.upsert({
        where: {
          user_id: updatedTransaction.user_id,
        },
        update: {
          balance: {
            increment: updatedTransaction.amount,
          },
        },
        create: {
          user_id: updatedTransaction.user_id,
          balance: updatedTransaction.amount,
        },
      });
    }

    res.json({
      success: true,
      message: 'Deposit status updated successfully',
      transaction: {
        id: updatedTransaction.id,
        status: updatedTransaction.status,
        amount: parseFloat(updatedTransaction.amount.toString()),
      },
    });
  } catch (error) {
    console.error('Error updating deposit status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update deposit status',
    });
  }
});

module.exports = router;