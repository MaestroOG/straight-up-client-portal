'use client';

import { getRecoveryEmail } from "@/action/userRecovery";
import { useActionState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button";
import {
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"


const RecoveryEmailForm = () => {
    const [state, formAction, isPending] = useActionState(getRecoveryEmail, {});
    return (
        <>
            <form action={formAction}>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 mt-4">
                    <Button disabled={isPending} type="submit" className="w-full">
                        Receive Recovery Email
                    </Button>
                </CardFooter>
            </form>
            <Dialog open={!!state.message} onOpenChange={() => window.location.reload()} className='bg-white'>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? 'Message 💌' : 'Error ⚠️'}
                        </DialogTitle>
                        <DialogDescription>{state?.message}</DialogDescription>
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

export default RecoveryEmailForm