'use server'

import { generatePartnerShipEndEmail } from "@/htmlemailtemplates/partnerEmailTemplates";
import { getUserById } from "@/lib/admin";
import { connectDB } from "@/lib/mongodb";
import { getUserFromDB } from "@/lib/user";
import DeletedUser from "@/models/DeletedUser";
import User from "@/models/User";
import { getTodayDate } from "@/utils/formUtils";
import { createTransporter } from "@/utils/transporterFns";
import { revalidatePath } from "next/cache";

export async function deletePartner(prevState, formData) {
    const userId = formData.get('userId');

    const sendFinalEmail = formData.get('sendFinalEmail')
    const todaysDate = getTodayDate();
    await connectDB();

    const user = await getUserById(userId);
    if (!user) return { success: false, message: "User not found" };

    const { _id, ...userData } = user;

    await DeletedUser.create(userData)

    if (sendFinalEmail) {
        const html = generatePartnerShipEndEmail(user?.email, user?.name, user?.companyName, todaysDate, 'support@straightupdigital.com')
        const transporter = createTransporter();
        await transporter.sendMail({
            from: '"Straight Up Digital" <portalstraightup@gmail.com>',
            to: [user?.email, 'portalstraightup@gmail.com'],
            subject: "Partnership Update - Ended",
            html,
        })
    }

    await User.findByIdAndDelete(userId);

    revalidatePath('/', "layout");

    return {
        success: true,
        message: "Deleted Partner Successfully"
    }
}

export async function assignCredit(prevData, formData) {
    const partnerId = formData.get('partnerId');
    const creditValue = parseInt(formData.get('creditValue'));
    if (!partnerId) {
        return {
            success: false,
            message: "Partner ID is required"
        }
    }

    if (isNaN(creditValue)) {
        return {
            success: false,
            message: "Invalid credit value"
        }
    }

    try {
        await connectDB();

        const user = await getUserFromDB();

        if (!user || user.role !== 'superadmin') {
            return {
                success: false,
                message: "Unauthorized to assign credits"
            }
        }

        const updatedCredit = await User.findByIdAndUpdate(partnerId, { $inc: { credit: creditValue } }, { new: true });

        if (!updatedCredit) {
            return {
                success: false,
                message: "Failed to assign credit"
            }
        }

        revalidatePath('/', 'layout');

        return {
            success: true,
            message: `Successfully assigned credit.`,
        }
    } catch (error) {
        return {
            success: false,
            message: "An error occurred while assigning credit",
        }
    }
}