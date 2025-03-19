/*
  Warnings:

  - You are about to drop the `journal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `journal_entry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "journal" DROP CONSTRAINT "journal_userId_fkey";

-- DropForeignKey
ALTER TABLE "journal_entry" DROP CONSTRAINT "journal_entry_journal_id_fkey";

-- DropTable
DROP TABLE "journal";

-- DropTable
DROP TABLE "journal_entry";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "app_users" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" TEXT NOT NULL DEFAULT '',
    "last_name" TEXT NOT NULL DEFAULT '',
    "email" VARCHAR NOT NULL,
    "country" TEXT NOT NULL DEFAULT '',
    "date_of_birth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "app_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journals" (
    "journal_id" UUID NOT NULL,
    "journal_name" TEXT NOT NULL DEFAULT 'Personal Journal',
    "userId" UUID NOT NULL,

    CONSTRAINT "journals_pkey" PRIMARY KEY ("journal_id")
);

-- CreateTable
CREATE TABLE "journal_entries" (
    "entry_id" UUID NOT NULL,
    "journal_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entry_date" TIMESTAMPTZ NOT NULL,
    "tags" TEXT NOT NULL,
    "emotion" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "journal_entries_pkey" PRIMARY KEY ("entry_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "app_users_email_key" ON "app_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "journals_journal_id_key" ON "journals"("journal_id");

-- CreateIndex
CREATE UNIQUE INDEX "journal_entries_entry_id_key" ON "journal_entries"("entry_id");

-- AddForeignKey
ALTER TABLE "journals" ADD CONSTRAINT "journals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "app_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_journal_id_fkey" FOREIGN KEY ("journal_id") REFERENCES "journals"("journal_id") ON DELETE RESTRICT ON UPDATE CASCADE;
