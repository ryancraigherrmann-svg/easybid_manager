-- Update RFP table: add title, add bidsDueDate, remove finishDate, change status to integer
BEGIN;

ALTER TABLE "RFP" ADD COLUMN IF NOT EXISTS "title" TEXT;
ALTER TABLE "RFP" ADD COLUMN IF NOT EXISTS "bidsDueDate" TIMESTAMP(3);
ALTER TABLE "RFP" DROP COLUMN IF EXISTS "finishDate";

-- Convert existing status text to integer where possible, otherwise default to 1
-- Use a CASE expression to map common string values to integers if needed
ALTER TABLE "RFP" ALTER COLUMN "status" TYPE INTEGER USING (
  CASE
    WHEN "status" ~ '^\\d+$' THEN ("status")::integer
    WHEN lower("status") = 'draft' THEN 1
    WHEN lower("status") = 'in process' THEN 2
    WHEN lower("status") = 'closed' THEN 3
    ELSE 1
  END
);
ALTER TABLE "RFP" ALTER COLUMN "status" SET DEFAULT 1;

COMMIT;
