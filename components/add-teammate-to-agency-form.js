'use client';

import { useActionState, useEffect, useId, useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button';
import { AddTeammateToAgency } from '@/action/admin.actions';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const AddTeammateToAgencyForm = ({ companies }) => {
    const id = useId();
    const [isVisible, setIsVisible] = useState(false);

    const [open, setOpen] = useState(false);

    const [state, formAction, isPending] = useActionState(AddTeammateToAgency, {});


    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    useEffect(() => {
        if (state?.success || state?.message) {
            setOpen(true);
        }
    }, [state])
    return (
        <>
            <form action={formAction} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='grid gap-3'>
                    <Label htmlFor="teammate-email" className='font-medium'>Teammate's Email</Label>
                    <Input type="email" id="teammate-email" name='email' placeholder="Enter teammate's email" required />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor={id}>Password</Label>
                    </div>
                    <div className="relative">
                        <Input
                            id={id}
                            className="pe-9"
                            placeholder="Password"
                            name="password"
                            type={isVisible ? "text" : "password"}
                            required
                        />
                        <button
                            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            type="button"
                            onClick={toggleVisibility}
                            aria-label={isVisible ? "Hide password" : "Show password"}
                            aria-pressed={isVisible}
                            aria-controls={id}
                        >
                            {isVisible ? (
                                <EyeOffIcon size={16} aria-hidden="true" />
                            ) : (
                                <EyeIcon size={16} aria-hidden="true" />
                            )}
                        </button>
                    </div>
                    {/* <Input id="password" name="password" type="password" required className={'border border-gray-300'} /> */}
                </div>

                <div className='grid gap-3'>
                    <Label htmlFor="teammate-name" className='font-medium'>Teammate's Name</Label>
                    <Input type="text" id="teammate-name" name='name' placeholder="Enter teammate's name" required />
                </div>

                <div className='grid gap-3'>
                    <Label htmlFor="teammate-contact-number" className='font-medium'>Teammate's Contact Number</Label>
                    <Input type="text" id="teammate-contact-number" name='phoneNum' placeholder="Enter teammate's contact number" required />
                </div>

                <div className='grid gap-3'>
                    <Label htmlFor="select-agency" className='font-medium'>Select Agency</Label>
                    <Select id="select-agency" name="agency" required>
                        <SelectTrigger className={'w-full'}>
                            <SelectValue placeholder="Select an agency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Agencies</SelectLabel>
                                {companies?.map(company => (
                                    <SelectItem key={company} value={company}>{company}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className='grid gap-3'>
                    <Label htmlFor="teammate-position" className='font-medium'>Teammate's Position</Label>
                    <Input type="text" id="teammate-position" name='position' placeholder="Enter teammate's position" required />
                </div>

                <Button type="submit" className='w-full mt-2' disabled={isPending}>Add Teammate</Button>
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

export default AddTeammateToAgencyForm