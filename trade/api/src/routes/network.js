import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import prisma from '../lib/prisma.js';

export const networkRouter = Router();
networkRouter.use(requireAuth);

/**
 * Traverses the user tree starting from a given user ID
 * and returns a flat list of all users in their downline.
 * @param {string} startUserId The ID of the user to start the search from.
 * @returns {Promise<Array<object>>} A list of user objects in the downline.
 */
/**
 * Gets the full downline (all descendants) of a user
 * @param {string} startUserId - The ID of the user to start from
 * @returns {Promise<Array>} - Array of user objects in the downline
 */
async function getFullDownline(startUserId) {
  const list = [];
  const queue = [startUserId];
  const visited = new Set([startUserId]);

  while (queue.length > 0) {
    const currentId = queue.shift();
    const children = await prisma.users.findMany({
      where: { sponsor_id: currentId },
      select: { 
        id: true, 
        full_name: true, 
        email: true,
        referral_code: true,
        created_at: true,
        sponsor_id: true,
        position: true
      },
      orderBy: { created_at: 'asc' } // Show oldest referrals first
    });

    for (const child of children) {
      if (!visited.has(child.id)) {
        list.push({
          ...child,
          level: await getLevel(startUserId, child.id)
        });
        queue.push(child.id);
        visited.add(child.id);
      }
    }
  }
  return list;
}

/**
 * Gets the level/depth of a user in another user's downline
 * @param {string} ancestorId - The ID of the ancestor user
 * @param {string} userId - The ID of the user to find level for
 * @param {number} currentLevel - Current level (used for recursion)
 * @returns {Promise<number>} - The level/depth (1 = direct referral, 2 = referral of referral, etc.)
 */
async function getLevel(ancestorId, userId, currentLevel = 1) {
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: { sponsor_id: true }
  });

  if (!user || !user.sponsor_id) return 0; // No sponsor found
  if (user.sponsor_id === ancestorId) return currentLevel; // Found the ancestor
  
  // Recursively check the next level up
  return getLevel(ancestorId, user.sponsor_id, currentLevel + 1);
}

networkRouter.get('/genealogy', async (req, res) => {
  const userId = req.user.id;
  try {
    const nodes = await getFullDownline(userId);
    return res.json({ root: userId, nodes });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to load genealogy' });
  }
});

/**
 * Get binary tree structure for the user's network
 */
networkRouter.get('/binary-tree', async (req, res) => {
  const userId = req.user.id;
  try {
    // Get direct referrals with position
    const directReferrals = await prisma.users.findMany({
      where: { sponsor_id: userId },
      select: {
        id: true,
        full_name: true,
        email: true,
        referral_code: true,
        created_at: true,
        position: true
      },
      orderBy: { position: 'asc' } // LEFT first, then RIGHT
    });

    // Build binary tree structure
    const tree = {
      user: await prisma.users.findUnique({
        where: { id: userId },
        select: {
          id: true,
          full_name: true,
          email: true,
          referral_code: true,
          created_at: true
        }
      }),
      left: [],
      right: []
    };

    // Group referrals by position
    for (const referral of directReferrals) {
      if (referral.position === 'LEFT') {
        tree.left.push(referral);
      } else if (referral.position === 'RIGHT') {
        tree.right.push(referral);
      }
    }

    return res.json({ tree });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to load binary tree' });
  }
});

/**
 * Get direct referrals (first level downline)
 */
networkRouter.get('/downline', async (req, res) => {
  const userId = req.user.id;
  const limit = Math.min(Number(req.query.limit ?? 20), 100);
  const offset = Number(req.query.offset ?? 0);
  
  console.log(`Fetching downline for user ${userId}`);
  
  try {
    // Get direct referrals (first level downline)
    const [directReferrals, total] = await Promise.all([
      prisma.users.findMany({
        where: { sponsor_id: userId },
        select: {
          id: true,
          full_name: true,
          email: true,
          referral_code: true,
          created_at: true,
          position: true,
          _count: {
            select: {
              other_users: true // Count of direct referrals
            }
          }
        },
        orderBy: { created_at: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.users.count({ where: { sponsor_id: userId } })
    ]);
    
    console.log(`Found ${total} direct referrals for user ${userId}`);

    return res.json({
      items: directReferrals,
      total,
      limit,
      offset
    });
  } catch (error) {
    console.error('Failed to load downline:', error);
    return res.status(500).json({ 
      error: 'Failed to load downline',
      details: error.message 
    });
  }
});
