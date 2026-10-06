-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Job" (
    "id" INTEGER NOT NULL,
    "company" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "logoBackground" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "postedAt" TEXT NOT NULL,
    "contract" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "apply" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirementsContent" TEXT NOT NULL,
    "requirementsItems" TEXT[],
    "roleContent" TEXT NOT NULL,
    "roleItems" TEXT[],

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Job_contract_idx" ON "Job"("contract");

