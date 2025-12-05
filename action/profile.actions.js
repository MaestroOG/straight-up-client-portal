'use server';

import { uploadImage } from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import { getUser, getUserFromDB } from "@/lib/user";
import User from "@/models/User";
import { comparePassword, hashPassword } from "@/utils/validatorFns";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function changeEmail(prevState, formData) {
    const oldEmail = formData.get('email');
    const newEmail = formData.get('newEmail');

    if (!newEmail) {
        return {
            success: false,
            message: 'New email is required',
        };
    }

    if (newEmail === oldEmail) {
        return {
            success: false,
            message: 'New email cannot be the same as the old email',
        };
    }

    await connectDB();
    await User.findOneAndUpdate({ email: oldEmail }, { email: newEmail });
    revalidatePath('/', "layout");

    return {
        success: true,
        message: 'Email updated successfully',
    };
}


export async function changePassword(prevState, formData) {

    const user = await getUserFromDB();

    const oldPassword = formData.get('oldPassword');
    const newPassword = formData.get('newPassword');

    if (!newPassword || !oldPassword) {
        return {
            success: false,
            message: 'Both old and new passwords are required',
        };
    }

    if (newPassword === oldPassword) {
        return {
            success: false,
            message: 'New password cannot be the same as the old password',
        };
    }

    const isMatch = await comparePassword(oldPassword, user.password);

    if (!isMatch) {
        return {
            success: false,
            message: 'Old password is incorrect',
        };
    }

    const newHashedPassword = await hashPassword(newPassword);
    await connectDB();
    await User.findOneAndUpdate({ email: user.email }, { password: newHashedPassword });
    revalidatePath('/', "layout");

    return {
        success: true,
        message: 'Password updated successfully',
    };
}


export async function changeTwoFactor(userId, value) {
    await connectDB();
    await User.findByIdAndUpdate(userId, { useTwoFactor: value });
    revalidatePath('/', 'layout');
}

export async function changeProfilePicture(prevState, formData) {
    const image = formData.get('image')
    await connectDB();
    const user = await getUser();
    let imageUrl;

    try {
        imageUrl = await uploadImage(image)
        await User.findByIdAndUpdate(user?._id, { profilePictureUrl: imageUrl })
    } catch (error) {
        throw new Error('Image upload failed. Post was not created. Please try again later')
    }

    revalidatePath('/', "layout")
    redirect('/profile')
}