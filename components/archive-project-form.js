'use client';

import { Button } from '@/components/ui/button'
import { useState, useEffect, useActionState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { archiveProject } from '@/action/project.actions';

const ArchiveProjectForm = ({ projectId }) => {


    const [confirmOpen, setConfirmOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(archiveProject, {});
    const handleOpenClick = () => {
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
            <Button onClick={handleOpenClick}>Archive Project</Button>
            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form action={formAction}>
                        <input type='hidden' name='projectId' value={projectId} />
                        <DialogHeader>
                            <DialogTitle>Archive project</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to archive this project?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className={'mt-5'}>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button disabled={isPending} type="submit">Yes, Archive</Button>
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

export default ArchiveProjectForm