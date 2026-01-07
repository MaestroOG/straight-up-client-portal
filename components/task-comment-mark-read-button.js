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
        </form>
    )
}

export default TaskCommentMarkReadButton