-- AlterTable
ALTER TABLE "User" ADD COLUMN     "additionalEmail" TEXT DEFAULT '',
ADD COLUMN     "additionalName" TEXT DEFAULT '',
ADD COLUMN     "additionalPhoneNumber" TEXT DEFAULT '',
ADD COLUMN     "additionalStatus" TEXT DEFAULT '',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'default_name',
ADD COLUMN     "surname" TEXT NOT NULL DEFAULT 'default_surname';
