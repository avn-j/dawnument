"use client";

import { IconX } from "@tabler/icons-react";
import SaveButtonDialog from "./SaveButtonDialog";
import { Mood } from "./MoodPicker";
import PromptGeneratorButton from "./PromptGeneratorButton";
import JournalTagAdder from "./JournalTagAdder";
import HomeButton from "./HomeButton";
import JournalDateButton from "./JournalDateButton";

interface JournalHeaderProps {
    onSelectPrompt: (prompt: string) => void;
    setJournalDate: (date: Date | undefined) => void;
    setJournalTitle: (title: string) => void;
    setJournalTags: (tags: string[]) => void;
    journalDate: Date | undefined;
    addedTags: string[];
    mood: Mood;
    handleSave: () => void;
    isSaving: boolean;
}

export default function JournalHeader({
    onSelectPrompt,
    setJournalDate,
    setJournalTags,
    setJournalTitle,
    addedTags,
    journalDate,
    mood,
    handleSave,
    isSaving,
}: JournalHeaderProps) {
    return (
        <div className="bg-gray-50 w-full py-6 border-b border-2 grid grid-cols-3 items-center px-8">
            <HomeButton isSaving={isSaving} />
            <div className="flex flex-col items-center">
                <h1 className="text-xs text-gray-500">New Journal Entry</h1>
                <JournalDateButton isSaving={isSaving} journalDate={journalDate} setJournalDate={setJournalDate} />
                <JournalTags addedTags={addedTags} setJournalTags={setJournalTags} />
            </div>
            <div className="flex justify-end gap-3">
                {/* Refactor to move prompts to another component */}
                <PromptGeneratorButton isSaving={isSaving} onSelectPrompt={onSelectPrompt} />
                <JournalTagAdder addedTags={addedTags} setJournalTags={setJournalTags} isSaving={isSaving} />
                <SaveButtonDialog mood={mood} setJournalTitle={setJournalTitle} journalTags={addedTags} handleSave={handleSave} isSaving={isSaving} />
            </div>
        </div>
    );
}

/**
 * Journal Tags component
 */
interface JournalTagsProps {
    addedTags: string[];
    setJournalTags: (tags: string[]) => void;
}

export function JournalTags({ addedTags, setJournalTags }: JournalTagsProps) {
    const handleRemoveTag = (value: string) => {
        const tagsRemaining = addedTags.filter((tag) => tag !== value);
        setJournalTags(tagsRemaining);
    };

    return (
        <>
            {addedTags.length > 0 && (
                <div className="flex gap-2 mx-auto mt-2">
                    {addedTags.map((tag, index) => (
                        <div key={index} className="bg-gray-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                            {tag}{" "}
                            <IconX
                                size={12}
                                className="bg-gray-400 rounded-full text-gray-100 hover:text-gray-900 cursor-pointer"
                                onClick={() => handleRemoveTag(tag)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
