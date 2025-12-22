import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; // your MongoDB connection file
import Note from "@/models/Note"; // your Note model
import { getUser } from "@/lib/user";
import { revalidatePath } from "next/cache";

// PATCH /api/notes/[id]/mark-read
export async function POST(req, { params }) {
    try {
        // Verify user is authenticated (example using next-auth)
        const user = await getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params; // Note ID from URL
        const { userId } = await req.json(); // user ID from request body

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // Verify the authenticated user matches the userId in the request
        if (user._id !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // …rest of your handler…

        await connectDB();

        // Find the note
        const note = await Note.findById(id);
        if (!note) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        // If user hasn't read it yet, add them to readBy array
        // Atomically add userId to readBy if not already present
        await Note.findByIdAndUpdate(
            id,
            { $addToSet: { readBy: userId } },
            { new: true }
        );

        revalidatePath('/', 'layout');

        return NextResponse.json({ success: true, note });
    } catch (error) {
        // error handling…
        console.error("Error marking note as read:", error);
        return NextResponse.json(
            { error: "Failed to mark note as read" },
            { status: 500 }
        );
    }
}

