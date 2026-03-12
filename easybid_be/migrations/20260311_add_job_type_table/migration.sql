-- CreateTable
CREATE TABLE "JobType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobType_name_key" ON "JobType"("name");

-- Seed default job types
INSERT INTO "JobType" ("name", "updatedAt") VALUES
  ('Roofing', NOW()),
  ('Plumbing', NOW()),
  ('Electrical', NOW()),
  ('HVAC', NOW()),
  ('Painting', NOW()),
  ('Flooring', NOW()),
  ('Landscaping', NOW()),
  ('General Construction', NOW()),
  ('Remodeling', NOW()),
  ('Demolition', NOW()),
  ('Concrete', NOW()),
  ('Framing', NOW()),
  ('Drywall', NOW()),
  ('Insulation', NOW()),
  ('Siding', NOW()),
  ('Windows & Doors', NOW()),
  ('Fencing', NOW()),
  ('Excavation', NOW());
