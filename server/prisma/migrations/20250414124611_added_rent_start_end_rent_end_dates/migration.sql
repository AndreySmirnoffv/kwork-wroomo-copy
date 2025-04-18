/*
  Warnings:

  - Added the required column `rentEnd` to the `Bike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentStart` to the `Bike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentEnd` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentStart` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bike" ADD COLUMN     "rentEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "rentStart" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "rentEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "rentStart" TIMESTAMP(3) NOT NULL;
