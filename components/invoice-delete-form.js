'use client';

import { Trash } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { useActionState, useState } from 'react';
import { deleteInvoice } from '@/action/invoice.actions';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";

const InvoiceDeleteForm = ({ invoiceId }) => {
    const [open, setOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(deleteInvoice, {});

    const handleClick = () => {
        setOpen(true)
    }

    return (
        <>
            <Button onClick={handleClick} type='button'><Trash /></Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <form action={formAction}>
                        <input type="hidden" name={'invoiceId'} value={invoiceId} />
                        <DialogHeader>
                            <DialogTitle>
                                Are you sure you want to delete this invoice
                            </DialogTitle>
                        </DialogHeader>
                        <DialogFooter className={'mt-5'}>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button disabled={isPending} type="submit">Yes, Delete</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default InvoiceDeleteForm