'use client';
import { Label } from "@/components/ui/label"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useActionState, useEffect, useState } from "react";
import { editPackageAmount } from "@/action/admin.actions";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const EditPackageForm = ({ projectId, projectDetails }) => {
    const [state, formAction, isPending] = useActionState(editPackageAmount, {});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (state?.message || state?.success) {
            setOpen(true);
        }
    }, [state])
    return (
        <>
            <form action={formAction} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="packageSelected">Edit Package Amount</Label>
                    <Input className={'max-w-2xl'} id="packageSelected" name='packageSelected' type="number" defaultValue={projectDetails?.packageSelected.slice(1, projectDetails?.packageSelected.length) || ''} />
                </div>

                <input type="hidden" name='projectId' value={projectId} />

                <Button disabled={isPending} className={'max-w-2xl'} type="submit">Save Changes</Button>
            </form>

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

export default EditPackageForm