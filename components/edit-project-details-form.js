'use client';

import { useActionState, useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { editProjectDetails } from "@/action/project.actions";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

const EditProjectDetailForm = ({ projectDetails, fields }) => {
    const [state, formAction, isPending] = useActionState(editProjectDetails, {});
    const [formValues, setFormValues] = useState(() => ({
        ...projectDetails.fields,
    }));
    const router = useRouter();
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (state?.success) {
            setOpen(true);

            const timer = setTimeout(() => {
                router.push(`/projects/${projectDetails?._id}`);
            }, 2000);

            return () => clearTimeout(timer);
        }

        if (state?.message && !state?.success) {
            setOpen(true);
        }
    }, [state, router]);

    return (
        <>
            <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field) => (
                    <div key={field.name} className="grid gap-2">
                        <Label>{field.label}</Label>

                        {field.type === "textarea" ? (
                            <Textarea
                                value={formValues[field.name] || ""}
                                onChange={(e) =>
                                    setFormValues(prev => ({
                                        ...prev,
                                        [field.name]: e.target.value,
                                    }))
                                }
                            />
                        ) : (
                            <Input
                                type={field.type}
                                value={formValues[field.name] || ""}
                                onChange={(e) =>
                                    setFormValues(prev => ({
                                        ...prev,
                                        [field.name]: e.target.value,
                                    }))
                                }
                            />
                        )}
                    </div>
                ))}

                <input
                    type="hidden"
                    name="fields"
                    value={JSON.stringify(formValues)}
                />
                <input type="hidden" name="projectId" value={projectDetails?._id} />

                <Button type="submit" disabled={isPending} className="mt-4 col-span-1 md:col-span-2">{isPending ? "Saving..." : "Save Changes"}</Button>
            </form>

            <Dialog open={open} onOpenChange={setOpen} className='bg-white'>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? 'Project Edited 🎉' : 'Error ⚠️'}
                        </DialogTitle>
                        <DialogDescription>{state.message}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default EditProjectDetailForm