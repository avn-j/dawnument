"use client";

import { useEffect, useState } from "react";
import JournalHeader from "../components/JournalHeader";
import MoodPicker from "../components/MoodPicker";
import Tiptap from "../components/Tiptap";

export default function JournalNew() {
    const [selectedPrompt, setSelectedPrompt] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center pb-4">
            <JournalHeader onSelectPrompt={setSelectedPrompt} handleSetTags={setTags} />
            <div className="mt-10">
                <MoodPicker />
            </div>
            <div className="w-screen h-full max-h-screen overflow-y-auto flex justify-center">
                <Tiptap prompt={selectedPrompt} />
            </div>
        </div>
    );
}
