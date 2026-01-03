'use client'

import { useActionState, useEffect, useState } from 'react';
import { Button } from './ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { deleteAudit } from '@/action/project.actions';

const DeleteAuditForm = ({ user, id }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const [state, formAction, isPending] = useActionState(deleteAudit, {});

    const handleClick = () => {
        setConfirmOpen(true);
    }

    useEffect(() => {
        if (state?.success || state?.message) {
            setConfirmOpen(false);
            setOpen(true);
        }
    }, [state])
    return (
        <>
            <Button onClick={handleClick} variant="destructive">Delete Audit</Button>

            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent>
                    <form action={formAction}>
                        <input type="hidden" name='auditId' value={id} />
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to delete this audit?</DialogTitle>
                            <DialogDescription>
                                All the changes made will be irreversible.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className={'mt-4'}>
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
                            {state.success ? 'Deleted Task 🚮' : 'Error ⚠️'}
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

export default DeleteAuditForm