"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PROMPTS } from "@/lib/consts";
import { IconCheck, IconMessageQuestion, IconRefresh } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface PromptGeneratorProps {
    isSaving: boolean;
    onSelectPrompt: (prompt: string) => void;
}

export default function PromptGeneratorButton({ isSaving, onSelectPrompt }: PromptGeneratorProps) {
    const [prompt, setPrompt] = useState("");
    const [promptUsed, setPromptUsed] = useState(false);

    useEffect(() => {
        setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
    }, []);

    const refreshPrompt = () => {
        setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
        setPromptUsed(false);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" disabled={isSaving}>
                    <IconMessageQuestion />
                    Prompt me
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-6">
                ✨ <b className="text-sm text-gray-900">Prompt suggestion</b> ✨<p className="text-xs leading-relaxed mt-2 text-gray-800">{prompt}</p>
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
    );
}
