-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "rfpId" INTEGER,
    "jobType" TEXT,
    "startDate" TIMESTAMP(3),
    "daysExpected" INTEGER,
    "company" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_rfpId_fkey" FOREIGN KEY ("rfpId") REFERENCES "RFP"("id") ON DELETE SET NULL ON UPDATE CASCADE;
