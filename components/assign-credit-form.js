'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useActionState, useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button"
import { assignCredit } from "@/action/partner.actions"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";


const AssignCreditForm = ({ users }) => {
    const [value, setValue] = useState("");
    const [state, formAction, isPending] = useActionState(assignCredit, {});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (state?.success || state?.message) {
            setOpen(true);
        }
    }, [state])
    return (
        <>
            <form action={formAction} className="grid gap-4 w-full max-w-2xl mx-auto">
                {/* Partner Select */}
                <div className="grid gap-2">
                    <Label htmlFor="partner">Select Partner</Label>
                    <Select value={value} onValueChange={setValue}>
                        <SelectTrigger id="partner" className="w-full">
                            <SelectValue placeholder="Select Partner" />
                        </SelectTrigger>
                        <SelectContent>
                            {users?.map((user) => (
                                <SelectItem key={user?._id} value={user?._id}>
                                    {user?.companyName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Credit Input (conditional) */}
                {value && (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="creditValue">Credit Amount</Label>
                            <Input
                                type="number"
                                id="creditValue"
                                name="creditValue"
                                className="w-full"
                                min="0.01"
                                step="0.01"
                                required
                                placeholder="Enter credit amount"
                            />
                        </div>

                        <input type="hidden" name="partnerId" value={value} />

                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full sm:w-auto"
                        >
                            Assign Credit
                        </Button>
                    </>
                )}
            </form>


            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? "✅ Success" : "⚠️ Error"}
                        </DialogTitle>
                    </DialogHeader>
                    <p>{state.message}</p>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AssignCreditForm