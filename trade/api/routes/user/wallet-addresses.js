const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

/**
 * GET /api/user/wallet-addresses
 * Get user's crypto wallet addresses for deposits
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch user's wallet addresses from the database
    const walletAddresses = await prisma.wallet_addresses.findMany({
      where: {
        user_id: userId,
        is_active: true,
      },
      select: {
        blockchain: true,
        address: true,
      },
      orderBy: {
        blockchain: 'asc',
      },
    });

    res.json({
      success: true,
      walletAddresses,
    });
  } catch (error) {
    console.error('Error fetching wallet addresses:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch wallet addresses',
    });
  }
});

/**
 * POST /api/user/wallet-addresses
 * Add or update a wallet address for a specific blockchain
 * (Admin functionality - for setting up user deposit addresses)
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { blockchain, address } = req.body;

    if (!blockchain || !address) {
      return res.status(400).json({
        success: false,
        error: 'Blockchain and address are required',
      });
    }

    // Validate blockchain
    const validBlockchains = ['BTC', 'ETH', 'USDT', 'USDC', 'BNB', 'ADA', 'SOL', 'MATIC'];
    if (!validBlockchains.includes(blockchain.toUpperCase())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid blockchain specified',
      });
    }

    // Upsert wallet address
    const walletAddress = await prisma.wallet_addresses.upsert({
      where: {
        user_id_blockchain: {
          user_id: userId,
          blockchain: blockchain.toUpperCase(),
        },
      },
      update: {
        address,
        is_active: true,
      },
      create: {
        user_id: userId,
        blockchain: blockchain.toUpperCase(),
        address,
        is_active: true,
      },
    });

    res.json({
      success: true,
      message: 'Wallet address updated successfully',
      walletAddress: {
        blockchain: walletAddress.blockchain,
        address: walletAddress.address,
      },
    });
  } catch (error) {
    console.error('Error updating wallet address:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update wallet address',
    });
  }
});

module.exports = router;