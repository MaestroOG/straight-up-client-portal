'use client';

import { Trash } from 'lucide-react'
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { deleteCategory } from '@/action/admin.actions';
import { useActionState, useEffect, useState } from 'react';

const DeleteCategoryForm = ({ categoryId }) => {
    const [state, formAction, isPending] = useActionState(deleteCategory, {});
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setDeleteOpen(true)
    }

    useEffect(() => {
        if (state?.success || state?.message) {
            setDeleteOpen(false);
            setOpen(true);
        }
    }, [state])
    return (
        <>
            <Button onClick={handleClick} variant="destructive" size="sm"><Trash /></Button>
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent>
                    <form action={formAction}>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently remove the category.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className={'mt-4'}>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button disabled={isPending} type="submit">Delete</Button>
                        </DialogFooter>
                        <input type="hidden" name='categoryId' value={categoryId} />
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state?.success ? 'Deleted Category 🚮' : 'Error ⚠️'}
                        </DialogTitle>
                        <DialogDescription>{state?.message}</DialogDescription>
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

export default DeleteCategoryForm