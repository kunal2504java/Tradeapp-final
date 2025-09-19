-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "chain" TEXT,
ADD COLUMN     "deposit_address" TEXT,
ADD COLUMN     "transaction_hash" TEXT;
