/*
  Warnings:

  - You are about to drop the `Journal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Journal" DROP CONSTRAINT "Journal_userId_fkey";

-- DropForeignKey
ALTER TABLE "journal_entry" DROP CONSTRAINT "journal_entry_journal_id_fkey";

-- DropTable
DROP TABLE "Journal";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" TEXT NOT NULL DEFAULT '',
    "last_name" TEXT NOT NULL DEFAULT '',
    "email" VARCHAR NOT NULL,
    "country" TEXT NOT NULL DEFAULT '',
    "date_of_birth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journal" (
    "journal_id" UUID NOT NULL,
    "journalName" TEXT NOT NULL DEFAULT 'Personal Journal',
    "userId" UUID NOT NULL,

    CONSTRAINT "journal_pkey" PRIMARY KEY ("journal_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "journal_journal_id_key" ON "journal"("journal_id");

-- AddForeignKey
ALTER TABLE "journal" ADD CONSTRAINT "journal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_entry" ADD CONSTRAINT "journal_entry_journal_id_fkey" FOREIGN KEY ("journal_id") REFERENCES "journal"("journal_id") ON DELETE RESTRICT ON UPDATE CASCADE;
