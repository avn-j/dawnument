-- DropForeignKey
ALTER TABLE "journal_entries" DROP CONSTRAINT "journal_entries_journal_id_fkey";

-- DropForeignKey
ALTER TABLE "journals" DROP CONSTRAINT "journals_userId_fkey";

-- AddForeignKey
ALTER TABLE "journals" ADD CONSTRAINT "journals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "app_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_journal_id_fkey" FOREIGN KEY ("journal_id") REFERENCES "journals"("journal_id") ON DELETE CASCADE ON UPDATE CASCADE;
