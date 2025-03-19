import { getUser } from "@/lib/authFunctions";
import { AuthError } from "@supabase/supabase-js";
import { getJournalEntriesByUserId } from "@/services/journalServices";

export async function getUserJournalEntries() {
    const user = await getUser();
    if (!user) throw new AuthError("You must be logged in to continue.");
    return await getJournalEntriesByUserId(user.id, "PLACEHOLDER");
}
