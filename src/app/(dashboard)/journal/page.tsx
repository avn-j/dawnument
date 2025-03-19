import { getUserJournalEntries } from "./actions";

export default async function JournalPage() {
    const journalEntries = await getUserJournalEntries();

    console.log(journalEntries);

    return <div></div>;
}
