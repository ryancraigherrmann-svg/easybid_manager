-- AlterTable
ALTER TABLE "RFP" ADD COLUMN "notifiedEmails" TEXT[] DEFAULT ARRAY[]::TEXT[];
