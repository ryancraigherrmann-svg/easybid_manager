-- Add user/company/info/expectedDate columns to Bid and create BidLineItem table
BEGIN;

ALTER TABLE "Bid" ADD COLUMN IF NOT EXISTS "user" TEXT;
ALTER TABLE "Bid" ADD COLUMN IF NOT EXISTS "company" TEXT;
ALTER TABLE "Bid" ADD COLUMN IF NOT EXISTS "info" TEXT;
ALTER TABLE "Bid" ADD COLUMN IF NOT EXISTS "expectedDate" TIMESTAMP(3);

CREATE TABLE IF NOT EXISTS "BidLineItem" (
  "id" SERIAL PRIMARY KEY,
  "bidId" INTEGER NOT NULL REFERENCES "Bid"("id") ON DELETE CASCADE,
  "description" TEXT,
  "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) DEFAULT NOW(),
  "updatedAt" TIMESTAMP(3) DEFAULT NOW()
);

COMMIT;
