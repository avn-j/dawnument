import { getUser } from "@/lib/authFunctions";
import { DatabaseError, NotFoundError } from "@/utils/errors";
import prisma from "@/utils/prisma/client";
import { JournalEntry, User } from "@prisma/client";

type JournalEntryPartial = Pick<JournalEntry, "content" | "mood" | "tags" | "title" | "entryDate">;

export async function createNewJournal(userId: string, journalName: string) {
    const journal = await prisma.journal.create({
        data: {
            userId,
            // TODO: Change to be dynamic
            journalName: "My First Journal",
        },
    });

    if (!journal) throw new DatabaseError("Could not create new journal");
    return journal;
}

export async function getJournalId(userId: string, journalName: string) {
    const journal = await prisma.journal.findFirst({
        where: {
            userId,
            // TODO: Change to be dynamic
            journalName: "My First Journal",
        },
    });

    return journal ? journal.id : null;
}

export async function createNewJournalEntry(userId: string, data: JournalEntryPartial) {
    const journalId = await getJournalId(userId, "PLACEHOLDER");
    if (!journalId) {
        console.error("Could not find journalId.");
        throw new NotFoundError("Could not find journal id.");
    }

    try {
        return await prisma.journalEntry.create({
            data: {
                journalId,
                ...data,
            },
        });
    } catch (error) {
        console.error("Failed to create journal entry");
        throw new DatabaseError("Failed to create journal entry.");
    }
}

export async function getJournalEntriesByUserId(userId: string, journalName: string) {
    const journalId = await getJournalId(userId, "PLACEHOLDER");
    if (!journalId) {
        console.error("Could not find journalId.");
        throw new NotFoundError("Could not find journal id.");
    }

    try {
        return await prisma.journalEntry.findMany({
            where: {
                journalId,
            },
        });
    } catch (error) {
        console.error("Could not get user journal entries");
        throw new DatabaseError("Could not retrieve user's journal entries");
    }
}

export async function getUserJournalEntriesByJournal() {}
