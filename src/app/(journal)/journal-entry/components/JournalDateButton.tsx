"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DateTime } from "luxon";
import { useEffect } from "react";

interface JournalDateButtonProps {
    isSaving: boolean;
    journalDate: Date | undefined;
    setJournalDate: (date: Date | undefined) => void;
}

export default function JournalDateButton({ isSaving, journalDate, setJournalDate }: JournalDateButtonProps) {
    useEffect(() => {
        setJournalDate(new Date());
    }, []);

    return (
        <Popover>
            <PopoverTrigger asChild>
                {journalDate && (
                    <Button
                        variant="ghost"
                        title="Change date of journal entry"
                        className={cn("justify-start text-left font-medium text-lg text-gray-900", !journalDate && "text-muted-foreground")}
                        disabled={isSaving}
                    >
                        {journalDate ? DateTime.fromJSDate(journalDate).toFormat("DDDD") : <span>Pick a date</span>}
                    </Button>
                )}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={journalDate} onSelect={setJournalDate} initialFocus toDate={new Date()} />
            </PopoverContent>
        </Popover>
    );
}
