import { cookies } from "next/headers"
import { connectDB } from "./mongodb";
import User from "@/models/User";
import Faq from "@/models/Faq";
import IntroText from "@/models/IntroText";

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

export const getFaqsForService = async (serviceSlug) => {
    try {
        await connectDB();
        const faqs = await Faq.find({
            serviceSlug: serviceSlug,
            isActive: true,
        }).sort({ createdAt: -1 }).lean();

        return faqs;
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return [];
    }
}

export const getIntroText = async () => {
    try {
        await connectDB();
        const introText = await IntroText.findOne().sort({ createdAt: -1 }).lean();

        return introText ? introText.text : "";
    } catch (error) {
        console.error("Error fetching Intro Text:", error);
        return "";
    }
}