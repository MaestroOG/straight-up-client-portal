"use client"

import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TabsContent } from "./ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Suspense, useActionState, useEffect, useRef, useState } from "react"
import { createInvoice } from "@/action/invoice.actions"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic"
const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});

const CreateInvoiceForm = ({ partners }) => {
    const [value, setValue] = useState("");
    const [partner, setPartner] = useState("");
    const [status, setStatus] = useState("Pending")
    const contentRef = useRef(null);
    const [open, setOpen] = useState(false)

    const [state, formAction, isPending] = useActionState(createInvoice, {})

    const handleSubmit = (e) => {
        setValue("");
        setPartner("");
    };

    useEffect(() => {
        if (state.success || state.message) {
            setOpen(true);
        }
    }, [state]);
    return (
        <>
            <TabsContent value="add" className="mt-4">
                <Card className="rounded-2xl shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg">New Invoice</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="customer">Partner</Label>
                                <Select value={partner} onValueChange={setPartner}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Partner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {partners.map(partner => (
                                            <SelectItem key={partner._id} value={partner._id}>{partner.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label>Status</Label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger className={'w-full'}>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Paid">Paid</SelectItem>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Suspense fallback={<p className="p-4 text-center">Loading...</p>}>
                                <JoditEditor
                                    ref={contentRef}
                                    value={value}
                                    tabIndex={1}
                                    onBlur={newContent => setValue(newContent)}
                                    onChange={newContent => { }}
                                />
                            </Suspense>
                            <input type="hidden" name="details" value={value} />
                            <input type="hidden" name="partner" value={partner} />
                            <input type="hidden" name="status" value={status} />

                            <Button disabled={isPending} type="submit" className="w-full">Add Invoice</Button>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>
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

export default CreateInvoiceForm