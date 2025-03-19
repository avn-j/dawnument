"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconCheck } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mood } from "./MoodPicker";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

interface SaveButtonDialogProps {
    mood: Mood;
    journalTags: string[];
    setJournalTitle: (title: string) => void;
    handleSave: () => void;
    isSaving: boolean;
}

export default function SaveButtonDialog({ mood, journalTags, setJournalTitle, handleSave, isSaving }: SaveButtonDialogProps) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setJournalTitle(e.target.value);
        setTitle(e.target.value);
    };

    const handleCreateEntry = () => {
        if (title === "") {
            setError("Title must be entered");
            return;
        }

        if (title.length > 50) {
            setError("Title must not be longer than 50 characters");
            return;
        }

        setJournalTitle(title);
        setIsOpen(false);
        handleSave();
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" disabled={isSaving}>
                    <IconCheck />
                    {isSaving ? "Saving..." : "Save"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Save Journal Entry</DialogTitle>
                    <DialogDescription>Please enter a title for your journal entry to create entry.</DialogDescription>
                    <Input value={title} onChange={handleTitleChange} />
                    {error && <span className="text-red-500 text-xs">{error}</span>}
                    <div className="grid grid-cols-2 mt-2">
                        <div>
                            <span className="text-xs font-bold">Journal Tags</span>
                            <div className="mt-1 flex gap-2">
                                {journalTags.length === 0 ? (
                                    <p className="text-xs text-gray-600">No tags added</p>
                                ) : (
                                    journalTags.map((tag, index) => (
                                        <div key={index} className="bg-gray-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                                            {tag}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div>
                            <span className="text-xs font-bold">Current mood</span>
                            <div className="flex gap-1 items-center">
                                <mood.icon size={20} />
                                <span className="text-sm">{mood.label}</span>
                            </div>
                        </div>
                    </div>
                    <Separator className="mt-4" />
                    <DialogFooter className="">
                        <Button onClick={handleCreateEntry}>Create entry</Button>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
