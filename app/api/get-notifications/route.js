import { connectDB } from "@/lib/mongodb";
import { getUser } from "@/lib/user";
import Notification from "@/models/Notification";

export async function GET() {
    try {
        await connectDB();

        const user = await getUser();

        let notifications;

        if (user?._id) {
            notifications = await Notification.find({
                $or: [
                    { sendToAll: true },
                    { recipients: user?._id }
                ]
            }).sort({ createdAt: -1 });
        } else {
            // fallback: return all (maybe for admin use)
            notifications = await Notification.find().sort({ createdAt: -1 });
        }

        return Response.json(notifications, { status: 200 });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return Response.json(
            { error: "Failed to fetch notifications" },
            { status: 500 }
        );
    }
}
