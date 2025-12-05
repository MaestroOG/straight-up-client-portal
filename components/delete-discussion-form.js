'use client';

import { Button } from './ui/button'
import { Trash } from 'lucide-react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useActionState, useEffect, useState } from 'react';
import { deleteDiscussion } from '@/action/discussions.actions';

const DeleteDiscussionForm = ({ discussionId }) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(deleteDiscussion, {});

    const handleDeleteClick = () => {
        setDeleteOpen(true);
    }

    useEffect(() => {
        if (state?.success || state?.message) {
            setDeleteOpen(false);
            setOpen(true);
        }
    }, [state])
    return (
        <>
            <Button onClick={handleDeleteClick} size={"sm"}>
                <Trash />
            </Button>

            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form action={formAction}>
                        <input type="hidden" name='discussionId' value={discussionId} />
                        <DialogHeader>
                            <DialogTitle>Delete Discussion</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this discussion.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className={'mt-4'}>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button disabled={isPending} type="submit">Yes, delete</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

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

export default DeleteDiscussionForm