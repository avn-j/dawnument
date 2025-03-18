"use client";

import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";
import {
    IconCheck,
    IconHomeFilled,
    IconCalendar,
    IconPencil,
    IconTagsFilled,
    IconMessageQuestion,
    IconRefresh,
    IconPlus,
    IconCross,
    IconX,
} from "@tabler/icons-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { PROMPTS } from "@/lib/consts";
import Link from "next/link";

interface JournalHeaderProps {
    onSelectPrompt: (prompt: string) => void;
    handleSetTags: (tags: string[]) => void;
}

export default function JournalHeader({ onSelectPrompt, handleSetTags }: JournalHeaderProps) {
    const [date, setDate] = useState<Date | undefined>();
    const [prompt, setPrompt] = useState("");
    const [promptUsed, setPromptUsed] = useState(false);
    const [tags, setTags] = useState("");
    const [addedTags, setAddedTags] = useState<string[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        setDate(new Date());
        setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
    }, []);

    const refreshPrompt = () => {
        setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
        setPromptUsed(false);
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        const tagsString = e.target.value;
        setTags(tagsString);
    };

    const handleAddTags = () => {
        if (tags === "") {
            setError("No tags entered.");
            return;
        }

        const tagsArray = tags
            .toLowerCase()
            .split(", ")
            .map((tag) => tag.trim());
        setTags("");
        const tagsUnique = [...new Set([...addedTags, ...tagsArray])];

        if (tagsUnique.length > 5) {
            setError("Cannot use more than 5 tags in a journal entry.");
            return;
        }

        setAddedTags(tagsUnique);
    };

    const handleRemoveTag = (value: string) => {
        setAddedTags(addedTags.filter((tag) => tag !== value));
    };

    return (
        <div className="bg-gray-50 w-full py-6 border-b border-2 grid grid-cols-3 items-center px-8">
            <div>
                <Button asChild>
                    <Link href="/">
                        <IconHomeFilled />
                        Back to home
                    </Link>
                </Button>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-xs text-gray-500">New Journal Entry</h1>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            title="Change date of journal entry"
                            className={cn(
                                "justify-start text-left font-medium text-lg text-gray-900",
                                !date && "text-muted-foreground"
                            )}
                        >
                            {date ? DateTime.fromJSDate(date).toFormat("DDDD") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus toDate={new Date()} />
                    </PopoverContent>
                </Popover>
                {addedTags.length > 0 && (
                    <div className="flex gap-2 mx-auto mt-2">
                        {addedTags.map((tag, index) => (
                            <div
                                key={index}
                                className="bg-gray-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2"
                            >
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
            </div>
            <div className="flex  justify-end gap-2">
                {/* Refactor to move prompts to another component */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">
                            <IconMessageQuestion />
                            Prompt me
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-6">
                        ✨ <b className="text-sm text-gray-900">Prompt suggestion</b> ✨
                        <p className="text-xs leading-relaxed mt-2 text-gray-800">{prompt}</p>
                        <div className="mt-4 flex gap-2">
                            <Button
                                variant="default"
                                size="sm"
                                title="Answer prompt"
                                onClick={() => {
                                    onSelectPrompt(prompt);
                                    setPromptUsed(true);
                                }}
                                disabled={promptUsed}
                            >
                                {!promptUsed ? <IconCheck /> : "Answered"}
                            </Button>
                            <Button variant="outline" size="sm" title="Refresh prompt" onClick={refreshPrompt}>
                                <IconRefresh />
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">
                            <IconTagsFilled />
                            Add tags
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-6">
                        <p className="text-sm leading-relaxed text-gray-800 font-bold">Add tags to journal entry</p>
                        <div className="mt-2 flex gap-2">
                            <Input
                                className="text-[10px]"
                                value={tags}
                                onChange={handleTagChange}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleAddTags();
                                }}
                            />
                            <Button size="sm" title="Refresh prompt" onClick={handleAddTags}>
                                <IconPlus /> Add
                            </Button>
                        </div>
                        {error && <p className="text-xs text-red-500 leading-snug mt-2">{error}</p>}
                        <p className="text-xs text-gray-500 mt-2">
                            Tip: Add multiple tags by separating with commas. Eg. thoughts, reflection, travel
                        </p>
                    </PopoverContent>
                </Popover>

                <Button variant="outline">
                    <IconCheck className="text-green-500" />
                    Save
                </Button>
            </div>
        </div>
    );
}
