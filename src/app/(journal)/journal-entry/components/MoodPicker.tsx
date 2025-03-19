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
    Icon,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
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

export type Mood = {
    id: string;
    label: string;
    icon: Icon;
};

interface MoodPickerProps {
    setMood: (mood: Mood) => void;
    mood: Mood;
    isSaving: boolean;
}

export default function MoodPicker({ setMood, mood, isSaving }: MoodPickerProps) {
    const [selectedMood, setSelectedMood] = useState(mood.id);

    const handleMoodSelect = (mood: string) => {
        setSelectedMood(mood);
        const moodObj = moods.filter((item) => item.id === mood)[0];
        if (!moodObj) return;
        setMood(moodObj); // Call the parent callback if provided
    };

    return (
        <div className="text-center">
            <Card className="gap-3 py-6 transition">
                <h2 className="text-gray-700">Which best describes your current mood?</h2>
                <div className="flex space-x-4 px-4">
                    {moods.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            className={cn(
                                "flex flex-col p-4 items-center text-gray-400 hover:bg-gray-100 hover:text-gray-800 transition ease-in rounded-xl disabled:hover:bg-white disabled:hover:text-gray-400",
                                selectedMood === id ? "text-amber-700 hover:text-amber-700 disabled:hover:text-amber-700" : ""
                            )}
                            onClick={() => handleMoodSelect(id)}
                            disabled={isSaving}
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
