'use client';

import { deleteResource } from "@/action/admin.actions";
import { Button } from "@/components/ui/button";
import { Trash } from 'lucide-react'
import { useActionState, useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const ResourceDeletionForm = ({ resourceId }) => {
    const initialState = { success: null, message: "" };
    const [open, setOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(deleteResource, initialState)

    useEffect(() => {
        if (state.success !== null) {
            setOpen(true);
        }
    }, [state]);
    return (
        <>
            <form action={formAction}>
                <input type="hidden" value={resourceId} name="resourceId" />
                <Button disabled={isPending} type='submit'><Trash /></Button>
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

export default ResourceDeletionForm