'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { useActionState } from "react"
import { changeFirstLogin } from "@/action/user"

const NewLoginDialog = ({ userId, firstLogin }) => {
    const [state, formAction, isPending] = useActionState(changeFirstLogin.bind(null, userId), {})
    return (
        <Dialog open={firstLogin}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Welcome to Straight Up Digital Client Portal</DialogTitle>
                    <DialogDescription>
                        <form action={formAction} className="flex flex-col gap-2">
                            <p>Please watch the introduction video to find out how to use the portal</p>
                            <Button type='submit' disabled={isPending}>Watch Video</Button>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default NewLoginDialog