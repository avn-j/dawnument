import { z } from "zod";
import { tiptapContentSchema } from "./tiptapSchemas";

const moods = ["angry", "sad", "anxious", "Unsure", "neutral", "happy", "motivated", "grateful", "excited"];

export const journalEntrySchema = z.object({
    title: z.string().min(1, "Title is required.").max(50, "Title is too long."),
    content: tiptapContentSchema,
    tags: z.string().optional(),
    mood: z
        .string()
        .min(1, "Please select a mood.")
        .refine((mood) => moods.includes(mood)),
    date: z.date(),
});
