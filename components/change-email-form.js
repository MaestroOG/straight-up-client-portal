'use client';
import { changeEmail } from "@/action/profile.actions";
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

const ChangeEmailForm = ({ email }) => {

    const [state, formAction, isPending] = useActionState(changeEmail, {})

    return (
        <>
            <form action={formAction} className="grid gap-2">
                <Input type="email" className={'max-w-2xl'} name='email' value={email} />
                <Input type={'email'} className={'max-w-2xl'} name='newEmail' placeholder="Enter new email" />
                <Button type='submit' className={'max-w-2xl'} disabled={isPending}>Change email</Button>
            </form>
            <Dialog open={!!state.message} onOpenChange={() => window.location.reload()} className='bg-white'>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? 'Email Updated Successfully 🎉' : 'Error ⚠️'}
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

export default ChangeEmailForm