-- CreateEnum
CREATE TYPE "public"."TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "status" "public"."TransactionStatus" NOT NULL DEFAULT 'PENDING';
