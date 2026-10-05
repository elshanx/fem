-- CreateTable
CREATE TABLE "Link" (
    "code" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE INDEX "Link_ownerId_createdAt_idx" ON "Link"("ownerId", "createdAt");
