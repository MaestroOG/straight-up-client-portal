"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { SignUpUser } from "@/action/user";
import { useActionState, useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image";
import { Progress } from "./ui/progress";

export function SignUpForm({
    className,
    ...props
}) {
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        name: "",
        position: "",
        phoneNum: "",
        contactEmail: "",
        companyName: "",
        abn: "",
        companyWebsite: "",
        businessAddress: "",
        yearsInBiz: "",
        numOfActiveClients: "",
        socialMediaLinks: "",
        companyStructure: "sole-trader",
        primaryServices: "",
        industriesWorkWith: "",
        regionsServe: "",
        serviceModel: "retainer-based",
        monthlyProjectVolume: "",
        isUsingWhiteLabelProvider: "yes",
        challengeDetail: "",
        "master-service-agreement": false,
    });

    const [message, formAction, isPending] = useActionState(SignUpUser.bind(null, formValues), { err: "", success: false });
    const [open, setOpen] = useState(false);



    // Handle input/textarea changes
    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Handle radio button change
    const handleRadioChange = (name, value) => {
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const [step, setStep] = useState(30);

    const nextStep = () => setStep((prev) => prev + 30);
    const prevStep = () => setStep((prev) => prev - 30);

    useEffect(() => {
        if (message?.success) {
            setOpen(true)
        }
    }, [message])
    return (
        <>
            <form action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Become A Partner</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your information below to become a partner
                    </p>
                </div>

                <Progress value={step} />


                <div className="grid gap-6">
                    {step === 30 && (
                        <>
                            {/* Main Credentials */}


                            <div className="grid gap-3">
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="email" className={'text-heading'}>Email</Label>
                                    <span className="text-destructive">*</span>
                                </div>
                                <Input id="email" type="email" name="email" value={formValues.email} onChange={handleChange} required className={'border border-gray-300'} />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="password" className={'text-heading'}>Password</Label>
                                    <span className="text-destructive">*</span>
                                </div>
                                <Input id="password" name="password" type="password" value={formValues.password} onChange={handleChange} required className={'border border-gray-300'} />
                            </div>

                            {/* Contact Information */}

                            <div className="grid gap-3">
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="name" className={'text-heading'}>Primary Contact Name</Label>
                                    <span className="text-destructive">*</span>
                                </div>
                                <Input id="name" type="text" name="name" value={formValues.name} onChange={handleChange} required className={'border border-gray-300'} />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="position" className={'text-heading'}>Position/Title</Label>
                                    <span className="text-destructive">*</span>
                                </div>
                                <Input id="position" type="text" name="position" value={formValues.position} onChange={handleChange} required className={'border border-gray-300'} />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="phoneNum" className={'text-heading'}>Phone Number</Label>
                                    <span className="text-destructive">*</span>
                                </div>
                                <Input id="phoneNum" type="text" value={formValues.phoneNum} onChange={handleChange} name="phoneNum" required className={'border border-gray-300'} />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="contactEmail" className={'text-heading'}>Accounts Contact Email</Label>
                                    <span className="text-destructive">*</span>
                                </div>
                                <Input id="contactEmail" type="email" value={formValues.contactEmail} onChange={handleChange} name="contactEmail" required className={'border border-gray-300'} />
                            </div>
                        </>
                    )}

                    {step === 60 && (
                        <>
                            {/* Agency Details */}

                            <div className="grid gap-3">
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="companyName" className={'text-heading'}>Agency Name</Label>
                                    <span className="text-destructive">*</span>
                                </div>
                                <Input id="companyName" type="text" value={formValues.companyName} onChange={handleChange} name="companyName" className={'border border-gray-300'} required />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="abn" className={'text-heading'}>ABN (Australian Business Number)</Label>
                                    <span className="text-destructive">*</span>
                                </div>
                                <Input id="abn" type="number" value={formValues.abn} onChange={handleChange} name="abn" required className={'border border-gray-300'} />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="companyWebsite" className={'text-heading'}>Company Website (Add https:// in front of the URL)</Label>
                                    <span className="text-destructive">*</span>
                                </div>
                                <Input id="companyWebsite" value={formValues.companyWebsite} onChange={handleChange} type="url" name="companyWebsite" required className={'border border-gray-300'} />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="businessAddress" className={'text-heading'}>Business Address</Label>
                                    <span className="text-destructive">*</span>
                                </div>
                                <Input id="businessAddress" type="text" value={formValues.businessAddress} onChange={handleChange} name="businessAddress" required className={'border border-gray-300'} />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="yearsInBiz" className={'text-heading'}>Years in Business</Label>
                                    <span className="text-destructive">*</span>
                                </div>
                                <Input id="yearsInBiz" type="number" value={formValues.yearsInBiz} onChange={handleChange} name="yearsInBiz" required className={'border border-gray-300'} />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="numOfActiveClients" className={'text-heading'}>Approximate number of active clients</Label>
                                    <span className="text-destructive">*</span>
                                </div>
                                <Input id="numOfActiveClients" type="number" value={formValues.numOfActiveClients} onChange={handleChange} name="numOfActiveClients" required className={'border border-gray-300'} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="socialMediaLinks" className={'text-heading'}>Social Media Links (if applicable)</Label>
                                <Textarea id="socialMediaLinks" value={formValues.socialMediaLinks} onChange={handleChange} name="socialMediaLinks" className={'border border-gray-300'} />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center gap-1">
                                    <Label className={'text-heading'}>Company Structure</Label>
                                    <span className="text-destructive">*</span>
                                </div>
                                <RadioGroup name="companyStructure" value={formValues.companyStructure} onValueChange={(value) => setFormValues(prev => ({
                                    ...prev,
                                    companyStructure: value
                                }))}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="sole-trader" id="sole-trader" />
                                        <Label className={'font-normal'} htmlFor="sole-trader">Sole Trader</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="partner-ship" id="partner-ship" />
                                        <Label className={'font-normal'} htmlFor="partner-ship">Partnership</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="pty-ltd" id="pty-ltd" />
                                        <Label className={'font-normal'} htmlFor="pty-ltd">Pty Ltd.</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="other" id="other" />
                                        <Label className={'font-normal'} htmlFor="other">Other</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </>
                    )}


                    {step === 90 && (
                        <>
                            {/* Market and Services Information */}

                            <div className="grid gap-3">
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="primaryServices" className={'text-heading'}>Primary Services Your Agency Offers</Label>
                                    <span className="text-destructive">*</span>
                                </div>
                                <Textarea id="primaryServices" value={formValues.primaryServices} onChange={handleChange} name="primaryServices" required className={'border border-gray-300'} />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="industriesWorkWith" className={'text-heading'}>Industries You Commonly Work With</Label>
                                    <span className="text-destructive">*</span>
                                </div>
                                <Textarea id="industriesWorkWith" value={formValues.industriesWorkWith} onChange={handleChange} name="industriesWorkWith" required className={'border border-gray-300'} />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="regionsServe" className={'text-heading'}>Regions You Serve</Label>
                                    <span className="text-destructive">*</span>
                                </div>
                                <Textarea id="regionsServe" value={formValues.regionsServe} onChange={handleChange} name="regionsServe" required className={'border border-gray-300'} />
                            </div>

                            <div className="grid gap-3">
                                <Label className={'text-heading'}>Typical Service Model</Label>
                                <RadioGroup name="serviceModel" value={formValues.serviceModel} onValueChange={(value) => setFormValues(prev => ({
                                    ...prev,
                                    serviceModel: value
                                }))}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="retainer-based" id="retainer-based" />
                                        <Label className={'font-normal'} htmlFor="retainer-based">Retainer Based</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="project-based" id="project-based" />
                                        <Label className={'font-normal'} htmlFor="project-based">Project Based</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="both" id="both" />
                                        <Label className={'font-normal'} htmlFor="both">Both</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="monthlyProjectVolume" className={'text-heading'}>Anticipated Monthly Project Volume for Straight Up Digital (Optional)</Label>
                                <Input id="monthlyProjectVolume" value={formValues.monthlyProjectVolume} onChange={handleChange} type="text" name="monthlyProjectVolume" className={'border border-gray-300'} />
                            </div>

                            <div className="grid gap-3">
                                <Label className={'text-heading'}>Do you currently use any other white label providers?</Label>
                                <RadioGroup name="isUsingWhiteLabelProvider" value={formValues.isUsingWhiteLabelProvider} onValueChange={(value) => setFormValues(prev => ({
                                    ...prev,
                                    isUsingWhiteLabelProvider: value
                                }))}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="yes" />
                                        <Label className={'font-normal'} htmlFor="yes">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="no" />
                                        <Label className={'font-normal'} htmlFor="no">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="challengeDetail" className={'text-heading'}>If yes, what challenges have you faced?</Label>
                                <Textarea id="challengeDetail" value={formValues.challengeDetail} onChange={handleChange} name="challengeDetail" required={formValues.isUsingWhiteLabelProvider === 'yes' ? true : false} className={'border border-gray-300'} />
                            </div>

                            <div className="flex gap-3">
                                <Checkbox id="master-service-agreement" value={formValues["master-service-agreement"]} onChange={handleChange} name="master-service-agreement" />
                                <Label htmlFor="master-service-agreement" className={'text-heading'}>
                                    I agree to the Straight Up Digital
                                    <span>
                                        <Link href={'https://straightupdigital.com.au/straight-up-digital-master-services-agreement/'} target="_blank" className="text-primary underline">
                                            Master Services Agreement
                                        </Link>
                                    </span>
                                </Label>
                            </div>
                        </>
                    )}




                    {/* Navigation buttons */}
                    <div className="mt-6 flex justify-between max-sm:flex-col max-sm:gap-2">
                        {step > 30 && (
                            <Button
                                type="button"
                                variant={"secondary"}
                                onClick={prevStep}
                                className="px-4 py-2 rounded"
                            >
                                Previous
                            </Button>
                        )}

                        {step < 90 ? (
                            <Button
                                type="button"
                                onClick={nextStep}
                                className="ml-auto px-4 py-2 rounded"
                            >
                                Next
                            </Button>
                        ) : (
                            <Button disabled={isPending} type="submit" className="cursor-pointer">
                                Apply to become a partner
                            </Button>
                        )}


                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogContent>
                                <DialogHeader className={'flex items-center justify-center flex-col gap-3'}>
                                    <DialogTitle><Image width={100} height={100} src={'/check-circle.svg'} alt="check-circle" /></DialogTitle>
                                    <DialogDescription className={'text-lg'}>
                                        Thanks for signing up! Your request email has been sent to the admin team. You’ll be notified once it’s reviewed.
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                    {message?.err && <div className="text-center text-destructive font-bold text-xl">{message?.err}</div>}
                    <div className="text-center text-sm">
                        Already a user?{" "}
                        <Link href="/login" className="underline underline-offset-4">
                            Log In
                        </Link>
                    </div>
                </div>
            </form>

        </>
    );
}
