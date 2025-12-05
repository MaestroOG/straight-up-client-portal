"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { LoginUser } from "@/action/user";
import { useActionState, useId, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import Loader from "./Loader";

export function LoginForm({
  className,
  ...props
}) {

  const id = useId()
  const [isVisible, setIsVisible] = useState(false)
  const [message, formAction, isPending] = useActionState(LoginUser, { err: "" });

  const toggleVisibility = () => setIsVisible((prevState) => !prevState)
  return (
    <>
      <form action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email" className={'text-heading'}>Email</Label>
            <Input id="email" type="email" name="email" placeholder="Enter your email" required className={'border border-gray-300'} />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password" className={'text-heading'}>Password</Label>
              <Link href="/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline">
                Forgot your password?
              </Link>
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
                aria-controls="password"
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
          <Button disabled={isPending} type="submit" className="flex items-center justify-center gap-2 w-full cursor-pointer">
            {isPending && <Loader size="h-4 w-4" />}
            <span>Login</span>
          </Button>
        </div>
        {message?.err && <div className="text-center text-destructive font-bold text-xl">{message?.err}</div>}
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <br />
          <Link href="/signup" className="underline underline-offset-4">
            Apply to become a partner
          </Link>
        </div>
      </form>

      <Dialog open={!!message.err} onOpenChange={() => window.location.reload()} className='bg-white'>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {message.err ?? 'Error ⚠️'}
            </DialogTitle>
            <DialogDescription>{message?.err}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => window.location.reload()}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
