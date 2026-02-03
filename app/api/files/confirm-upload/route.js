import { NextResponse } from "next/server";
import File from "@/models/File";
import { connectDB } from "@/lib/mongodb";
import { getUser } from "@/lib/user";

export async function POST(req) {
    try {
        await connectDB();

        const user = await getUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { fileId } = await req.json();

        const file = await File.findById(fileId);
        if (!file) {
            throw new Error("File not found");
        }

        file.status = "uploaded";
        await file.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}