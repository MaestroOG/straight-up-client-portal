import { cookies } from "next/headers"
import { connectDB } from "./mongodb";
import User from "@/models/User";

export const getUser = async () => {
    const user = (await cookies()).get("user")?.value;
    if (!user) return null;

    try {
        return JSON.parse(user)
    } catch (error) {
        return null
    }
}


export const getUserFromDB = async () => {
    const user = await getUser();
    await connectDB();

    const userData = await User.findOne({ _id: user._id }).lean();
    return userData;
}


export const isFirstLogin = async () => {
    const user = await getUser();

    if (!user?.firstLogIn) {
        return true;
    } else {
        return false;
    }
}