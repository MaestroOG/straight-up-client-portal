import { connectDB } from "@/lib/mongodb";
import { getUser } from "@/lib/user";
import Notification from "@/models/Notification";
import { NextResponse } from "next/server";

export async function POST() {
    await connectDB();
    const user = await getUser();

    if (!user?._id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user?._id;

    await Notification.updateMany(
        { readBy: { $ne: userId } },
        { $push: { readBy: userId } }
    );

    return NextResponse.json({ success: true });
}