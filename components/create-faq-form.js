'use client';

import { createFaq } from "@/action/admin.actions";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { yourProjects } from "@/constants"
import { useActionState, useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const CreateFaqForm = () => {
    const [open, setOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(createFaq, {});

    useEffect(() => {
        if (state?.success || state?.message) {
            setOpen(true);
        }
    }, [state])
    return (
        <>
            <form action={formAction} className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-3">
                    <Label htmlFor="service">Select Service</Label>
                    <Select id="service" name='service'>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Services</SelectLabel>
                                {yourProjects.map((project) => (
                                    <SelectItem
                                        key={project.id}
                                        value={project.projectTitle}
                                    >
                                        {project.projectTitle}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="question">Question</Label>
                    <Input id="question" name="question" type="text" placeholder="Enter the question" />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="answer">Answer</Label>
                    <Input id="answer" name="answer" type="text" placeholder="Enter the answer" />
                </div>

                <Button disabled={isPending} type="submit" className="mt-4 md:col-span-2">{isPending ? "Creating..." : "Create FAQ"}</Button>
            </form>

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

export default CreateFaqForm