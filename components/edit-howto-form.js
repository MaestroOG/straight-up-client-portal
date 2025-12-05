'use client';

import { Pencil } from 'lucide-react';
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { editHowToVideo } from '@/action/admin.actions';


const EditHowToForm = ({ video }) => {
    const [editOpen, setEditOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(editHowToVideo, {});

    const handleClick = () => {
        setEditOpen(true);
    }

    useEffect(() => {
        if (state?.message || state?.success) {
            setEditOpen(false);
            setOpen(true);
        }
    }, [state])
    return (
        <>
            <Button onClick={handleClick}><Pencil /></Button>
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent>
                    <form action={formAction}>
                        <DialogHeader>
                            <DialogTitle>Edit how-to video</DialogTitle>
                            <DialogDescription>
                                Make changes to your video here. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 mt-4">
                            <input type="hidden" name='videoId' value={video?._id} />
                            <div className="grid gap-3">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" defaultValue={video?.title} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="videoLink">Video Link</Label>
                                <Input id="videoLink" name="videoLink" defaultValue={video?.videoLink} />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button disabled={isPending} type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? 'Success ✅' : 'Error ⚠️'}
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

export default EditHowToForm