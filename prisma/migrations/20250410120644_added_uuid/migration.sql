/*
  Warnings:

  - Added the required column `uuid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'client',
ADD COLUMN     "uuid" TEXT NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;
