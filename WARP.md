# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Fox Trading Platform is a full-stack investment and network marketing application built with a Node.js/Express API backend and React/TypeScript frontend. The platform supports multi-level income streams, referral systems, and investment management with automated commission calculations.

## Tech Stack

- **Backend**: Node.js with Express.js, Prisma ORM, PostgreSQL database
- **Frontend**: React + TypeScript, Vite build tool, ShadCN/UI components, TailwindCSS
- **Authentication**: JWT + Passport.js (with Google OAuth support)
- **Data**: Prisma with PostgreSQL, automated cron jobs for commission processing
- **Package Manager**: npm (API), bun.lockb present but npm also available (Frontend)

## Development Commands

### API (Backend) - `/trade/api/`

```bash
# Install dependencies
npm install

# Development server with hot reload
npm run dev

# Production start
npm run start

# Lint code
npm run lint

# Database operations
npx prisma generate          # Generate Prisma client
npx prisma migrate dev       # Run migrations in development
npx prisma migrate deploy    # Deploy migrations to production
npx prisma studio           # Open database browser
npm run seed                # Seed database with initial data
```

### Frontend - `/trade/frontend/`

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Build for development (with dev optimizations)
npm run build:dev

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Database Management

```bash
# Create admin user (from API directory)
node prisma/createAdmin.js

# Reset database (from API src/scripts)
node src/scripts/reset-database.js

# Clean up users (from API src/scripts)
node src/scripts/cleanup-users.js
```

## Architecture Overview

### Database Schema (Prisma)

The platform uses a PostgreSQL database with four main models:

- **users**: User accounts with referral hierarchy support, Google OAuth integration
- **investments**: User investment packages with 6-month locking periods
- **transactions**: All financial transactions (credits/debits) with income source tracking
- **wallets**: User balance management

Key relationships:
- Users have self-referencing relationships for sponsor/downline structure
- Each user has one wallet, multiple investments, and multiple transactions
- Binary tree structure for network marketing (left/right positioning)

### Backend Architecture (`/trade/api/src/`)

```
├── routes/           # API endpoint definitions
│   ├── auth.js       # Authentication (login, register, Google OAuth)
│   ├── user.js       # User profile and dashboard data
│   ├── investment.js # Investment packages and management
│   ├── network.js    # Network tree and referral data
│   ├── wallet.js     # Wallet operations (deposit, withdraw)
│   ├── rewards.js    # Fast track and bonus rewards
│   ├── admin.js      # Admin-only operations
│   └── testing.js    # Development/testing endpoints
├── jobs/             # Background processing
│   ├── scheduler.js  # Cron job setup
│   └── workers.js    # Commission calculation logic
├── middleware/       # Express middleware
├── config/           # Configuration (Passport strategies)
├── lib/             # Database client (Prisma)
├── utils/           # Utility functions (referral codes)
└── scripts/         # Database maintenance scripts
```

### Frontend Architecture (`/trade/frontend/src/`)

```
├── pages/            # Route components
│   ├── app/          # Protected application pages
│   │   ├── Dashboard.tsx    # Main user dashboard
│   │   ├── Network.tsx      # Network tree visualization
│   │   ├── Investments.tsx  # Investment management
│   │   ├── Wallet.tsx       # Wallet operations
│   │   ├── Salary.tsx       # Salary rank progress
│   │   ├── Rewards.tsx      # Bonus rewards tracking
│   │   └── admin/          # Admin-only pages
│   ├── Login.tsx     # Authentication pages
│   └── Register.tsx
├── components/       # Reusable React components
│   ├── ui/          # ShadCN/UI component library
│   └── [business-specific components]
├── hooks/           # Custom React hooks (auth, mobile)
├── layouts/         # Layout wrappers (AppLayout)
└── lib/            # Utilities (API client, utils)
```

### Key Business Logic

**Multi-Level Income System**:
- **Trading Bonus**: 10-15% monthly profits on investments
- **Direct Income**: 5% bonus on first direct referral investment
- **Referral Income**: 20-level deep commission structure
- **Salary Income**: Binary tree business volume calculations
- **Fast Track Rewards**: Time-sensitive bonuses for quick rank advancement

**Investment Mechanics**:
- 6-month principal locking period
- Monthly profit distributions based on package tier
- Principal can only be withdrawn after unlock date
- Profits are immediately available for withdrawal

**Network Structure**:
- Binary tree with left/right leg positioning
- Sponsor-based referral tracking with unique referral codes
- Business volume tracking for salary calculations

## Development Guidelines

### Environment Setup

Backend requires `.env` file in `/trade/api/`:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret for JWT token signing
- `PORT`: Server port (default 4000)
- Google OAuth credentials for social login

### Testing User Flows

- Use `/api/testing` endpoints for development scenarios
- Guest login available for demo purposes
- Admin panel accessible at `/app/admin/payments` for ADMIN role users

### Database Considerations

- Prisma handles migrations and schema changes
- Use `npm run seed` for initial data setup
- Automated cron jobs run commission calculations
- Transaction history is immutable for audit purposes

### Common Development Tasks

When working with investments:
- Always validate package tiers against business rules
- Consider 6-month locking period in calculations
- Update both investment records and transaction logs

When modifying network structure:
- Maintain binary tree integrity (left/right positioning)
- Update business volume calculations for affected uplines
- Consider impact on salary rank calculations

When handling financial operations:
- Enforce $100 minimum withdrawal limit
- Ensure all transactions create audit trail entries
- Validate user wallet balance before processing withdrawals