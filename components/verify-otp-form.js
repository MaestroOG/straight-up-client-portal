"use client"

import React, { useActionState, useEffect, useState } from "react"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { verifyOtpAndLogin } from "@/action/user";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";

export function VerifyOTPForm() {
    const [value, setValue] = useState("");
    const [state, formAction, isPending] = useActionState(verifyOtpAndLogin, {})

    useEffect(() => {
        if (value.length === 6) {
            // create FormData and submit
            const formData = new FormData();
            formData.append("otp", value);
            formAction(formData); // ✅ triggers the server action
        }
    }, [value, formAction]);

    return (
        <>
            <form id="otpForm" action={formAction} className="space-y-2">
                <InputOTP
                    maxLength={6}
                    value={value}
                    onChange={(value) => setValue(value)}
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
                <div className="text-center text-sm">
                    <>Enter your one-time password.</>
                </div>
            </form>

            {state?.message && <Dialog open={!!state.message} onOpenChange={() => window.location.reload()} className='bg-white'>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {!state.success ? 'Error ⚠️' : null}
                        </DialogTitle>
                        <DialogDescription>{state.message}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => window.location.reload()}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>}
        </>
    )
}
