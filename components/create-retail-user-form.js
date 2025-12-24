'use client';

import { useActionState, useEffect, useId, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CheckCircle2, EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "./ui/button";
import { createRetailUser } from "@/action/user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

const CreateRetailUserForm = () => {

  const [open, setOpen] = useState(false);
  const id = useId()
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  const [state, formAction, isPending] = useActionState(createRetailUser, {});

  useEffect(() => {
    if (state?.success || state?.message) {
      setOpen(true);
    }
  }, [state])

  return (
    <>
      <form action={formAction} className="grid md:grid-cols-2 gap-6">

        <div className="grid gap-3">
          <div className="flex items-center gap-1">
            <Label htmlFor="email" className={'text-heading'}>Email</Label>
            <span className="text-destructive">*</span>
          </div>
          <Input id="email" type="email" name="email" required className={'border border-gray-300'} />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center gap-1">
            <Label htmlFor="name" className={'text-heading'}>Password</Label>
            <span className="text-destructive">*</span>
          </div>
          <div className="relative">
            <Input
              id={id}
              className="pe-9"
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
              aria-controls="password"
            >
              {isVisible ? (
                <EyeOffIcon size={16} aria-hidden="true" />
              ) : (
                <EyeIcon size={16} aria-hidden="true" />
              )}
            </button>
          </div>

        </div>

        <div className="grid gap-3">
          <div className="flex items-center gap-1">
            <Label htmlFor="name" className={'text-heading'}>Primary Contact Name</Label>
            <span className="text-destructive">*</span>
          </div>
          <Input id="name" type="text" name="name" required className={'border border-gray-300'} />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center gap-1">
            <Label htmlFor="phoneNum" className={'text-heading'}>Phone Number</Label>
            <span className="text-destructive">*</span>
          </div>
          <Input id="phoneNum" type="text" name="phoneNum" required className={'border border-gray-300'} />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center gap-1">
            <Label htmlFor="companyName" className={'text-heading'}>Agency Name</Label>
            <span className="text-destructive">*</span>
          </div>
          <Input id="companyName" type="text" name="companyName" className={'border border-gray-300'} required />
        </div>

        <Button disabled={isPending} type="submit" className="md:col-span-2 w-fit mt-4">{isPending ? 'Creating...' : 'Create Retail User'}</Button>
      </form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[420px] border-none shadow-2xl">
          <DialogHeader className="flex flex-col items-center justify-center space-y-4 pt-4">
            {/* Success Icon Animation Wrapper */}
            <div className="rounded-full bg-green-50 p-3 dark:bg-green-900/20">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>

            <div className="space-y-2 text-center">
              <DialogTitle className="text-2xl font-bold tracking-tight">
                {state?.success ? 'Retail User Created Successfully!' : 'Notice'}
              </DialogTitle>
              <DialogDescription className="text-base">
                {state?.message}
              </DialogDescription>
            </div>
          </DialogHeader>

        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateRetailUserForm