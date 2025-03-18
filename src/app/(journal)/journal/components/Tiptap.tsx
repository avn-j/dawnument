"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import { IconBold, IconItalic, IconStrikethrough } from "@tabler/icons-react";

interface TipTapProps {
    prompt: string;
}

const Tiptap = ({ prompt }: TipTapProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Start writing here...",
            }),
        ],
        immediatelyRender: false,
    });

    useEffect(() => {
        if (editor) {
            editor.commands.focus("end");
        }
    }, [editor]);

    useEffect(() => {
        if (prompt && editor) {
            editor.commands.insertContent(`<b>${prompt}</b>`);
            editor.commands.focus();
        }
    }, [prompt]);

    if (!editor) return null;

    return (
        <>
            {editor && (
                <BubbleMenu editor={editor} className="bg-white border shadow-lg p-2 rounded-lg flex gap-2">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`p-2 rounded ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
                    >
                        <IconBold size={16} />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`p-2 rounded ${editor.isActive("italic") ? "bg-gray-300" : ""}`}
                    >
                        <IconItalic size={16} />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={`p-2 rounded ${editor.isActive("strike") ? "bg-gray-300" : ""}`}
                    >
                        <IconStrikethrough size={16} />
                    </button>
                </BubbleMenu>
            )}

            <EditorContent editor={editor} className="w-1/2 text-2xl" />
        </>
    );
};

export default Tiptap;
