'use client';

import { useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createManager } from "@/action/admin.actions";
import { yourProjects } from "@/constants";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import Image from "next/image";

const CreateManagerForm = ({ users }) => {
    const [value, setValue] = useState("");
    const [serviceValue, setServiceValue] = useState("");
    const [state, formAction, isPending] = useActionState(createManager, {});
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (state.success) {
            setOpen(true)
        }
    }, [state])
    return (
        <>
            <form action={formAction} className="mt-4 flex flex-col gap-4">
                <div className="grid gap-2">
                    <Label htmlFor='user'>Select User</Label>
                    <Select value={value} onValueChange={setValue}>
                        <SelectTrigger className="w-3xl">
                            <SelectValue placeholder="Select User" />
                        </SelectTrigger>
                        <SelectContent className={'max-w-3xl'}>
                            {users?.length === 0 && <p className="text-center p-2">No Users To Assign Roles</p>}
                            {users?.length > 0 && users?.map(user => (
                                <>
                                    <SelectItem key={user?._id} value={user?._id}>{user?.name} - {user?.companyName}</SelectItem>
                                </>
                            ))}
                        </SelectContent>
                    </Select>
                    <input type="hidden" name='userId' value={value} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor='user'>Select Service</Label>
                    <Select value={serviceValue} onValueChange={setServiceValue}>
                        <SelectTrigger className="w-3xl">
                            <SelectValue placeholder="Select Service" />
                        </SelectTrigger>
                        <SelectContent className={'max-w-3xl'}>
                            {yourProjects.map(project => (
                                <>
                                    <SelectItem key={project.projectTitle} value={project.projectTitle}>{project.projectTitle}</SelectItem>
                                </>
                            ))}
                        </SelectContent>
                    </Select>
                    <input type="hidden" name='service' value={serviceValue} />
                </div>
                <Button disabled={isPending} type='submit' className={'max-w-3xl'}>Assign Role</Button>
            </form>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader className={'flex items-center justify-center flex-col gap-3'}>
                        <DialogTitle><Image width={100} height={100} src={'/check-circle.svg'} alt="check-circle" /></DialogTitle>
                        <DialogDescription className={'text-lg'}>
                            {state?.message}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateManagerForm