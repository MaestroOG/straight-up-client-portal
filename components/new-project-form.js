'use client';

import { createProject } from '@/action/project.actions';
import { useActionState, useState } from 'react';
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
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { pricingConfig, saPricingConfig } from '@/utils/formConfig';
import { useCountry } from '@/hooks/useCountry';

const NewProjectForm = ({ partners, user, service, fields }) => {
    const [value, setValue] = useState("");
    const { countryCode, loading, error } = useCountry();

    let pricing;

    const [state, formAction, isPending] = useActionState(createProject, {})

    const [selectedPackage, setSelectedPackage] = useState("");
    if (countryCode) {
        if (countryCode?.trim() === 'ZA') {
            pricing = saPricingConfig[service];
        } else {
            pricing = pricingConfig[service];
        }
    }

    return (
        <>
            {service && <>
                <Container className={'bg-white rounded-lg p-3 md:p-4'}>
                    <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="hidden" name="service" value={service} />

                        {user?.role === 'superadmin' && <div className="flex flex-col gap-2">
                            <Label className="block font-medium">
                                For Which Partner<span className="text-destructive">*</span>
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
                                Project Title <span className="text-destructive">*</span> (Your Reference ID For This Project)
                            </Label>
                            <Input
                                type="text"
                                name="projectTitle"
                                required
                                className="border border-gray-300"
                            />
                        </div>


                        {fields?.map((field) => (
                            <>
                                <div key={field.name} className="flex flex-col gap-2">
                                    <Label className="block font-medium">
                                        {field.label}{" "}
                                        {field.required && <span className="text-destructive">*</span>}
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

                        {loading ? (
                            <div className="p-4 border border-gray-200 rounded-lg text-gray-500 animate-pulse">
                                Loading pricing...
                            </div>
                        ) : (
                            pricing && (
                                <div className="flex flex-col gap-4">
                                    <Label className="block font-medium text-lg">
                                        Select Package <span className="text-destructive">*</span>
                                    </Label>
                                    <RadioGroup value={selectedPackage}
                                        onValueChange={(val) => setSelectedPackage(val)} name="selectedPackage" required className="space-y-3">
                                        {pricing?.pricing.map((priceOption) => (

                                            <div key={priceOption.id} className='border border-gray-200 rounded-lg hover:border-primary transition-colors'>
                                                <div className="flex items-start space-x-3 p-4 ">
                                                    <RadioGroupItem
                                                        value={priceOption.price}
                                                        id={priceOption.id}
                                                        className="mt-1"
                                                    />
                                                    <div>
                                                        <Label
                                                            htmlFor={priceOption.id}
                                                            className="cursor-pointer"
                                                        >
                                                            <div className="flex justify-between items-start mb-1">
                                                                <span className="font-semibold text-gray-900">
                                                                    {priceOption.label}
                                                                </span>

                                                            </div>
                                                        </Label>
                                                        <span className="font-bold text-primary text-lg">
                                                            {priceOption.price}{" "}
                                                            <span className="text-sm font-normal text-gray-500">
                                                                {priceOption.period}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    </RadioGroup>
                                    {selectedPackage.startsWith("custom") && (
                                        <div className="flex flex-col gap-2">
                                            <Label className="block font-medium">
                                                Additional Details <span className="text-destructive">*</span>
                                            </Label>
                                            <Input
                                                type="text"
                                                name="customPrice"
                                                required
                                                placeholder="Enter any additional details"
                                                className="border border-gray-300"
                                            />
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                        {service && <Button key={service} disabled={isPending} type="submit">Submit</Button>}

                    </form>

                    <Dialog open={!!state.message} onOpenChange={() => window.location.reload()} className='bg-white'>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {state.success ? 'Project Created 🎉' : 'Error ⚠️'}
                                </DialogTitle>
                                <DialogDescription>{state.message}</DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button onClick={() => window.location.reload()}>
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

export default NewProjectForm