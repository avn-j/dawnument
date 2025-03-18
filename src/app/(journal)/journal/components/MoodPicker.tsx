"use client";

import { useState } from "react";
import {
    IconMoodHappy,
    IconMoodSad,
    IconMoodNeutral,
    IconMoodAngry,
    IconMoodCrazyHappy,
    IconMoodPuzzled,
    IconMoodHeart,
    IconMoodNervous,
    IconMoodSpark,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils"; // Utility for handling class names
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const moods = [
    { id: "angry", label: "Angry", icon: IconMoodAngry },
    { id: "sad", label: "Sad", icon: IconMoodSad },
    { id: "anxious", label: "Anxious", icon: IconMoodNervous },
    { id: "Unsure", label: "Unsure", icon: IconMoodPuzzled },
    { id: "neutral", label: "Neutral", icon: IconMoodNeutral },
    { id: "happy", label: "Happy", icon: IconMoodHappy },
    { id: "motivated", label: "Motivated", icon: IconMoodSpark },
    { id: "grateful", label: "Grateful", icon: IconMoodHeart },
    { id: "excited", label: "Excited", icon: IconMoodCrazyHappy },
];

export default function MoodPicker() {
    const [selectedMood, setSelectedMood] = useState("");

    const handleMoodSelect = (mood: string) => {
        setSelectedMood(mood);
        // onMoodSelect?.(mood); // Call the parent callback if provided
    };

    return (
        <div className="text-center">
            <Card className="gap-3 py-6 transition">
                <h2 className="text-gray-700">Which best describes how you are feeling?</h2>
                <div className="flex space-x-4 px-4">
                    {moods.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            className={cn(
                                "flex flex-col p-4 items-center text-gray-400 hover:bg-gray-100 hover:text-gray-800 transition ease-in rounded-xl",
                                selectedMood === id ? "text-amber-700 hover:text-amber-700" : ""
                            )}
                            onClick={() => handleMoodSelect(id)}
                        >
                            <Icon size={30} />
                            <span className="text-xs font-semibold mt-1">{label}</span>
                        </button>
                    ))}
                </div>
            </Card>
        </div>
    );
}
