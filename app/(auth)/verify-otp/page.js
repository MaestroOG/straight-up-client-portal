import { getOTPUSerInfo } from "@/lib/two-fa"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { VerifyOTPForm } from "@/components/verify-otp-form";

export const metadata = {
    title: 'Verify OTP'
}

const VerifyOtpPage = async () => {

    const userInfo = await getOTPUSerInfo();
    console.log(userInfo)
    return (
        <main className="h-screen w-full flex items-center justify-center">
            <Card className={'max-w-3xl w-3xl'}>
                <CardHeader>
                    <CardTitle>Verify OTP</CardTitle>
                    <CardDescription>An email has been sent to the email starting with {userInfo?.email.slice(0, 4)}*****</CardDescription>
                </CardHeader>
                <CardContent className={'w-full flex items-center justify-center'}>
                    <VerifyOTPForm />
                </CardContent>
            </Card>
        </main>
    )
}

export default VerifyOtpPage