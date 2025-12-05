'use client';

import Container from './dashboardComponents/Container'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useActionState, useEffect, useState } from 'react';
import { addResourceCategory } from '@/action/admin.actions';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const CreateResourceCategoryForm = () => {
    const [state, formAction, isPending] = useActionState(addResourceCategory, {});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (state?.success || state?.message) {
            setOpen(true);
        }
    }, [state]);
    return (
        <Container className="bg-white p-2 md:p-4">
            <form
                action={formAction}
                className="grid gap-4 w-full max-w-2xl max-sm:mx-auto"
            >
                {/* Category Name */}
                <div className="grid gap-2">
                    <Label htmlFor="name">Category Name</Label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter category name"
                        className="w-full"
                        required
                    />
                </div>

                {/* Description */}
                <div className="grid gap-2">
                    <Label htmlFor="description">Category Description (optional)</Label>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="Enter category description"
                        className="w-full min-h-[100px]"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full sm:w-auto mt-2"
                >
                    Create Category
                </Button>
            </form>

            {/* Dialog for feedback */}
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
        </Container>

    )
}

export default CreateResourceCategoryForm