-- CreateTable
CREATE TABLE "Journal" (
    "journal_id" UUID NOT NULL,
    "journalName" TEXT NOT NULL DEFAULT 'Personal Journal',
    "userId" UUID NOT NULL,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("journal_id")
);

-- CreateTable
CREATE TABLE "journal_entry" (
    "entry_id" UUID NOT NULL,
    "journal_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entry_date" TIMESTAMPTZ NOT NULL,
    "tags" TEXT NOT NULL,
    "emotion" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "journal_entry_pkey" PRIMARY KEY ("entry_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Journal_journal_id_key" ON "Journal"("journal_id");

-- CreateIndex
CREATE UNIQUE INDEX "journal_entry_entry_id_key" ON "journal_entry"("entry_id");

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_entry" ADD CONSTRAINT "journal_entry_journal_id_fkey" FOREIGN KEY ("journal_id") REFERENCES "Journal"("journal_id") ON DELETE RESTRICT ON UPDATE CASCADE;
