'use client';

import { useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { addHowToVideo } from "@/action/admin.actions";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const AddHowToVideoForm = () => {
    const [state, formAction, isPending] = useActionState(addHowToVideo, {});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (state?.success || state?.message) {
            setOpen(true)
        }
    }, [state])
    return (
        <>
            <form action={formAction} className="mt-4 grid gap-4 max-w-2xl">
                <div className="grid gap-2">
                    <Label htmlFor="title">Title <span className="text-red">*</span></Label>
                    <Input type={'text'} name='title' />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="title">Video Embed URL <span className="text-red">*</span></Label>
                    <Input type={'url'} name='videoLink' />
                </div>
                <Button disabled={isPending} type='submit'>Add</Button>
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

export default AddHowToVideoForm