/*
  Warnings:

  - You are about to drop the `name` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "time" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "name";
