'use client';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "./ui/card";
import { useActionState } from "react";
import { resetandChangePassword } from "@/action/userRecovery";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

const ResetPasswordForm = ({ email }) => {
    const [state, formAction, isPending] = useActionState(resetandChangePassword.bind(null, email), {})
    return (
        <>
            <form action={formAction}>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input name="password" id="password" type="password" required />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 mt-4">
                    <Button disabled={isPending} type="submit" className="w-full">
                        Change Password
                    </Button>
                </CardFooter>
            </form>
            <Dialog open={!!state.message} onOpenChange={() => window.location.replace('/login')} className='bg-white'>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? 'Message 💌' : 'Error ⚠️'}
                        </DialogTitle>
                        <DialogDescription>{state?.message}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => window.location.replace('/login')}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ResetPasswordForm