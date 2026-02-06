import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import File from "@/models/File";

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const projectId = searchParams.get("projectId");

        if (!projectId) {
            throw new Error("Missing projectId");
        }

        const files = await File.find({
            projectId,
            isDeleted: false,
            status: "uploaded",
        }).sort({ createdAt: -1 });

        return NextResponse.json(files);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }

}