import { Router } from 'express';
import {
  runMonthlyTradingBonus,
  runMonthlyReferralIncome,
  runMonthlySalary
} from '../jobs/workers.js';

export const testingRouter = Router();

// This endpoint will run the trading bonus calculation for all users.
testingRouter.post('/run-trading-bonus', async (_req, res) => {
  try {
    await runMonthlyTradingBonus();
    res.status(200).json({ message: 'Monthly trading bonus job executed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to run trading bonus job.' });
  }
});

// This endpoint will run the referral income calculation.
testingRouter.post('/run-referral-income', async (_req, res) => {
  try {
    await runMonthlyReferralIncome();
    res.status(200).json({ message: 'Monthly referral income job executed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to run referral income job.' });
  }
});

// This endpoint will run the salary calculation.
testingRouter.post('/run-salary', async (_req, res) => {
  try {
    await runMonthlySalary();
    res.status(200).json({ message: 'Monthly salary job executed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to run salary job.' });
  }
});
