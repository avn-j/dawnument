"use client";

import { useState } from "react";
import JournalHeader from "../components/JournalHeader";
import MoodPicker, { Mood } from "../components/MoodPicker";
import Tiptap from "../components/Tiptap";
import { IconCheck, IconMoodNeutral } from "@tabler/icons-react";
import { JSONContent } from "@tiptap/react";
import { journalEntrySchema } from "@/schemas/journalSchemas";
import { toast } from "sonner";
import { createJournalEntry } from "./actions";
import { redirect } from "next/navigation";
import { UserFriendlyError } from "@/utils/errors";

export default function JournalNew() {
    const [selectedPrompt, setSelectedPrompt] = useState("");
    const [mood, setMood] = useState<Mood>({ id: "neutral", label: "Neutral", icon: IconMoodNeutral });
    const [date, setDate] = useState<Date | undefined>();
    const [tags, setTags] = useState<string[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState<JSONContent>();
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        const data = {
            mood: mood.id,
            date,
            tags: tags.join(","),
            content,
            title,
        };

        const validationResult = journalEntrySchema.safeParse(data);

        if (!validationResult.success) {
            validationResult.error.issues.forEach((issue) => toast.error("Error", { description: issue.message, duration: 5000 }));
            setIsSaving(false);
            return;
        }

        const journalEntryData = JSON.stringify(validationResult.data);

        try {
            await createJournalEntry(journalEntryData);
            toast.success("Journal entry created.");
            setTimeout(() => {
                redirect("/");
            }, 2000);
        } catch (e) {
            if (e instanceof Error && e.name === "UserFriendlyError") toast.error("Error", { description: e.message });
            else toast.error("Error", { description: "An unexpected error has occurred" });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center pb-4">
            <JournalHeader
                onSelectPrompt={setSelectedPrompt}
                setJournalDate={setDate}
                setJournalTags={setTags}
                setJournalTitle={setTitle}
                addedTags={tags}
                journalDate={date}
                mood={mood}
                handleSave={handleSave}
                isSaving={isSaving}
            />
            <div className="mt-10">
                <MoodPicker setMood={setMood} mood={mood} isSaving={isSaving} />
            </div>
            <div className="w-screen h-full max-h-screen overflow-y-auto flex justify-center ">
                <Tiptap prompt={selectedPrompt} setContent={setContent} isSaving={isSaving} />
            </div>
        </div>
    );
}
