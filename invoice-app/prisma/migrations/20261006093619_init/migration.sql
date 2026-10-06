-- CreateEnum
CREATE TYPE "Status" AS ENUM ('draft', 'pending', 'paid');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "createdAt" DATE NOT NULL,
    "paymentDue" DATE NOT NULL,
    "paymentTerms" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "senderStreet" TEXT NOT NULL,
    "senderCity" TEXT NOT NULL,
    "senderPostCode" TEXT NOT NULL,
    "senderCountry" TEXT NOT NULL,
    "clientStreet" TEXT NOT NULL,
    "clientCity" TEXT NOT NULL,
    "clientPostCode" TEXT NOT NULL,
    "clientCountry" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceItem" (
    "id" SERIAL NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priceCents" INTEGER NOT NULL,

    CONSTRAINT "InvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");

-- CreateIndex
CREATE INDEX "InvoiceItem_invoiceId_idx" ON "InvoiceItem"("invoiceId");

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
