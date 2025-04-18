/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isAvailable" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAvailable";
