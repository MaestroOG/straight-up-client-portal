'use client';

import { useActionState, useEffect, useState } from 'react';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import Container from './dashboardComponents/Container';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import createAudit from '@/action/audits.actions';

const CreateAuditForm = ({ partners, user, service, fields }) => {
    const [value, setValue] = useState("");
    const [state, formAction, isPending] = useActionState(createAudit, {});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (state?.success || state?.message) {
            setOpen(true);
        }
    }, [state])
    return (
        <>
            {service && <>
                <Container className={'bg-white rounded-lg p-3 md:p-4'}>
                    <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="hidden" name="service" value={service} />

                        {user?.role === 'superadmin' && <div className="flex flex-col gap-2">
                            <Label className="block font-medium">
                                For Which Partner<span className="text-red-500">*</span>
                            </Label>
                            <Select value={value}
                                onValueChange={(val) => setValue(val)}>
                                <SelectTrigger className={'border border-gray-300 w-full'}>
                                    <SelectValue placeholder="Select Partner" />
                                </SelectTrigger>
                                <SelectContent>
                                    {partners?.map(partner => (
                                        <SelectItem key={partner._id} value={partner?._id}>{partner?.companyName}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <input type="hidden" name="partnerId" value={value} />
                        </div>}

                        <div className="flex flex-col gap-2">
                            <Label className="block font-medium">
                                Audit Title <span className="text-red-500">*</span> (Your Reference ID For This Audit)
                            </Label>
                            <Input
                                type="text"
                                name="auditTitle"
                                required
                                className="border border-gray-300"
                            />
                        </div>


                        {fields?.map((field) => (
                            <>
                                <div key={field.name} className="flex flex-col gap-2">
                                    <Label className="block font-medium">
                                        {field.label}{" "}
                                        {field.required && <span className="text-red-500">*</span>}
                                    </Label>

                                    {field.type === "textarea" ? (
                                        <Textarea
                                            name={field.name}
                                            required={field.required}
                                            className="border border-gray-300"
                                        />
                                    ) : (
                                        <Input
                                            type={field.type}
                                            name={field.name}
                                            required={field.required}
                                            className="border border-gray-300"
                                        />
                                    )}
                                </div>
                            </>
                        ))}

                        {service && <Button key={service} disabled={isPending} type="submit">Submit</Button>}

                    </form>

                    <Dialog open={open} onOpenChange={setOpen} className='bg-white'>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {state?.success ? 'Audit Request Sent 🎉' : 'Error ⚠️'}
                                </DialogTitle>
                                <DialogDescription>{state?.message}</DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button onClick={() => setOpen(false)}>
                                    Close
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </Container>
            </>
            }
        </>
    )
}

export default CreateAuditForm