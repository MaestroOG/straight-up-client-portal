'use server'

import { generateAcceptEmailTemplate } from '@/htmlemailtemplates/emailTemplates';
import { connectDB } from '@/lib/mongodb';
import PendingUser from '@/models/PendingUser';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';
import nodemailer from 'nodemailer';

export async function addUser(prevState, formData) {
    const userId = formData.get("userId");
    if (!userId || typeof userId !== "string") {
        return { err: "Invalid user ID" };
    }
    console.log("Received userId:", userId);

    try {
        try {
            await connectDB();
        } catch (err) {
            console.error("❌ MongoDB connection failed:", err);
            return { err: "Database connection error" };
        }
        const user = await PendingUser.findById(userId);

        if (!user) {
            console.log("Pending user not found for ID:", userId);
            return { err: "User not found" };
        }

        const userData = user.toObject();
        delete userData._id;

        console.log("Creating new User with data:", userData);

        const newUser = await User.create(userData);
        console.log("✅ User created:", newUser);

        await PendingUser.findByIdAndDelete(userId);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: String(process.env.SMTP_USER),
                pass: String(process.env.SMTP_PASS),
            },
        });

        const html = generateAcceptEmailTemplate();

        await transporter.sendMail({
            from: '"Straight Up Digital" <admin@straightupdigital.com.au>',
            to: ["admin@straightupdigital.com.au", user?.email],
            subject: "Partnership Application Update – Accepted",
            html,
        });

        revalidatePath("/admin", "layout");

        return { success: true };
    } catch (error) {
        console.error("AddUser Error:", error);
        return { err: "Failed to add user" };
    }
}