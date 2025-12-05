'use client';
import { changeTwoFactor } from '@/action/profile.actions';
import { Label } from '@/components/ui/label'
import { Switch } from "@/components/ui/switch"
import { startTransition, useState, useTransition } from 'react';

const TwoFactorForm = ({ userId, checked }) => {
    const [isChecked, setIsChecked] = useState(checked);
    const [isPending, setIsPending] = useTransition();

    const handleChecked = (newValue) => {
        setIsChecked(newValue);

        startTransition(() => {
            changeTwoFactor(userId, newValue);
        })
    }
    return (
        <form className='mt-4 flex items-center space-x-2'>
            <Switch disabled={isPending} id='two-fa' checked={isChecked} onCheckedChange={handleChecked} />
            <Label htmlFor='two-fa'>Enable 2FA</Label>
        </form>
    )
}

export default TwoFactorForm