/*
  Warnings:

  - You are about to drop the column `journalName` on the `journal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "journal" DROP COLUMN "journalName",
ADD COLUMN     "journal_name" TEXT NOT NULL DEFAULT 'Personal Journal';
