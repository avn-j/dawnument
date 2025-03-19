/*
  Warnings:

  - You are about to drop the column `emotion` on the `journal_entries` table. All the data in the column will be lost.
  - Added the required column `mood` to the `journal_entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "journal_entries" DROP COLUMN "emotion",
ADD COLUMN     "mood" TEXT NOT NULL,
ALTER COLUMN "tags" DROP NOT NULL;
