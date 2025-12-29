import Task from "@/models/Task";
import { connectDB } from "./mongodb";
import TaskComment from "@/models/TaskComment";
import User from "@/models/User";

export async function getTasks() {
    try {
        await connectDB();
        const tasks = await Task.find()
            .sort({ dueDate: -1 }).lean();

        return tasks;
    } catch (error) {
        console.error(error)
        return [];
    }
}

export const getTaskById = async (id) => {
    try {
        await connectDB();
        const task = await Task.findById(id).populate('createdBy').populate('assignees').lean();
        return task;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getTaskCommentByTaskId(id) {
    try {
        await connectDB();
        const comments = await TaskComment.find({ taskId: id }).populate('createdBy').sort({ createdAt: -1 }).lean();
        return comments;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getUserAssignedTasks(userId) {
    await connectDB();

    const tasks = await Task.find({
        assignees: userId,
    }).populate("createdBy").lean();

    return tasks;
}

export async function getCompanyMembers(companyName) {
    if (!companyName) return [];

    try {
        await connectDB();

        const users = await User.find({
            companyName,
            role: { $in: ["user", "team-member"] },
        })
            .select("-password") // always a good idea
            .lean();

        return users;
    } catch (error) {
        console.error(error);
        return [];
    }
}