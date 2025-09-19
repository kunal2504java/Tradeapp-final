/*
  Warnings:

  - You are about to drop the column `position_in_sponsor_tree` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."transactions" ADD COLUMN     "status" VARCHAR(10) NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "position_in_sponsor_tree",
ADD COLUMN     "position" VARCHAR(10);

-- CreateTable
CREATE TABLE "public"."rewards" (
    "id" VARCHAR(30) NOT NULL,
    "reward_name" VARCHAR(100) NOT NULL,
    "bonus_amount" DECIMAL(18,2) NOT NULL,
    "rank_to_achieve" INTEGER NOT NULL,
    "timeframe_days" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_rewards" (
    "id" VARCHAR(30) NOT NULL,
    "user_id" VARCHAR(30) NOT NULL,
    "reward_id" VARCHAR(30) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "achieved_date" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_rewards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_user_rewards_user" ON "public"."user_rewards"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_rewards_user_id_reward_id_key" ON "public"."user_rewards"("user_id", "reward_id");

-- CreateIndex
CREATE INDEX "idx_users_sponsor_position" ON "public"."users"("sponsor_id", "position");

-- AddForeignKey
ALTER TABLE "public"."user_rewards" ADD CONSTRAINT "user_rewards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."user_rewards" ADD CONSTRAINT "user_rewards_reward_id_fkey" FOREIGN KEY ("reward_id") REFERENCES "public"."rewards"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
