'use server';

import { generateRecoveryEmailTemplate } from "@/htmlemailtemplates/userRecoveryTemplates";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { createTransporter } from "@/utils/transporterFns";
import { hashPassword } from "@/utils/validatorFns";

export async function getRecoveryEmail(prevState, formData) {
    const email = formData.get("email");
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
        return {
            success: false,
            message: 'No User Found with this email.'
        }
    }

    const transporter = createTransporter();
    const html = generateRecoveryEmailTemplate(`https://portal.straightupdigital.com.au/reset-password?email=${user?.email}`);

    await transporter.sendMail({
        from: '"Straight Up Digital" <admin@straightupdigital.com.au>',
        to: [user?.email, 'admin@straightupdigital.com.au'],
        subject: "Password Reset - Straight Up Digital",
        html,
    })

    return {
        success: true,
        message: "A recovery email has been sent to your recovery email address"
    }
}

export async function resetandChangePassword(email, prevState, formData) {
    const password = formData.get("password");

    const hashedPassword = await hashPassword(password);
    await connectDB();

    const updatedUser = await User.findOneAndUpdate(
        { email },
        { password: hashedPassword }
    )

    if (updatedUser) {
        return {
            success: true,
            message: "Successfully changed password. You can now login with now credentials"
        }
    } else {
        return {
            success: false,
            message: "Failed to change password"
        }
    }
}