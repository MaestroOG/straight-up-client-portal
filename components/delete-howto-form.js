'use client';

import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button'
import { useActionState, useEffect, useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { deleteHowToVideo } from '@/action/admin.actions';

const DeleteHowToForm = ({ videoId }) => {
    const [delOpen, setDelOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(deleteHowToVideo, {});

    const handleClick = () => {
        setDelOpen(true);
    }

    useEffect(() => {
        if (state?.success || state?.message) {
            setDelOpen(false);
            setOpen(true)
        }
    }, [state])
    return (
        <>
            <Button onClick={handleClick}><Trash /></Button>

            <Dialog open={delOpen} onOpenChange={setDelOpen}>
                <DialogContent>
                    <form action={formAction}>
                        <input type="hidden" name='videoId' value={videoId} />
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to delete this video?</DialogTitle>
                            <DialogDescription>
                                All the changes made will be irreversible.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button disabled={isPending} type="submit">Yes, Delete</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? 'Deleted Video 🚮' : 'Error ⚠️'}
                        </DialogTitle>
                        <DialogDescription>{state.message}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button>Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DeleteHowToForm