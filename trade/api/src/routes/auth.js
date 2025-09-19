import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import passport from 'passport';
import { signJwt } from '../middleware/auth.js';
import prisma from '../lib/prisma.js';
import { generateUniqueReferralCode } from '../utils/referralCode.js';
export const authRouter = Router();

// Zod schemas don't need type annotations in JS
const registerSchema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  sponsor_referral_code: z.string().min(4),
  position: z.enum(['LEFT', 'RIGHT'])
});

authRouter.post('/register', async (req, res) => {
  const parse = registerSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const { full_name, email, password, sponsor_referral_code, position } = parse.data;

  try {
    const existing = await prisma.users.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email already registered' });
    
    const sponsor = await prisma.users.findUnique({ where: { referral_code: sponsor_referral_code } });
    if (!sponsor) return res.status(400).json({ error: 'Invalid sponsor referral code' });
    
    // Allow multiple users on the same side (LEFT or RIGHT)
    // No position limit validation needed
    
    console.log(`Registering new user ${email} under sponsor ${sponsor.email} (ID: ${sponsor.id})`);

    const passwordHash = await bcrypt.hash(password, 10);
    const referralCode = await generateUniqueReferralCode();
    
    const newUser = await prisma.users.create({
      data: {
        full_name, 
        email, 
        password_hash: passwordHash, 
        referral_code: referralCode,
        sponsor_id: sponsor.id,
        position: position,
        wallets: { create: { balance: 0 } },
      },
    });
    
    console.log(`Successfully created user ${newUser.email} with sponsor_id: ${newUser.sponsor_id}`);

    // UPDATED: Include the user's role in the JWT
    const token = signJwt({ id: newUser.id, role: newUser.role });
    return res.status(201).json({ token, referral_code: referralCode });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Registration failed' });
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

authRouter.post('/login', async (req, res) => {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const { email, password } = parse.data;

  try {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user || !user.password_hash) return res.status(401).json({ error: 'Invalid credentials' });
    
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    
    // UPDATED: Include the user's role in the JWT
    const token = signJwt({ id: user.id, role: user.role });
    return res.json({ token });
  } catch {
    return res.status(500).json({ error: 'Login failed' });
  }
});

authRouter.post('/guest', async (_req, res) => {
  try {
    const guest = await prisma.users.findUnique({ where: { email: 'guest@demo.local' } });
    if (!guest) return res.status(404).json({ error: 'Guest user not configured' });
    
    // UPDATED: Include the guest user's role in the JWT
    const token = signJwt({ id: guest.id, role: guest.role });
    return res.json({ token, guest: true });
  } catch {
    return res.status(500).json({ error: 'Guest login failed' });
  }
});

authRouter.get('/sponsor/:code', async (req, res) => {
  const code = req.params.code;
  if (!code) return res.status(400).json({ error: 'Missing code' });
  try {
    const sponsor = await prisma.users.findUnique({
      where: { referral_code: code },
      select: { full_name: true, referral_code: true }
    });
    if (!sponsor) return res.status(404).json({ error: 'Sponsor not found' });
    return res.json(sponsor);
  } catch {
    return res.status(500).json({ error: 'Lookup failed' });
  }
});

// Google OAuth Routes
console.log('Setting up Google OAuth routes...');
authRouter.get('/google', (req, res, next) => {
  console.log('Google OAuth route accessed');
  // Get referral code and position from query parameters
  const referralCode = req.query.ref || req.query.referral_code || '';
  const position = req.query.position || '';
  console.log('Referral code received:', referralCode);
  console.log('Position received:', position);
  
  // Pass both referral code and position as state parameter to OAuth
  const stateData = JSON.stringify({ referralCode, position });
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    state: stateData // Pass both referral code and position as state
  })(req, res, next);
});

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:8080/login',
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    // UPDATED: Include the user's role in the JWT
    const token = signJwt({ id: user.id, role: user.role });

    res.redirect(`http://localhost:8080/auth/callback?token=${token}`);
  }
);