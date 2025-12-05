'use client';

import { Button } from '@/components/ui/button'
import { useActionState, useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import { deleteProject } from '@/action/admin.actions';
import { useRouter } from 'next/navigation';
import { Trash } from 'lucide-react';

const ProjectDeleteForm = ({ id }) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(deleteProject, {});
    const router = useRouter();

    const handleClick = () => {
        setDeleteOpen(true);
    }

    useEffect(() => {
        if (state?.success) {
            setDeleteOpen(false);
            setOpen(true);
            router.replace('/projects');
        }
    }, [state, router]);
    return (
        <>
            <Button type='button' aria-label="Delete project" onClick={handleClick}><Trash /></Button>
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent>
                    <form action={formAction}>
                        <input type="hidden" name='projectId' value={id} />
                        <DialogHeader>
                            <DialogTitle>
                                Are you sure you want to delete this project
                            </DialogTitle>
                        </DialogHeader>
                        <DialogFooter className={'mt-5'}>
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
                            {state?.success ? "✅ Success" : "⚠️ Error"}
                        </DialogTitle>
                    </DialogHeader>
                    <p>{state?.message}</p>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProjectDeleteForm