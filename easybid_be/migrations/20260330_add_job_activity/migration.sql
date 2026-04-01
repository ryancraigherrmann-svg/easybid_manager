-- CreateTable
CREATE TABLE "JobActivity" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "rfpId" INTEGER,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "fileName" TEXT,
    "fileKey" TEXT,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobActivity" ADD CONSTRAINT "JobActivity_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobActivity" ADD CONSTRAINT "JobActivity_rfpId_fkey" FOREIGN KEY ("rfpId") REFERENCES "RFP"("id") ON DELETE SET NULL ON UPDATE CASCADE;
