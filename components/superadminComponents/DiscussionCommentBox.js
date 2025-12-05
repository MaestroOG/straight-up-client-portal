'use client';

import { useActionState, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { addOpinion } from "@/action/discussions.actions";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});


const DiscussionCommentBox = ({ id }) => {

    const [value, setValue] = useState("");
    const contentRef = useRef(null);

    const [state, formAction, isPending] = useActionState(addOpinion, {});
    return (
        <>
            <form action={formAction} className='mt-6 grid gap-3 max-w-3xl'>
                <Label className='text-heading' htmlFor="note">Add an opinion</Label>
                <JoditEditor
                    ref={contentRef}
                    value={value}
                    tabIndex={1}
                    onBlur={newContent => setValue(newContent)}
                    onChange={newContent => { }}
                />
                <input type="hidden" name="opinion" value={value} />
                <input type="hidden" name="discussionId" value={id} />
                <Button disabled={isPending} type="submit">Send</Button>
                {state?.message && <p className={`text-${state.success ? 'green' : 'red'}`}>{state.message}</p>}
            </form>
        </>
    )
}

export default DiscussionCommentBox