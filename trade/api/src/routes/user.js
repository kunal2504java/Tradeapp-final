import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma.js';

export const userRouter = Router();
userRouter.use(requireAuth);

/**
 * Recursively fetches all user IDs in a downline starting from a given set of users.
 * @param {string[]} startUserIds - An array of user IDs to start the traversal from.
 * @returns {Promise<string[]>} A flat array of all unique user IDs in the downline.
 */
async function getDownlineIds(startUserIds) {
    if (startUserIds.length === 0) return [];
    const allDescendants = new Set();
    let queue = [...startUserIds];
    const visited = new Set();

    while (queue.length > 0) {
        const currentId = queue.shift();
        if (visited.has(currentId)) continue;
        visited.add(currentId);
        allDescendants.add(currentId);
        
        const children = await prisma.users.findMany({
            where: { sponsor_id: currentId },
            select: { id: true },
        });
        queue.push(...children.map(c => c.id));
    }
    return Array.from(allDescendants);
}

userRouter.get('/dashboard', async (req, res) => {
    const userId = req.user.id;
    try {
        // Get user profile info
        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: { full_name: true, email: true, referral_code: true, created_at: true }
        });

        // Get investment data
        const investmentAgg = await prisma.investments.aggregate({
            _sum: { amount: true }, where: { user_id: userId },
        });

        // Get wallet data
        const wallet = await prisma.wallets.findUnique({ where: { user_id: userId } });

        // Get recent transactions
        const recentTransactions = await prisma.transactions.findMany({
            where: { user_id: userId }, 
            orderBy: { timestamp: 'desc' }, 
            take: 10,
        });

        // Calculate income breakdown
        const incomeBreakdown = await prisma.transactions.groupBy({
            by: ['income_source'],
            _sum: { amount: true },
            where: { user_id: userId, type: 'credit' },
        });

        // Daily income (today's credits)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const dailyIncomeAgg = await prisma.transactions.aggregate({
            _sum: { amount: true },
            where: {
                user_id: userId,
                type: 'credit',
                timestamp: { gte: today, lt: tomorrow }
            }
        });

        // Total income (all credits)
        const totalIncomeAgg = await prisma.transactions.aggregate({
            _sum: { amount: true },
            where: { user_id: userId, type: 'credit' }
        });

        // Total withdrawals (all debits)
        const totalWithdrawalAgg = await prisma.transactions.aggregate({
            _sum: { amount: true },
            where: { user_id: userId, type: 'debit' }
        });

        // Get team data
        const directChildren = await prisma.users.findMany({ 
            where: { sponsor_id: userId }, 
            select: { id: true } 
        });
        
        const downlineIds = await getDownlineIds(directChildren.map(c => c.id));
        
        // Calculate business volumes
        const leftLegUsers = await prisma.users.findMany({
            where: { sponsor_id: userId, position: 'LEFT' },
            select: { id: true }
        });
        
        const rightLegUsers = await prisma.users.findMany({
            where: { sponsor_id: userId, position: 'RIGHT' },
            select: { id: true }
        });
        
        const leftLegIds = await getDownlineIds(leftLegUsers.map(u => u.id));
        const rightLegIds = await getDownlineIds(rightLegUsers.map(u => u.id));
        
        const leftLegBusinessAgg = await prisma.investments.aggregate({
            _sum: { amount: true },
            where: { user_id: { in: leftLegIds } }
        });
        
        const rightLegBusinessAgg = await prisma.investments.aggregate({
            _sum: { amount: true },
            where: { user_id: { in: rightLegIds } }
        });
        
        const totalBusinessAgg = await prisma.investments.aggregate({
            _sum: { amount: true },
            where: { user_id: { in: downlineIds } }
        });

        return res.json({
            // User info
            user_name: user?.full_name ?? 'N/A',
            user_email: user?.email ?? 'N/A',
            referral_code: user?.referral_code ?? 'N/A',
            join_date: user?.created_at ?? null,
            
            // Financial data
            total_investment: investmentAgg._sum.amount ?? 0,
            wallet_balance: wallet?.balance ?? 0,
            daily_income: dailyIncomeAgg._sum.amount ?? 0,
            total_income: totalIncomeAgg._sum.amount ?? 0,
            total_withdrawal: totalWithdrawalAgg._sum.amount ?? 0,
            
            // Business data
            left_leg_business: leftLegBusinessAgg._sum.amount ?? 0,
            right_leg_business: rightLegBusinessAgg._sum.amount ?? 0,
            total_business: totalBusinessAgg._sum.amount ?? 0,
            direct_team: directChildren.length,
            total_team: downlineIds.length - 1, // Subtract 1 to not include user themselves
            
            // Income breakdown
            income_breakdown: incomeBreakdown.map(item => ({
                source: item.income_source,
                amount: item._sum.amount ?? 0
            })),
            
            // Recent transactions
            recent_transactions: recentTransactions,
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to load dashboard' });
    }
});

userRouter.get('/profile', async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: { full_name: true, email: true, referral_code: true, sponsor_id: true, created_at: true },
        });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        console.log('Profile data:', user); // Debug log
        return res.json(user);
    } catch (error) {
        console.error('Profile error:', error);
        return res.status(500).json({ error: 'Failed to load profile' });
    }
});

userRouter.get('/profit-history', async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await prisma.$queryRaw`
            SELECT to_char(timestamp, 'YYYY-MM') as month, SUM(amount::float) as profit
            FROM "transactions"
            WHERE user_id = ${userId} AND type = 'credit'
            GROUP BY month
            ORDER BY month ASC;
        `;
        // Convert BigInt profit values to numbers for JSON compatibility
        const formattedResult = result.map(r => ({ ...r, profit: Number(r.profit) }));
        return res.json(formattedResult);
    } catch(e) {
        console.error(e);
        return res.status(500).json({ error: 'Failed to load history' });
    }
});

userRouter.get('/income-breakdown', async (req, res) => {
    const userId = req.user.id;
    try {
        const agg = await prisma.transactions.groupBy({
            by: ['income_source'],
            _sum: { amount: true },
            where: { user_id: userId, type: 'credit', status: { not: 'PENDING' } },
        });
        
        const result = agg.map(a => ({
            source: a.income_source,
            amount: a._sum.amount ?? 0,
        }));
        return res.json(result);
    } catch(e) {
        return res.status(500).json({ error: 'Failed to load income breakdown' });
    }
});

userRouter.get('/salary-status', async (req, res) => {
    const userId = req.user.id;
    try {
        // Get all direct downline users
        const directChildren = await prisma.users.findMany({ 
            where: { sponsor_id: userId }, 
            select: { id: true } 
        });

        // Get all downline IDs (direct and indirect)
        const downlineIds = await getDownlineIds(directChildren.map(c => c.id));
        
        // Calculate total downline volume
        const volumeAgg = await prisma.investments.aggregate({ 
            _sum: { amount: true }, 
            where: { user_id: { in: downlineIds } } 
        });

        const totalVolume = volumeAgg._sum.amount ?? 0;
        
        // Updated ranks based on total volume thresholds
        const ranks = [
            { name: 'Rank 1', threshold: 5000, salary: 100 },
            { name: 'Rank 2', threshold: 15000, salary: 250 },
            { name: 'Rank 3', threshold: 50000, salary: 500 },
            { name: 'Rank 4', threshold: 80000, salary: 750 },
            { name: 'Rank 5', threshold: 100000, salary: 1000 },
        ];
        
        const progress = ranks.map(r => ({
            rankName: r.name,
            threshold: r.threshold,
            salary: r.salary,
            isAchieved: totalVolume >= r.threshold,
            progress: Math.min(1, totalVolume / r.threshold),
            volumeNeeded: Math.max(0, r.threshold - totalVolume)
        }));
        
        const current = progress.slice().reverse().find(p => p.isAchieved) ?? null;
        
        return res.json({ 
            totalVolume, 
            directReferrals: directChildren.length,
            totalDownline: downlineIds.length,
            ranks: progress, 
            currentRank: current?.rankName ?? null 
        });
    } catch(e) {
        console.error('Salary status error:', e);
        return res.status(500).json({ error: 'Failed to load salary status' });
    }
});

// Wallet addresses endpoints
userRouter.get('/wallet-addresses', async (req, res) => {
    const userId = req.user.id;
    try {
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

// Deposit history endpoints
userRouter.get('/deposit-history', async (req, res) => {
    const userId = req.user.id;
    const { status, limit = '50', offset = '0' } = req.query;
    
    try {
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

        // Transform the data to include blockchain information
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

// Password management endpoints
const changePasswordSchema = z.object({
    currentPassword: z.string().optional(), // Optional for first-time setup
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

userRouter.post('/change-password', async (req, res) => {
    const userId = req.user.id;
    console.log('Password change request body:', req.body);
    const parse = changePasswordSchema.safeParse(req.body);
    
    if (!parse.success) {
        console.log('Validation error:', parse.error.flatten());
        return res.status(400).json({ error: parse.error.flatten() });
    }
    
    const { currentPassword, newPassword } = parse.data;
    
    try {
        // Get user's current password info
        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: { 
                id: true, 
                password_hash: true, 
                password_updated_at: true,
                email: true,
                full_name: true
            }
        });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Check if user already has a password and validate current password
        if (user.password_hash) {
            if (!currentPassword) {
                return res.status(400).json({ error: 'Current password is required' });
            }
            
            const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
            if (!isCurrentPasswordValid) {
                return res.status(400).json({ error: 'Current password is incorrect' });
            }
            
            // Check 7-day restriction
            if (user.password_updated_at) {
                const daysSinceLastUpdate = (new Date() - user.password_updated_at) / (1000 * 60 * 60 * 24);
                if (daysSinceLastUpdate < 7) {
                    const daysRemaining = Math.ceil(7 - daysSinceLastUpdate);
                    return res.status(400).json({ 
                        error: `Password can only be changed once every 7 days. Please wait ${daysRemaining} more day(s).` 
                    });
                }
            }
        }
        
        // Hash the new password
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        
        // Update user's password and timestamp
        await prisma.users.update({
            where: { id: userId },
            data: {
                password_hash: newPasswordHash,
                password_updated_at: new Date()
            }
        });
        
        return res.json({ 
            success: true, 
            message: user.password_hash 
                ? 'Password updated successfully' 
                : 'Password created successfully. You can now login with email and password.' 
        });
        
    } catch (error) {
        console.error('Password change error:', error);
        return res.status(500).json({ error: 'Failed to change password' });
    }
});

// Get password status (whether user has password set)
userRouter.get('/password-status', async (req, res) => {
    const userId = req.user.id;
    
    try {
        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: { 
                password_hash: true, 
                password_updated_at: true 
            }
        });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const hasPassword = !!user.password_hash;
        let canChangePassword = true;
        let daysUntilCanChange = 0;
        
        if (hasPassword && user.password_updated_at) {
            const daysSinceLastUpdate = (new Date() - user.password_updated_at) / (1000 * 60 * 60 * 24);
            canChangePassword = daysSinceLastUpdate >= 7;
            if (!canChangePassword) {
                daysUntilCanChange = Math.ceil(7 - daysSinceLastUpdate);
            }
        }
        
        return res.json({
            hasPassword,
            canChangePassword,
            daysUntilCanChange,
            lastUpdated: user.password_updated_at
        });
        
    } catch (error) {
        console.error('Password status error:', error);
        return res.status(500).json({ error: 'Failed to get password status' });
    }
});

// Withdrawal address management endpoints
const withdrawalAddressSchema = z.object({
    blockchain: z.string().min(3).max(20),
    address: z.string().min(10).max(200),
    label: z.string().min(1).max(100).optional()
});

// Get all withdrawal addresses for user
userRouter.get('/withdrawal-addresses', async (req, res) => {
    const userId = req.user.id;
    
    try {
        const addresses = await prisma.wallet_addresses.findMany({
            where: { user_id: userId, is_active: true },
            select: {
                id: true,
                blockchain: true,
                address: true,
                label: true,
                is_selected: true,
                created_at: true
            },
            orderBy: [{ blockchain: 'asc' }, { created_at: 'desc' }]
        });
        
        // Group addresses by blockchain
        const groupedAddresses = addresses.reduce((acc, addr) => {
            const blockchain = addr.blockchain;
            if (!acc[blockchain]) {
                acc[blockchain] = [];
            }
            acc[blockchain].push({
                id: addr.id,
                address: addr.address,
                label: addr.label || 'Unnamed Address',
                isSelected: addr.is_selected,
                createdAt: addr.created_at.toISOString()
            });
            return acc;
        }, {});
        
        return res.json({
            success: true,
            addresses: groupedAddresses
        });
        
    } catch (error) {
        console.error('Error fetching withdrawal addresses:', error);
        return res.status(500).json({ error: 'Failed to fetch withdrawal addresses' });
    }
});

// Add new withdrawal address
userRouter.post('/withdrawal-addresses', async (req, res) => {
    const userId = req.user.id;
    const parse = withdrawalAddressSchema.safeParse(req.body);
    
    if (!parse.success) {
        return res.status(400).json({ error: parse.error.flatten() });
    }
    
    const { blockchain, address, label } = parse.data;
    
    try {
        // Check if address already exists
        const existingAddress = await prisma.wallet_addresses.findUnique({
            where: {
                user_id_blockchain_address: {
                    user_id: userId,
                    blockchain: blockchain.toUpperCase(),
                    address: address
                }
            }
        });
        
        if (existingAddress) {
            return res.status(400).json({ error: 'This address already exists for this blockchain' });
        }
        
        // Check if user has any addresses for this blockchain
        const existingBlockchainAddresses = await prisma.wallet_addresses.findMany({
            where: {
                user_id: userId,
                blockchain: blockchain.toUpperCase(),
                is_active: true
            }
        });
        
        // If this is the first address for this blockchain, make it selected
        const isSelected = existingBlockchainAddresses.length === 0;
        
        const newAddress = await prisma.wallet_addresses.create({
            data: {
                user_id: userId,
                blockchain: blockchain.toUpperCase(),
                address: address,
                label: label || null,
                is_selected: isSelected
            }
        });
        
        return res.json({
            success: true,
            message: 'Withdrawal address added successfully',
            address: {
                id: newAddress.id,
                blockchain: newAddress.blockchain,
                address: newAddress.address,
                label: newAddress.label,
                isSelected: newAddress.is_selected
            }
        });
        
    } catch (error) {
        console.error('Error adding withdrawal address:', error);
        return res.status(500).json({ error: 'Failed to add withdrawal address' });
    }
});

// Select withdrawal address (make it active for the blockchain)
userRouter.put('/withdrawal-addresses/:id/select', async (req, res) => {
    const userId = req.user.id;
    const addressId = req.params.id;
    
    try {
        // Get the address to select
        const address = await prisma.wallet_addresses.findFirst({
            where: {
                id: addressId,
                user_id: userId,
                is_active: true
            }
        });
        
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }
        
        // Start a transaction to update all addresses for this blockchain
        await prisma.$transaction(async (tx) => {
            // Deselect all addresses for this blockchain
            await tx.wallet_addresses.updateMany({
                where: {
                    user_id: userId,
                    blockchain: address.blockchain,
                    is_active: true
                },
                data: { is_selected: false }
            });
            
            // Select the chosen address
            await tx.wallet_addresses.update({
                where: { id: addressId },
                data: { is_selected: true }
            });
        });
        
        return res.json({
            success: true,
            message: 'Withdrawal address selected successfully'
        });
        
    } catch (error) {
        console.error('Error selecting withdrawal address:', error);
        return res.status(500).json({ error: 'Failed to select withdrawal address' });
    }
});

// Delete withdrawal address
userRouter.delete('/withdrawal-addresses/:id', async (req, res) => {
    const userId = req.user.id;
    const addressId = req.params.id;
    
    try {
        // Get the address to delete
        const address = await prisma.wallet_addresses.findFirst({
            where: {
                id: addressId,
                user_id: userId,
                is_active: true
            }
        });
        
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }
        
        // Soft delete the address
        await prisma.wallet_addresses.update({
            where: { id: addressId },
            data: { is_active: false, is_selected: false }
        });
        
        // If this was the selected address, select another one if available
        if (address.is_selected) {
            const otherAddress = await prisma.wallet_addresses.findFirst({
                where: {
                    user_id: userId,
                    blockchain: address.blockchain,
                    is_active: true,
                    id: { not: addressId }
                },
                orderBy: { created_at: 'desc' }
            });
            
            if (otherAddress) {
                await prisma.wallet_addresses.update({
                    where: { id: otherAddress.id },
                    data: { is_selected: true }
                });
            }
        }
        
        return res.json({
            success: true,
            message: 'Withdrawal address deleted successfully'
        });
        
    } catch (error) {
        console.error('Error deleting withdrawal address:', error);
        return res.status(500).json({ error: 'Failed to delete withdrawal address' });
    }
});

// Get user wallet balance information
userRouter.get('/wallet-balance', async (req, res) => {
    const userId = req.user.id;
    
    try {
        // Get wallet balance
        const wallet = await prisma.wallets.findUnique({
            where: { user_id: userId }
        });
        
        // Get pending withdrawals (locked balance)
        const pendingWithdrawals = await prisma.transactions.aggregate({
            _sum: { amount: true },
            where: {
                user_id: userId,
                type: 'debit',
                status: 'PENDING',
                income_source: 'WITHDRAWAL'
            }
        });
        
        const totalBalance = parseFloat(wallet?.balance.toString() || '0');
        const lockedBalance = parseFloat(pendingWithdrawals._sum.amount?.toString() || '0');
        const withdrawableBalance = Math.max(0, totalBalance - lockedBalance);
        
        const withdrawalFee = 1.00; // $1 per transaction
        const minWithdrawal = 10.00; // Minimum withdrawal amount
        
        return res.json({
            success: true,
            balance: {
                total: totalBalance,
                withdrawable: withdrawableBalance,
                locked: lockedBalance,
                withdrawalFee: withdrawalFee,
                minWithdrawal: minWithdrawal,
                netWithdrawable: Math.max(0, withdrawableBalance - withdrawalFee)
            }
        });
        
    } catch (error) {
        console.error('Error fetching wallet balance:', error);
        return res.status(500).json({ error: 'Failed to fetch wallet balance' });
    }
});
