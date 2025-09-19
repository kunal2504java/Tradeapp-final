import prisma from '../lib/prisma.js';

/**
 * Generates a unique 8-character alphanumeric referral code
 * @returns {Promise<string>} Unique referral code
 */
export async function generateUniqueReferralCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let referralCode;
  let isUnique = false;

  while (!isUnique) {
    // Generate 8-character code
    referralCode = '';
    for (let i = 0; i < 8; i++) {
      referralCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Check if code already exists
    const existingUser = await prisma.users.findUnique({
      where: { referral_code: referralCode }
    });

    if (!existingUser) {
      isUnique = true;
    }
  }

  return referralCode;
}
