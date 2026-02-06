import { NextResponse } from "next/server";
import File from "@/models/File";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { connectDB } from "@/lib/mongodb";

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const fileId = searchParams.get("fileId");

        if (!fileId) {
            throw new Error("Missing fileId");
        }

        const file = await File.findById(fileId);
        if (!file || file.isDeleted) {
            throw new Error("File not found");
        }

        const { data, error } = await supabaseAdmin.storage
            .from("project-files")
            .createSignedUrl(file.storagePath, 120, {
                download: true,
            });

        if (error) throw error;

        return NextResponse.json({ url: data.signedUrl });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}