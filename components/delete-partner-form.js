'use client';

import { useActionState, useState } from 'react'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { deletePartner } from '@/action/partner.actions'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

const DeletePartnerForm = ({ userId }) => {
    const [state, formAction, isPending] = useActionState(deletePartner, {})
    const [openConfirm, setOpenConfirm] = useState(false)
    const [checked, setChecked] = useState(false)
    return (
        <>
            <Button onClick={() => setOpenConfirm(true)} disabled={isPending} type='button' variant="secondary">
                <Trash
                    size={24}
                    alt="view"
                />
            </Button>

            <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this partner? This action cannot
                            be undone.

                            <div className="flex items-center gap-3 mt-4">
                                <Checkbox checked={checked}
                                    onCheckedChange={(value) => setChecked(value)}
                                    name='sendFinalEmail'
                                    id="sendFinalEmail"

                                />
                                <Label htmlFor="sendFinalEmail">Send partnership ending email</Label>
                            </div>

                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="secondary"
                            onClick={() => setOpenConfirm(false)}
                        >
                            Cancel
                        </Button>
                        <form action={formAction}>
                            <input type="hidden" name="userId" value={userId} />
                            <input type="hidden" name='sendFinalEmail' value={checked} />
                            <Button type="submit" disabled={isPending} className="bg-red-600">
                                {isPending ? "Deleting..." : "Yes, Delete"}
                            </Button>
                        </form>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {state.message && <Dialog open onOpenChange={() => { }} className='bg-white'>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? 'Deleted Partner 🚮' : 'Error ⚠️'}
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

export default DeletePartnerForm
