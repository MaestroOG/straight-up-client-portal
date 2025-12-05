'use client';

import { changePassword } from "@/action/profile.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

const ChangePasswordForm = () => {
    const [state, formAction, isPending] = useActionState(changePassword, {})
    return (
        <>
            <form action={formAction} className="grid gap-2">
                <Input type="password" className={'max-w-2xl'} name='oldPassword' placeholder="Enter old password" />
                <Input type={'password'} className={'max-w-2xl'} name='newPassword' placeholder="Enter new password" />
                <Button type='submit' className={'max-w-2xl'} disabled={isPending}>Change password</Button>
            </form>
            <Dialog open={!!state.message} onOpenChange={() => window.location.reload()} className='bg-white'>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? 'Password Updated Successfully 🎉' : 'Error ⚠️'}
                        </DialogTitle>
                        <DialogDescription>{state.message}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => window.location.reload()}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ChangePasswordForm