'use client';

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import dynamic from "next/dynamic";
import { editComment } from "@/action/project.actions";
import { useRouter } from "next/navigation";

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});

const EditCommentForm = ({ id, note }) => {
    const [state, formAction, isPending] = useActionState(editComment, {})
    const [editOpen, setEditOpen] = useState(false);
    const [value, setValue] = useState("");
    const router = useRouter();
    const contentRef = useRef(null);

    const handleClick = () => {
        setEditOpen(true);
    }

    useEffect(() => {
        if (state?.success) {
            window.location.reload();
        }
    }, [state])
    return (
        <>
            <Button onClick={handleClick}>Edit Comment</Button>

            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form action={formAction}>
                        <DialogHeader>
                            <DialogTitle>Edit comment</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 mt-4">
                            <div className="grid gap-3">
                                <Label>Comment</Label>
                                <JoditEditor
                                    ref={contentRef}
                                    value={value}
                                    tabIndex={1}
                                    onBlur={newContent => setValue(newContent)}
                                    onChange={(newContent) => setValue(newContent)}
                                />
                                <input type="hidden" name="commentText" value={value} />
                                <input type="hidden" name="commentId" value={id} />
                            </div>
                        </div>
                        <DialogFooter className={'mt-2'}>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button disabled={isPending} type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default EditCommentForm