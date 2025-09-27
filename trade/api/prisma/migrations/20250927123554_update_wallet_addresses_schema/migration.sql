/*
  Warnings:

  - A unique constraint covering the columns `[user_id,blockchain,address]` on the table `wallet_addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."wallet_addresses_user_id_blockchain_key";

-- AlterTable
ALTER TABLE "public"."wallet_addresses" ADD COLUMN     "is_selected" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "label" VARCHAR(100);

-- CreateIndex
CREATE INDEX "idx_wallet_addresses_user_blockchain" ON "public"."wallet_addresses"("user_id", "blockchain");

-- CreateIndex
CREATE UNIQUE INDEX "wallet_addresses_user_id_blockchain_address_key" ON "public"."wallet_addresses"("user_id", "blockchain", "address");
