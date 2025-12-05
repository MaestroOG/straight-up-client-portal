'use client';

import { useRouter } from "next/navigation"
import { useActionState, useTransition } from "react"
import { Button } from "./ui/button"
import { markAllOpinionsAsRead } from "@/action/discussions.actions";

export default function MarkAllReadButton({ discussionId, userId }) {
    const [state, formAction, isPending] = useActionState(markAllOpinionsAsRead, {});

    return (
        <form action={formAction}>
            <input type="hidden" name="discussionId" value={discussionId} />
            <input type="hidden" name="userId" value={userId} />
            <Button type='submit' disabled={isPending} variant="outline">
                {isPending ? 'Marking...' : state?.message ? state?.message : 'Mark All as Read'}
            </Button>
        </form>
    )
}