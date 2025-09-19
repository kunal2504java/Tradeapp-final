import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
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
        const investmentAgg = await prisma.investments.aggregate({
            _sum: { amount: true }, where: { user_id: userId },
        });
        const wallet = await prisma.wallets.findUnique({ where: { user_id: userId } });
        const recentTransactions = await prisma.transactions.findMany({
            where: { 
                user_id: userId,
                // Removed status filter as it's not in the schema
            }, 
            orderBy: { timestamp: 'desc' }, 
            take: 10,
        });

        const downline = await getDownlineIds([userId]);

        return res.json({
            total_investment: investmentAgg._sum.amount ?? 0,
            wallet_balance: wallet?.balance ?? 0,
            recent_transactions: recentTransactions,
            // Subtract 1 to not include the user themselves in the count
            network_size: downline.length - 1,
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
