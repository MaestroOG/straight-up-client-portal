import { generateInactiveProjectsAlertEmail } from "@/htmlemailtemplates/projectStatusTemplates";
import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import Project from "@/models/Project";
import { createTransporter } from "@/utils/transporterFns";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

        // Get all projects
        const projects = await Project.find();

        const inactiveProjects = [];

        for (const project of projects) {
            const latestNote = await Note.findOne({ projectId: project._id })
                .sort({ createdAt: -1 })
                .lean();

            // If no notes OR last note older than 3 days
            if (!latestNote || new Date(latestNote.createdAt) < threeDaysAgo) {
                inactiveProjects.push(project);
            }
        }

        if (inactiveProjects.length > 0) {
            const message = inactiveProjects
                .map(
                    (p) =>
                        `• ${p.projectTitle} (Service: ${p.service}) — Last note: ${p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : "None"
                        }`
                )
                .join("\n");

            const transporter = createTransporter();

            const html = generateInactiveProjectsAlertEmail(inactiveProjects.length);

            await transporter.sendMail({
                from: '"Straight Up Digital" <portalstraightup@gmail.com>',
                to: ['portalstraightup@gmail.com', 'portalstraightup@gmail.com'],
                subject: "Inactive Projects Alert",
                html,
            })
        }

        return NextResponse.json({
            success: true,
            message: `Checked ${projects.length} projects, found ${inactiveProjects.length} inactive.`,
        });
    } catch (err) {
        console.error("Error in cron job:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
