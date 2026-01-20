'use client';

import { useActionState, useEffect, useRef, useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { addNote } from "@/action/project.actions";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const NoteBox = ({ user, id, onNewNote }) => {
    const [state, formAction, isPending] = useActionState(addNote.bind(null, id), {});
    const [hiddenValue, setHiddenValue] = useState("");
    const [editorKey, setEditorKey] = useState(0);

    // Use a ref to store content without triggering re-renders while typing
    const contentRef = useRef("");

    // Memoize config so it doesn't trigger Jodit re-renders
    const config = useMemo(() => ({
        statusbar: false,
        placeholder: "Write your comment here...",
        // Add any other config here
    }), []);

    useEffect(() => {
        if (state?.success && state?.note) {
            onNewNote(state.note);
            contentRef.current = ""; // Clear ref
            setEditorKey(k => k + 1); // Reset editor
        }
    }, [state, onNewNote]);

    return (
        <form action={formAction} className='mt-6 grid gap-3 max-w-3xl max-sm:max-w-[435px]'>
            <Label className='text-heading' htmlFor="note">Add a Comment</Label>

            <JoditEditor
                key={editorKey}
                config={config}
                onBlur={newContent => setHiddenValue(newContent)} // Only syncs when you stop typing/click away
                onChange={newContent => {
                    contentRef.current = newContent; // Keeps data ready for submission
                }}
            />
            <input type="hidden" name="commentText" value={hiddenValue || contentRef.current} />
            <Button disabled={isPending} onClick={() => setHiddenValue(contentRef.current)} type="submit">Send</Button>

            {state?.message && (
                <p className={state.success ? "text-green-600" : "text-red-600"}>
                    {state.message}
                </p>
            )}
        </form>
    );
};

export default NoteBox;