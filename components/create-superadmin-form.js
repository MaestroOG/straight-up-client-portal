'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { useActionState, useState, useEffect } from "react";
import { createSuperAdmin } from "@/action/admin.actions";

const CreateSuperAdminForm = ({ users }) => {
    const [value, setValue] = useState("");
    const [state, formAction, isPending] = useActionState(createSuperAdmin, {});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (state?.success || state?.message) {
            setOpen(true);
        }
    }, [state])
    return (
        <>
            <form action={formAction} className="mt-6">
                <Select value={value} onValueChange={setValue}>
                    <SelectTrigger className="w-3xl">
                        <SelectValue placeholder="Select User" />
                    </SelectTrigger>
                    <SelectContent>
                        {users?.length === 0 && <p className="text-center p-2">No Users To Assign Roles</p>}
                        {users?.length > 0 && users?.map(user => (
                            <SelectItem key={user?._id} value={user?._id}>{user?.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <input type="hidden" name="user" value={value} />

                <Button type="submit" disabled={isPending || !value} className="mt-4">Assign SuperAdmin Role</Button>
            </form>
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogContent className='bg-white'>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? 'Success ✅' : 'Error ⚠️'}
                        </DialogTitle>
                        <DialogDescription>{state.message}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button>
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateSuperAdminForm