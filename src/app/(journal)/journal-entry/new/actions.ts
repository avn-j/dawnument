"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getUser } from "@/lib/authFunctions";
import { journalEntrySchema } from "@/schemas/journalSchemas";
import { AuthError, DataValidationError, UserFriendlyError } from "@/utils/errors";
import { createNewJournalEntry } from "@/services/journalServices";

export async function createJournalEntry(values: string) {
    try {
        const data = JSON.parse(values);
        data.date = new Date(data.date);
        const result = journalEntrySchema.safeParse(data);
        if (!result.success) throw new DataValidationError("Invalid journal entry data.");

        const { title, date, content, mood, tags } = result.data;

        const user = await getUser();
        if (!user) throw new AuthError("User is not authenticated.");

        const journalEntry = await createNewJournalEntry(user.id, {
            title,
            content: JSON.stringify(content),
            tags: tags ?? "",
            entryDate: date,
            mood,
        });

        return journalEntry;
    } catch (error) {
        if (error instanceof AuthError) throw new UserFriendlyError("You must be logged in to create a journal entry.");

        throw new UserFriendlyError("Failed to create journal entry. Please try again.");
    }
}
