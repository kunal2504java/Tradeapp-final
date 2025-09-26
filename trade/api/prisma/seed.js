import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create main test user (Kunal)
  const mainEmail = 'kunalpsingh25@gmail.com';
  const mainPassword = 'password123';
  const hashedMainPassword = await bcrypt.hash(mainPassword, 10);
  
  // Create or update main user
  const mainUser = await prisma.users.upsert({
    where: { email: mainEmail },
    update: {},
    create: {
      full_name: 'Kunal Pratap Singh',
      email: mainEmail,
      password_hash: hashedMainPassword,
      referral_code: 'PJMEDUP5',
      role: 'USER',
      created_at: new Date('2025-09-19')
    },
  });

  // Create or update wallet for main user
  await prisma.wallets.upsert({
    where: { user_id: mainUser.id },
    update: {},
    create: {
      user_id: mainUser.id,
      balance: 15750,
    },
  });

  // Create some investments for main user
  const investment1 = await prisma.investments.upsert({
    where: { id: 'inv1' },
    update: {},
    create: {
      id: 'inv1',
      user_id: mainUser.id,
      amount: 3000,
      package_name: 'Premium Package',
      monthly_profit_rate: 15,
      status: 'active',
      start_date: new Date('2025-09-20'),
      unlock_date: new Date('2026-03-20')
    },
  });

  const investment2 = await prisma.investments.upsert({
    where: { id: 'inv2' },
    update: {},
    create: {
      id: 'inv2',
      user_id: mainUser.id,
      amount: 2000,
      package_name: 'Standard Package',
      monthly_profit_rate: 12,
      status: 'active',
      start_date: new Date('2025-09-22'),
      unlock_date: new Date('2026-03-22')
    },
  });

  // Create wallet addresses for main user
  const walletAddresses = [
    {
      user_id: mainUser.id,
      blockchain: 'BTC',
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      is_active: true
    },
    {
      user_id: mainUser.id,
      blockchain: 'ETH',
      address: '0x742d35Cc6335C4532d5C13A1a5d2C3C3b4a2e123',
      is_active: true
    },
    {
      user_id: mainUser.id,
      blockchain: 'USDT',
      address: '0x742d35Cc6335C4532d5C13A1a5d2C3C3b4a2e456',
      is_active: true
    },
    {
      user_id: mainUser.id,
      blockchain: 'USDC',
      address: '0x742d35Cc6335C4532d5C13A1a5d2C3C3b4a2e789',
      is_active: true
    }
  ];

  for (const walletAddr of walletAddresses) {
    await prisma.wallet_addresses.upsert({
      where: {
        user_id_blockchain: {
          user_id: walletAddr.user_id,
          blockchain: walletAddr.blockchain
        }
      },
      update: {},
      create: walletAddr,
    });
  }

  // Create some transactions for main user (including deposits)
  const transactions = [
    {
      id: 'trans1',
      user_id: mainUser.id,
      amount: 450, // 15% of 3000
      type: 'credit',
      income_source: 'trading_bonus',
      description: 'Monthly trading bonus for investment inv1',
      timestamp: new Date('2025-09-26')
    },
    {
      id: 'trans2',
      user_id: mainUser.id,
      amount: 240, // 12% of 2000
      type: 'credit',
      income_source: 'trading_bonus',
      description: 'Monthly trading bonus for investment inv2',
      timestamp: new Date('2025-09-26')
    },
    {
      id: 'trans3',
      user_id: mainUser.id,
      amount: 200,
      type: 'credit',
      income_source: 'referral_income',
      description: 'Level 1 referral income',
      timestamp: new Date('2025-09-25')
    },
    {
      id: 'trans4',
      user_id: mainUser.id,
      amount: 150,
      type: 'credit',
      income_source: 'direct_income',
      description: 'Direct income from referral',
      timestamp: new Date('2025-09-24')
    },
    {
      id: 'trans5',
      user_id: mainUser.id,
      amount: 500,
      type: 'credit',
      income_source: 'salary_income',
      description: 'Monthly salary for rank achievement',
      timestamp: new Date('2025-09-23')
    },
    // Deposit transactions
    {
      id: 'deposit1',
      user_id: mainUser.id,
      amount: 1000,
      type: 'DEPOSIT',
      income_source: 'BTC',
      status: 'COMPLETED',
      description: 'BTC deposit - TX: 1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
      timestamp: new Date('2025-09-20')
    },
    {
      id: 'deposit2',
      user_id: mainUser.id,
      amount: 2500,
      type: 'DEPOSIT',
      income_source: 'USDT',
      status: 'COMPLETED',
      description: 'USDT deposit - TX: 0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
      timestamp: new Date('2025-09-19')
    },
    {
      id: 'deposit3',
      user_id: mainUser.id,
      amount: 750,
      type: 'DEPOSIT',
      income_source: 'ETH',
      status: 'PENDING',
      description: 'ETH deposit - TX: 0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      timestamp: new Date('2025-09-26')
    },
    {
      id: 'deposit4',
      user_id: mainUser.id,
      amount: 1500,
      type: 'DEPOSIT',
      income_source: 'USDC',
      status: 'COMPLETED',
      description: 'USDC deposit - TX: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      timestamp: new Date('2025-09-18')
    },
    {
      id: 'deposit5',
      user_id: mainUser.id,
      amount: 300,
      type: 'DEPOSIT',
      income_source: 'BTC',
      status: 'FAILED',
      description: 'BTC deposit failed - insufficient confirmations',
      timestamp: new Date('2025-09-17')
    }
  ];

  for (const trans of transactions) {
    await prisma.transactions.upsert({
      where: { id: trans.id },
      update: {},
      create: trans,
    });
  }

  // Create some team members
  const teamMember1 = await prisma.users.upsert({
    where: { email: 'team1@demo.com' },
    update: {},
    create: {
      full_name: 'Team Member 1',
      email: 'team1@demo.com',
      password_hash: hashedMainPassword,
      referral_code: 'TEAM001',
      sponsor_id: mainUser.id,
      position: 'LEFT',
      role: 'USER',
      created_at: new Date('2025-09-20')
    },
  });

  await prisma.wallets.upsert({
    where: { user_id: teamMember1.id },
    update: {},
    create: {
      user_id: teamMember1.id,
      balance: 2500,
    },
  });

  // Add investment for team member 1
  await prisma.investments.upsert({
    where: { id: 'team1inv1' },
    update: {},
    create: {
      id: 'team1inv1',
      user_id: teamMember1.id,
      amount: 1500,
      package_name: 'Standard Package',
      monthly_profit_rate: 12,
      status: 'active',
      start_date: new Date('2025-09-21'),
      unlock_date: new Date('2026-03-21')
    },
  });

  const teamMember2 = await prisma.users.upsert({
    where: { email: 'team2@demo.com' },
    update: {},
    create: {
      full_name: 'Team Member 2',
      email: 'team2@demo.com',
      password_hash: hashedMainPassword,
      referral_code: 'TEAM002',
      sponsor_id: mainUser.id,
      position: 'RIGHT',
      role: 'USER',
      created_at: new Date('2025-09-21')
    },
  });

  await prisma.wallets.upsert({
    where: { user_id: teamMember2.id },
    update: {},
    create: {
      user_id: teamMember2.id,
      balance: 3200,
    },
  });

  // Add investment for team member 2
  await prisma.investments.upsert({
    where: { id: 'team2inv1' },
    update: {},
    create: {
      id: 'team2inv1',
      user_id: teamMember2.id,
      amount: 2200,
      package_name: 'Premium Package',
      monthly_profit_rate: 15,
      status: 'active',
      start_date: new Date('2025-09-22'),
      unlock_date: new Date('2026-03-22')
    },
  });

  // Create guest user
  const guestEmail = 'guest@demo.local';
  const guestPassword = 'password123';
  const hashedPassword = await bcrypt.hash(guestPassword, 10);
  
  // Create or update guest user
  const user = await prisma.users.upsert({
    where: { email: guestEmail },
    update: {},
    create: {
      full_name: 'Guest Demo',
      email: guestEmail,
      password_hash: hashedPassword,
      referral_code: 'GUESTDEMO',
      role: 'USER',
      created_at: new Date()
    },
  });

  // Create or update wallet for guest user
  await prisma.wallets.upsert({
    where: { user_id: user.id },
    update: {},
    create: {
      user_id: user.id,
      balance: 5000,
    },
  });

  console.log('✅ Seed complete: Test users created');
  console.log(`   Main User - Email: ${mainEmail}, Password: ${mainPassword}`);
  console.log(`   Guest User - Email: ${guestEmail}, Password: ${guestPassword}`);
  console.log(`   Team members created with investments`);
  console.log(`   Crypto wallet addresses created for BTC, ETH, USDT, USDC`);
  console.log(`   Sample deposit transactions created (completed, pending, failed)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
