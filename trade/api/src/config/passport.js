import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { nanoid } from 'nanoid';
import prisma from '../lib/prisma.js';
import { generateUniqueReferralCode } from '../utils/referralCode.js';

// Debug: Check if Google OAuth environment variables are available
console.log('Google OAuth Environment Variables:');
console.log('GOOGLE_CLIENT_ID loaded:', !!process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET loaded:', !!process.env.GOOGLE_CLIENT_SECRET);

// Only configure Google OAuth if environment variables are present
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Configuring Google OAuth strategy...');
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.NODE_ENV === 'production' 
        ? `${process.env.RENDER_EXTERNAL_URL || process.env.FRONTEND_URL}/api/auth/google/callback`
        : 'http://localhost:4000/api/auth/google/callback',
      scope: ['profile', 'email'],
      passReqToCallback: true // Enable access to the request object
  },
async (req, accessToken, refreshToken, profile, done) => {
    try {
        console.log('OAuth callback - Profile:', profile.displayName);
        
        // Extract referral code and position from state parameter
        let referralCode = '';
        let position = '';
        
        try {
            const stateData = JSON.parse(req.query.state || '{}');
            referralCode = stateData.referralCode || '';
            position = stateData.position || '';
        } catch (error) {
            // Fallback for old format (just referral code)
            referralCode = req.query.state || '';
        }
        
        console.log('Referral code from state:', referralCode);
        console.log('Position from state:', position);
        
        // Find if the user already exists
        let user = await prisma.users.findUnique({
            where: { googleId: profile.id }
        });

        if (user) {
            return done(null, user); // User found, log them in
        }

        // If not, check if they exist by email
        user = await prisma.users.findUnique({ where: { email: profile.emails[0].value } });
        
        if (user) {
            // User exists but hasn't linked Google. Link it now.
            user = await prisma.users.update({
                where: { email: profile.emails[0].value },
                data: { googleId: profile.id }
            });
            return done(null, user);
        }

        // If user doesn't exist at all, create a new one
        const newReferralCode = await generateUniqueReferralCode();
        
        // Try to find sponsor if referral code was provided
        let sponsorId = null;
        let finalPosition = null;
        
        if (referralCode) {
            const sponsor = await prisma.users.findUnique({
                where: { referral_code: referralCode }
            });
            if (sponsor) {
                sponsorId = sponsor.id;
                console.log(`Found sponsor: ${sponsor.email} for new user ${profile.emails[0].value}`);
                
                // Allow multiple users on the same side (LEFT or RIGHT)
                // No position limit validation needed
                if (position && (position === 'LEFT' || position === 'RIGHT')) {
                    finalPosition = position;
                    console.log(`Assigning position ${position} to user under sponsor ${sponsor.email}`);
                } else {
                    console.log(`Warning: Invalid or missing position (${position}), proceeding without position`);
                }
            } else {
                console.log(`Warning: Referral code ${referralCode} not found, proceeding without sponsor`);
            }
        }
        
        const newUser = await prisma.users.create({
            data: {
                googleId: profile.id,
                full_name: profile.displayName,
                email: profile.emails[0].value,
                password_hash: null, // Google OAuth users don't have passwords
                referral_code: newReferralCode, // Generate a unique referral code
                sponsor_id: sponsorId, // Link to sponsor if referral code was valid
                position: finalPosition, // Set position if valid
                role: 'USER', // Set default role
                wallets: {
                    create: { balance: 0 }
                }
            }
        });
        
        if (sponsorId) {
            console.log(`Successfully created user ${newUser.email} under sponsor ${sponsorId} with position ${finalPosition || 'none'}`);
        }
        
        return done(null, newUser);

    } catch (error) {
        console.error('Google OAuth error:', error);
        return done(error, false);
    }
  }));
} else {
  console.warn('Google OAuth not configured: Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variables');
}

// Type annotations `: any` and `: string` are removed from the function parameters
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await prisma.users.findUnique({ where: { id } });
    done(null, user);
});
