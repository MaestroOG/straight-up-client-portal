'use client';


import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { addNote } from "@/action/project.actions";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});

const NoteBox = ({ user, id }) => {
    const [state, formAction, isPending] = useActionState(addNote.bind(null, id), {});
    const [value, setValue] = useState("");
    const contentRef = useRef(null);

    useEffect(() => {
        if (state?.success) {
            const newNote = {
                _id: Math.random().toString(36).slice(2),
                note: value,
                createdBy: user,
                createdAt: new Date().toISOString(),
                readBy: [user?._id],
            };
            window.dispatchEvent(new CustomEvent("note-added", { detail: newNote }));
            setValue("");
        }
    }, [state]);
    return (
        <>
            <form action={formAction} className='mt-6 grid gap-3 max-w-3xl max-sm:max-w-[435px]'>
                <Label className='text-heading' htmlFor="note">Add a Comment</Label>
                <JoditEditor
                    ref={contentRef}
                    value={value}
                    tabIndex={1}
                    onBlur={newContent => setValue(newContent)}
                    onChange={(newContent) => setValue(newContent)}
                />
                <input type="hidden" name="commentText" value={value} />
                <Button disabled={isPending} type="submit">Send</Button>
                {state?.message && <p className={`text-${state.success ? 'green' : 'red'}`}>{state.message}</p>}
            </form>
        </>
    )
}

export default NoteBox