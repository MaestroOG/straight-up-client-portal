'use server';

import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { revalidatePath } from "next/cache";

export async function createNotification(prevState, formData) {
    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim();
    const sendToAll = formData.get("sendToAll") === "true";
    const selectedUsers = formData.getAll("recipients");

    // Validate input
    if (!title || title.length < 3) {
        return { success: false, message: "Title must be at least 3 characters." };
    }
    if (!description || description.length < 5) {
        return { success: false, message: "Description must be at least 5 characters." };
    }

    if (!sendToAll) {
        recipients = selectedUsers.filter(id => isValidObjectId(id));
        if (recipients.length === 0) {
            return { success: false, message: "Please select at least one valid recipient." };
        }
    }

    try {
        await connectDB();
        await Notification.create({
            title,
            description,
            sendToAll,
            recipients: sendToAll ? [] : selectedUsers
        })

        revalidatePath('/', "layout")

        return {
            success: true,
            message: "Notification successfully created!"
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to create notification"
        }
    }
}