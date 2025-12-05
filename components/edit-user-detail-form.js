"use client"

import { useActionState, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { updateUserDetails } from "@/action/admin.actions"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const EditUserDetailForm = ({ user, userId }) => {
    const [formValues, setFormData] = useState({
        name: user.name,
        position: user.position,
        companyName: user.companyName,
        email: user.email,
        phoneNum: user.phoneNum,
        contactEmail: user.contactEmail,
        companyWebsite: user.companyWebsite,
        businessAddress: user.businessAddress,
        abn: user.abn,
        yearsInBiz: user.yearsInBiz,
        numOfActiveClients: user.numOfActiveClients,
        primaryServices: user.primaryServices,
        industriesWorkWith: user.industriesWorkWith,
        regionsServe: user.regionsServe,
        monthlyProjectVolume: user.monthlyProjectVolume,
        socialMediaLinks: user.socialMediaLinks,
    })

    const [state, formAction, isPending] = useActionState(updateUserDetails.bind(null, formValues), {})


    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (state.success || state.message) {
            setOpen(true);
        }
    }, [state]);
    return (
        <>
            <form action={formAction} className="space-y-8 mt-4">
                <input type="hidden" name="userId" value={userId} />
                {/* Basic Info */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='grid gap-2'>
                        <Label>Name</Label>
                        <Input value={formValues.name} onChange={(e) => handleChange("name", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Position</Label>
                        <Input value={formValues.position} onChange={(e) => handleChange("position", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Company Name</Label>
                        <Input value={formValues.companyName} onChange={(e) => handleChange("companyName", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Email</Label>
                        <Input type="email" value={formValues.email} onChange={(e) => handleChange("email", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Phone Number</Label>
                        <Input value={formValues.phoneNum} onChange={(e) => handleChange("phoneNum", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Contact Email</Label>
                        <Input type="email" value={formValues.contactEmail} onChange={(e) => handleChange("contactEmail", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Website</Label>
                        <Input value={formValues.companyWebsite} onChange={(e) => handleChange("companyWebsite", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Business Address</Label>
                        <Input value={formValues.businessAddress} onChange={(e) => handleChange("businessAddress", e.target.value)} />
                    </div>
                </section>

                {/* Company Details */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='grid gap-2'>
                        <Label>ABN</Label>
                        <Input value={formValues.abn} onChange={(e) => handleChange("abn", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Years in Business</Label>
                        <Input value={formValues.yearsInBiz} onChange={(e) => handleChange("yearsInBiz", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Active Clients</Label>
                        <Input value={formValues.numOfActiveClients} onChange={(e) => handleChange("numOfActiveClients", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Primary Services</Label>
                        <Input value={formValues.primaryServices} onChange={(e) => handleChange("primaryServices", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Industries</Label>
                        <Input value={formValues.industriesWorkWith} onChange={(e) => handleChange("industriesWorkWith", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Regions</Label>
                        <Input value={formValues.regionsServe} onChange={(e) => handleChange("regionsServe", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Monthly Projects</Label>
                        <Input value={formValues.monthlyProjectVolume} onChange={(e) => handleChange("monthlyProjectVolume", e.target.value)} />
                    </div>
                </section>

                {/* Social Media */}
                <section className='grid gap-2'>
                    <Label>Social Media Links (comma separated)</Label>
                    <Input
                        value={formValues.socialMediaLinks.join(", ")}
                        onChange={(e) => handleChange("socialMediaLinks", e.target.value.split(",").map((s) => s.trim()))}
                    />
                </section>

                <Button disabled={isPending} type="submit" className="w-full">Save Changes</Button>
            </form>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>✅ Success</DialogTitle>
                    </DialogHeader>
                    <p>{state.message}</p>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default EditUserDetailForm