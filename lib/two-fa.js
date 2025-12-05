import OTP from "@/models/OTP";
import { cookies } from "next/headers"

export const getOTPUSerInfo = async () => {
    const userInfo = (await cookies()).get('pendingUser')?.value;
    if (!userInfo) return null;

    try {
        return JSON.parse(userInfo)
    } catch (error) {
        return null;
    }
}

export const getOTPForComparison = async (userId) => {
    const otp = await OTP.findOne({ for: userId }).lean();
    return otp;
}