-- CreateEnum
CREATE TYPE "MeasureType" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "measures" (
    "id" TEXT NOT NULL,
    "measure_date" TIMESTAMP(3) NOT NULL,
    "value" INTEGER NOT NULL,
    "measure_type" "MeasureType" NOT NULL DEFAULT 'WATER',
    "confirmed" BOOLEAN NOT NULL,
    "customer_code" TEXT NOT NULL,

    CONSTRAINT "measures_pkey" PRIMARY KEY ("id")
);
