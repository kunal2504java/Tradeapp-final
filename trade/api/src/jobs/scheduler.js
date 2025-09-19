import cron from 'node-cron';
import { runMonthlyTradingBonus, runMonthlyReferralIncome, runMonthlySalary } from './workers.js';

export function scheduleCommissionJobs() {
  // At 02:00 on the 1st of every month
  cron.schedule('0 2 1 * *', async () => {
    console.log('Running monthly commission jobs...');
    await runMonthlyTradingBonus();
    await runMonthlyReferralIncome();
    await runMonthlySalary();
    console.log('Monthly commission jobs completed.');
  });
}
