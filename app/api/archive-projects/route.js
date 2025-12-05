import { archiveOldPendingProjects } from "@/lib/projects";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await archiveOldPendingProjects();
        return NextResponse.json({ message: "Old pending projects archived successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to archive old projects" }, { status: 500 });
    }
}
