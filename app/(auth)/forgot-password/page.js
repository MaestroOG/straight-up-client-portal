import RecoveryEmailForm from "@/components/recovery-email-form"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export const metadata = {
    title: "Forgot Password"
}

const ForgotPasswordPage = () => {
    return (
        <main className="h-screen w-full flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Enter your email</CardTitle>
                    <CardDescription>
                        Enter your email to receive password reset link.
                    </CardDescription>
                </CardHeader>
                <RecoveryEmailForm />
            </Card>
        </main>
    )
}

export default ForgotPasswordPage