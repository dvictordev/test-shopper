/*
  Warnings:

  - The `confirmed` column on the `Measures` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Measures" DROP COLUMN "confirmed",
ADD COLUMN     "confirmed" TIMESTAMP(3);
