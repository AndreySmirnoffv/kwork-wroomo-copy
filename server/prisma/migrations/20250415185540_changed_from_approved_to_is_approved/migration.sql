/*
  Warnings:

  - You are about to drop the column `approved` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "approved",
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;
