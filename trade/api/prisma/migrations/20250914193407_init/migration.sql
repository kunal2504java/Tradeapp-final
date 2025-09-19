/*
  Warnings:

  - You are about to drop the `Investment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reward` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserReward` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Investment" DROP CONSTRAINT "Investment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_sponsor_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserReward" DROP CONSTRAINT "UserReward_reward_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserReward" DROP CONSTRAINT "UserReward_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Wallet" DROP CONSTRAINT "Wallet_user_id_fkey";

-- DropTable
DROP TABLE "public"."Investment";

-- DropTable
DROP TABLE "public"."Reward";

-- DropTable
DROP TABLE "public"."Transaction";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."UserReward";

-- DropTable
DROP TABLE "public"."Wallet";

-- DropEnum
DROP TYPE "public"."TransactionStatus";

-- DropEnum
DROP TYPE "public"."UserRole";

-- CreateTable
CREATE TABLE "public"."investments" (
    "id" VARCHAR(30) NOT NULL,
    "user_id" VARCHAR(30) NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "package_name" VARCHAR(100) NOT NULL,
    "monthly_profit_rate" DECIMAL(5,2) NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "unlock_date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "investments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."transactions" (
    "id" VARCHAR(30) NOT NULL,
    "user_id" VARCHAR(30) NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "type" VARCHAR(10) NOT NULL,
    "income_source" VARCHAR(32) NOT NULL,
    "description" TEXT,
    "timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" VARCHAR(30) NOT NULL,
    "full_name" VARCHAR(200) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "password_hash" VARCHAR(200),
    "referral_code" VARCHAR(32) NOT NULL,
    "sponsor_id" VARCHAR(30),
    "position_in_sponsor_tree" VARCHAR(1),
    "role" VARCHAR(10) NOT NULL DEFAULT 'USER',
    "googleId" VARCHAR(100),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."wallets" (
    "id" VARCHAR(30) NOT NULL,
    "user_id" VARCHAR(30) NOT NULL,
    "balance" DECIMAL(18,2) NOT NULL DEFAULT 0,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_investments_user" ON "public"."investments"("user_id");

-- CreateIndex
CREATE INDEX "idx_transactions_user_time" ON "public"."transactions"("user_id", "timestamp" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_referral_code_key" ON "public"."users"("referral_code");

-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "public"."users"("googleId");

-- CreateIndex
CREATE INDEX "idx_users_sponsor" ON "public"."users"("sponsor_id");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_user_id_key" ON "public"."wallets"("user_id");

-- AddForeignKey
ALTER TABLE "public"."investments" ADD CONSTRAINT "investments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_sponsor_id_fkey" FOREIGN KEY ("sponsor_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."wallets" ADD CONSTRAINT "wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
