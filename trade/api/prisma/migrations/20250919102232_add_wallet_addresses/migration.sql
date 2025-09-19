-- CreateTable
CREATE TABLE "public"."wallet_addresses" (
    "id" VARCHAR(30) NOT NULL,
    "user_id" VARCHAR(30) NOT NULL,
    "blockchain" VARCHAR(20) NOT NULL,
    "address" VARCHAR(200) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallet_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_wallet_addresses_user" ON "public"."wallet_addresses"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "wallet_addresses_user_id_blockchain_key" ON "public"."wallet_addresses"("user_id", "blockchain");

-- AddForeignKey
ALTER TABLE "public"."wallet_addresses" ADD CONSTRAINT "wallet_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
