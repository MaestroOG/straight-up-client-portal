import { redirect } from "next/navigation";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ResetPasswordForm from "@/components/reset-password-form";


export const metadata = {
    title: 'Create new password'
}

const ResetPasswordPage = async ({ searchParams }) => {
    const { email } = await searchParams;

    if (!email) {
        redirect('/login')
    }

    return (
        <main className="h-screen w-full flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Change your password</CardTitle>
                    <CardDescription>
                        Enter a new password for your account associated with the email address provided.
                    </CardDescription>
                </CardHeader>
                <ResetPasswordForm email={email} />
            </Card>
        </main>
    )
}

export default ResetPasswordPage