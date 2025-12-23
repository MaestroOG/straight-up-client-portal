import { generateTaskOverdueEmail } from "@/htmlemailtemplates/taskEmailTemplates";
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import { createTransporter } from "@/utils/transporterFns";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
    } catch (error) {
        return NextResponse.json(
            { error: "Database connection failed" },
            { status: 500 }
        );
    }
    const now = new Date();

    const overdueTasks = await Task.find({
        dueDate: { $lt: now },
        status: { $ne: "completed" },
        isOverdueNotified: false
    }).populate("createdBy", "email");

    if (overdueTasks.length === 0)
        return NextResponse.json({ message: "No overdue tasks found" });

    const transporter = createTransporter();
    for (const task of overdueTasks) {
        if (!task.createdBy?.email) {
            console.error(`Task ${task._id} has no valid creator email`);
            continue;
        }
        const html = generateTaskOverdueEmail(task)

        try {
            task.isOverdueNotified = true;
            await task.save();


            await transporter.sendMail({
                from: '"Straight Up Digital" <admin@straightupdigital.com.au>',
                to: 'admin@straightupdigital.com.au',
                subject: "Task Overdue Alert",
                html,
            })
        } catch (error) {
            console.error(error)
        }

    }

    return NextResponse.json({ message: "Overdue notifications sent" });
}
