-- CreateTable
CREATE TABLE "Bid" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rfpId" INTEGER,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BidPosting" (
    "id" SERIAL NOT NULL,
    "bidId" INTEGER NOT NULL,
    "description" TEXT,
    "type" TEXT,
    "images" JSONB,
    "attributes" JSONB,
    "selectedOffer" INTEGER,
    "company" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BidPosting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RFP" (
    "id" SERIAL NOT NULL,
    "currentBids" INTEGER,
    "description" TEXT,
    "jobType" TEXT,
    "images" JSONB,
    "attributes" JSONB,
    "originalCompany" TEXT,
    "status" TEXT,
    "startDate" TIMESTAMP(3),
    "finishDate" TIMESTAMP(3),
    "User" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RFP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT NOT NULL,
    "rfpId" INTEGER,
    "jobType" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "daysExpected" INTEGER NOT NULL,
    "company" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_rfpId_fkey" FOREIGN KEY ("rfpId") REFERENCES "RFP"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BidPosting" ADD CONSTRAINT "BidPosting_bidId_fkey" FOREIGN KEY ("bidId") REFERENCES "Bid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_rfpId_fkey" FOREIGN KEY ("rfpId") REFERENCES "RFP"("id") ON DELETE SET NULL ON UPDATE CASCADE;
