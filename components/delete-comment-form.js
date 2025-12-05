'use client';

import { deleteComment } from "@/action/project.actions"
import { useActionState, useEffect } from "react"
import { Button } from "./ui/button";


const DeleteCommentForm = ({ id }) => {
    const [state, formAction, isPending] = useActionState(deleteComment, {});


    useEffect(() => {
        if (state?.success) {
            window.location.reload();
        }
    }, [state]);
    return (
        <>
            <form className="w-full" action={formAction}>
                <input type="hidden" name="commentId" value={id} />
                <Button className={'w-full'} type='submit' disabled={isPending}>Delete Comment</Button>
            </form>
        </>
    )
}

export default DeleteCommentForm