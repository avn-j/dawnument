import { z } from "zod";

// Mark Schema (bold, italic, underline, etc.)
const markSchema = z.object({
    type: z.enum(["bold", "italic", "underline", "strike", "code"]),
});

// Text Node Schema (with optional marks)
const textNodeSchema = z.object({
    type: z.literal("text"),
    text: z.string().min(1), // Ensure text is not empty
    marks: z.array(markSchema).optional(), // Allow formatting marks
});

// Paragraph Schema
const paragraphSchema = z.object({
    type: z.literal("paragraph"),
    content: z.array(textNodeSchema).optional(),
});

// Full Tiptap Content Schema
export const tiptapContentSchema = z.object(
    {
        type: z.literal("doc"),
        content: z
            .array(z.union([textNodeSchema, paragraphSchema]))
            .min(1)
            .refine((content) => content.some((node) => node.type === "paragraph" && node.content?.some((innerNode) => innerNode.text?.trim() !== "")), {
                message: "Your journal entry must contain meaningful text (not just empty paragraphs)",
            }),
    },
    { message: "Your journal entry must contain some text" }
);
