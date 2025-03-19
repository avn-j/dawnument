import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IconPlus, IconTagsFilled } from "@tabler/icons-react";
import { useState } from "react";

interface JournalTagAdderProps {
    isSaving: boolean;
    setJournalTags: (tags: string[]) => void;
    addedTags: string[];
}

export default function JournalTagAdder({ isSaving, setJournalTags, addedTags }: JournalTagAdderProps) {
    const [error, setError] = useState("");
    const [tags, setTags] = useState("");

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
            .split(",")
            .map((tag) => tag.trim());
        setTags("");
        const tagsUnique = [...new Set([...addedTags, ...tagsArray])];

        if (tagsUnique.some((tag) => tag.length > 30)) {
            setError("A single tag cannot be longer than 30 characters");
            return;
        }

        if (tagsUnique.length > 5) {
            setError("Cannot use more than 5 tags in a journal entry.");
            return;
        }

        setJournalTags(tagsUnique);
    };
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" disabled={isSaving}>
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
                <p className="text-xs text-gray-500 mt-2">Tip: Add multiple tags by separating with commas. Eg. thoughts, reflection, travel</p>
            </PopoverContent>
        </Popover>
    );
}
