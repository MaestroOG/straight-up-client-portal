'use client';

import { useActionState, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "./ui/button";
import { addIntroText } from "@/action/profile.actions";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});


const CreateIntroTextForm = () => {
    const [state, formAction, isPending] = useActionState(addIntroText, {});
    const [value, setValue] = useState("");
    const contentRef = useRef(null);

    const [open, setOpen] = useState(false)


    useEffect(() => {
        if (state.success || state.message) {
            setOpen(true);
        }
    }, [state]);

    return (
        <>
            <form action={formAction}>
                <JoditEditor
                    ref={contentRef}
                    value={value}
                    tabIndex={1}
                    onBlur={newContent => setValue(newContent)}
                />

                <input type="hidden" name="introText" id="introText" value={value} />
                <Button disabled={isPending} type="submit" className={'mt-4'}>Save Intro Text</Button>
            </form>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? "✅ Success" : "⚠️ Error"}
                        </DialogTitle>
                    </DialogHeader>
                    <p>{state.message}</p>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateIntroTextForm