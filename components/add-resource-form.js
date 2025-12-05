'use client';

import { Label } from "@/components/ui/label"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useActionState, useEffect, useState } from "react";
import { addResource } from "@/action/admin.actions";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const AddResourceForm = ({ categories }) => {
    const [open, setOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(addResource, {})
    const [value, setValue] = useState("");

    useEffect(() => {
        if (state.success || state.message) {
            setOpen(true)
        }
    }, [state])
    return (
        <>
            <form
                action={formAction}
                className="bg-white p-4 rounded-lg grid gap-4 w-full max-w-2xl mx-auto mt-2"
            >
                {/* Title */}
                <div className="grid gap-2">
                    <Label htmlFor="title">Resource Title (optional)</Label>
                    <Input
                        className="w-full"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter title"
                    />
                </div>

                {/* Category */}
                <div className="grid gap-2">
                    <Label htmlFor="category">Assign Category</Label>
                    <Select value={value} onValueChange={setValue} name="category">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories?.map((category) => (
                                <SelectItem key={category?._id} value={category?._id}>
                                    {category?.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* File Upload */}
                <div className="grid gap-2">
                    <Label htmlFor="file">Upload File</Label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-3"
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        id="file"
                        name="file"
                    />
                </div>

                {/* OR Divider */}
                <div className="flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">OR</span>
                </div>

                {/* Resource Link */}
                <div className="grid gap-2">
                    <Label htmlFor="resourceLink">Resource Link</Label>
                    <Input
                        className="w-full"
                        type="url"
                        name="resourceLink"
                        id="resourceLink"
                        placeholder="https://example.com/resource"
                    />
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={isPending}
                    className="mt-2 w-full md:w-auto md:self-end"
                >
                    Submit
                </Button>
            </form>


            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? "✅ Success" : "⚠️ Error"}
                        </DialogTitle>
                    </DialogHeader>
                    <p>{state.message}</p>
                    <div className="flex justify-end mt-4">
                        <Button onClick={() => setOpen(false)}>Close</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddResourceForm