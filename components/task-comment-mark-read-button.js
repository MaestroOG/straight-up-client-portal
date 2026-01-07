'use client';

import { taskCommentMarkRead } from "@/action/admin.actions";
import { useActionState } from "react";
import { Button } from "./ui/button";

const TaskCommentMarkReadButton = ({ taskId, userId }) => {
    const [state, formAction, isPending] = useActionState(taskCommentMarkRead, {});
    return (
        <form action={formAction}>
            <input type="hidden" name="taskId" value={taskId} />
            <input type="hidden" name="userId" value={userId} />
            <Button type='submit' disabled={isPending} variant="outline">
                {isPending ? 'Marking...' : state?.message ? state?.message : 'Mark All as Read'}
            </Button>
            {state?.error && (
                <p className="text-sm text-red-500 mt-2">{state.error}</p>
            )}
        </form>

    )
}

export default TaskCommentMarkReadButton