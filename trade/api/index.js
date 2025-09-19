import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { json } from 'express';
import session from 'express-session';
import passport from 'passport';
import { authRouter } from './src/routes/auth.js';
import { userRouter } from './src/routes/user.js';
import { investmentRouter } from './src/routes/investment.js';
import { networkRouter } from './src/routes/network.js';
import { walletRouter } from './src/routes/wallet.js';
import { scheduleCommissionJobs } from './src/jobs/scheduler.js';
import { rewardsRouter } from './src/routes/rewards.js';
import { testingRouter } from './src/routes/testing.js';
import { adminRouter } from './src/routes/admin.js'; 

import './src/config/passport.js';

const app = express();

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
app.use(cors({
  origin: frontendUrl
}));

app.use(cors());
app.use(json());

app.use(
  session({
    secret: process.env.JWT_SECRET || 'a_default_secret_for_session',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/investment', investmentRouter);
app.use('/api/network', networkRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/rewards', rewardsRouter);
app.use('/api/testing', testingRouter);
app.use('/api/admin', adminRouter); 

const port = Number(process.env.PORT || 4000);

function start() {
  app.listen(port, () => {
    scheduleCommissionJobs();
    console.log(`Server listening on http://localhost:${port}`);
  });
}

start();