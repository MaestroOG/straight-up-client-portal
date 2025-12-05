import { LoginForm } from "@/components/login-form"
import Image from "next/image";

export const metadata = {
    title: "Login"
}

export default function LoginPage() {

    return (
        (<div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    {/* <a href="#" className="flex items-center gap-2 font-medium">
                        <img src="/logo.png" alt="" />
                    </a> */}
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="bg-primary relative hidden lg:flex items-center justify-center">
                <Image src='/straight-up.png' alt="Straight Up Digital logo" width={235} height={67} priority />
            </div>
        </div>)
    );
}
