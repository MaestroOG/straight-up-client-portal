import { NextResponse } from "next/server";
import crypto from "crypto";
import File from "@/models/File";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { validateFile, getFileCategory } from "@/utils/fileCenterValidators";
import { connectDB } from "@/lib/mongodb";
import { getUser } from "@/lib/user";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { projectId, fileName, fileSize, mimeType } = body;

        if (!projectId || !fileName || !mimeType || fileSize === undefined) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const user = await getUser();


        if (!user || !user._id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = user?._id;
        const userRole = user?.role || "user";

        try {
            validateFile(fileName, mimeType);
        } catch (e) {
            console.log("VALIDATION FAILED:", e.message);
            throw e;
        }
        const storagePath = `project_${projectId}/uploads/${crypto.randomUUID()}_${fileName}`;

        const { data, error } = await supabaseAdmin.storage
            .from("project-files")
            .createSignedUploadUrl(storagePath, {
                contentType: mimeType,
            });

        if (error) {
            console.log("Supabase error:", error);
            throw new Error("Failed to create upload URL");
        };

        const fileDoc = await File.create({
            projectId,
            uploadedBy: userId,
            uploaderRole: userRole,
            fileName,
            mimeType,
            size: fileSize,
            storagePath,
        });

        return NextResponse.json({
            uploadUrl: data.signedUrl,
            fileId: fileDoc._id,
        });

    } catch (error) {
        console.error("CREATE UPLOAD FULL ERROR:", error);

        return NextResponse.json(
            {
                error: error.message
            },
            { status: 400 }
        );
    }
}