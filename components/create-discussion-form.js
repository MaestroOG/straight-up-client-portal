'use client';

import { useActionState, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { createDiscussion } from '@/action/discussions.actions';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const CreateDiscussionForm = () => {
    const [state, formAction, isPending] = useActionState(createDiscussion, {});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (state?.success || state?.message) {
            setOpen(true);
        }
    }, [state])
    return (
        <>
            <form action={formAction} className="grid gap-6">
                {/* Discussion Topic */}
                <div className="grid gap-2">
                    <Label htmlFor="topic">Discussion Topic</Label>
                    <Input
                        id="topic"
                        name="discussionTopic"
                        type="text"
                        placeholder="Enter topic here"
                        className="w-full md:max-w-2xl"
                        required
                    />
                </div>

                {/* Discussion Title */}
                <div className="grid gap-2">
                    <Label htmlFor="title">Discussion Title</Label>
                    <Input
                        id="title"
                        name="discussionTitle"
                        type="text"
                        placeholder="Enter title here"
                        className="w-full md:max-w-2xl"
                        required
                    />
                </div>

                {/* Discussion Subtitle */}
                <div className="grid gap-2">
                    <Label htmlFor="subtitle">Discussion Subtitle</Label>
                    <Input
                        id="subtitle"
                        name="discussionSubtitle"
                        type="text"
                        placeholder="Enter subtitle here"
                        className="w-full md:max-w-2xl"
                        required
                    />
                </div>

                {/* Submit Button */}
                <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full md:max-w-2xl"
                >
                    Create Discussion
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
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateDiscussionForm