'use client';

import { Pencil } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Suspense, useActionState, useEffect, useRef, useState } from 'react';
import dynamic from "next/dynamic"
import { editInvoice } from '@/action/invoice.actions';
const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});

const InvoiceEditForm = ({ invoice }) => {
    const [value, setValue] = useState("");
    const [editOpen, setEditOpen] = useState(false);
    const [status, setStatus] = useState("");
    const contentRef = useRef(null);
    const [state, formAction, isPending] = useActionState(editInvoice, {});
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setEditOpen(true);
    }

    useEffect(() => {
        if (state?.success || state?.message) {
            setEditOpen(false);
            setOpen(true);
        }
    }, [state])
    return (
        <>
            <Button onClick={handleClick}><Pencil /></Button>

            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Invoice</DialogTitle>
                        <DialogDescription>
                            Make changes to your invoice here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <form action={formAction}>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
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
                            <div className="grid gap-3">
                                <Suspense fallback={<p className="p-4 text-center">Loading...</p>}>
                                    <JoditEditor
                                        ref={contentRef}
                                        value={value}
                                        tabIndex={1}
                                        onBlur={newContent => setValue(newContent)}
                                        onChange={newContent => { }}
                                    />
                                </Suspense>
                            </div>
                        </div>
                        <DialogFooter className={'mt-4'}>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button disabled={isPending} type="submit">Save changes</Button>
                        </DialogFooter>

                        <input type="hidden" name="status" value={status} />
                        <input type="hidden" name="details" value={value} />
                        <input type="hidden" name='invoiceId' value={invoice?._id} />
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? "✅ Success" : "⚠️ Error"}
                        </DialogTitle>
                    </DialogHeader>
                    <p>{state.message}</p>
                    <div className="flex justify-end mt-4">
                        <Button onClick={() => setOpen(false)}>Close</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default InvoiceEditForm