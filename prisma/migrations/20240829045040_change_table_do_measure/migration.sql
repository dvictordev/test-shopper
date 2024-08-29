/*
  Warnings:

  - You are about to drop the `measures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "measures";

-- CreateTable
CREATE TABLE "Measures" (
    "id" TEXT NOT NULL,
    "measure_date" TIMESTAMP(3) NOT NULL,
    "value" INTEGER NOT NULL,
    "measure_type" "MeasureType" NOT NULL DEFAULT 'WATER',
    "confirmed" BOOLEAN NOT NULL,
    "customer_code" TEXT NOT NULL,

    CONSTRAINT "Measures_pkey" PRIMARY KEY ("id")
);
