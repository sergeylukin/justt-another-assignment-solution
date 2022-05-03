-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('FEMALE', 'MALE');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "currency" VARCHAR(3) NOT NULL DEFAULT E'USD',
    "creditCardType" VARCHAR(255) NOT NULL,
    "creditCardNumber" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "gender" "Gender",
    "country" TEXT,
    "city" TEXT,
    "street" TEXT,
    "phone" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_externalId_key" ON "Customer"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
