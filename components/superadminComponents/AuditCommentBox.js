'use client';

import { useActionState, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import { addAuditComment } from "@/action/project.actions";

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});


const AuditCommentBox = ({ id }) => {

    const [value, setValue] = useState("");
    const contentRef = useRef(null);

    const [state, formAction, isPending] = useActionState(addAuditComment, {});
    return (
        <>
            <form action={formAction} className='mt-6 grid gap-3 max-w-3xl'>
                <Label className='text-heading' htmlFor="note">Add a comment</Label>
                <JoditEditor
                    ref={contentRef}
                    value={value}
                    tabIndex={1}
                    onBlur={newContent => setValue(newContent)}
                    onChange={newContent => { }}
                />
                <input type="hidden" name="auditComment" value={value} />
                <input type="hidden" name="auditId" value={id} />
                <Button disabled={isPending} type="submit">Send</Button>
                {state?.message && <p className={`text-${state.success ? 'green' : 'red'}`}>{state.message}</p>}
            </form>
        </>
    )
}

export default AuditCommentBox