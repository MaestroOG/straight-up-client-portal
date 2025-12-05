import { connectDB } from "@/lib/mongodb";
import { getUser } from "@/lib/user";
import Notification from "@/models/Notification";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const user = await getUser();

        if (!user?._id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = user?._id;

        const unreadNotifications = await Notification.find({
            $and: [
                {
                    $or: [
                        { sendToAll: true },
                        { recipients: userId }
                    ]
                },
                { readBy: { $ne: userId } }
            ]
        }).sort({ createdAt: -1 });

        return NextResponse.json({
            count: unreadNotifications.length,
            notifications: unreadNotifications
        });
    } catch (error) {
        console.error("Error fetching unread notifications", error);
        return NextResponse.json({ error: 'Internal Server Action' }, { status: 500 })
    }
}