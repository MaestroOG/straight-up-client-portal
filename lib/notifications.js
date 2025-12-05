import Notification from "@/models/Notification";
import { connectDB } from "./mongodb"
import { getUser } from "./user";

export const getAllNotifications = async () => {
    await connectDB();
    const notifications = await Notification.find({});
    return notifications;
}

export async function getLatestUnreadNotification() {
    try {
        await connectDB();
        const user = await getUser();

        if (!user?._id) {
            return null; // not logged in
        }

        const userId = user._id;

        const notification = await Notification.findOne({
            $and: [
                {
                    $or: [
                        { sendToAll: true },
                        { recipients: userId }
                    ]
                },
                { readBy: { $ne: userId } }
            ]
        })
            .sort({ createdAt: -1 })
            .lean();

        return notification;
    } catch (error) {
        console.error("Error fetching latest unread notification:", error);
        return null;
    }
}
