import Task from "@/models/Task";
import { connectDB } from "./mongodb";
import TaskComment from "@/models/TaskComment";
import User from "@/models/User";

export async function getTasks() {
    try {
        await connectDB();
        const tasks = await Task.find({
            status: { $ne: "completed" }
        }).populate('forProject').populate('createdBy').populate('assignees')
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
        const task = await Task.findById(id).populate('createdBy').populate('assignees').populate('forProject').lean();
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
    try {
        await connectDB();

        const tasks = await Task.find({
            assignees: userId,
            status: { $ne: "completed" },
        })
            .populate("createdBy")
            .populate("forProject")
            .lean();

        return tasks;
    } catch (error) {
        console.error(error.message);
        return [];
    }
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

export async function getUserCompletedTasks(userId) {
    try {
        await connectDB();

        const tasks = await Task.find({
            assignees: userId,
            status: "completed",
        })
            .populate("createdBy")
            .populate("forProject")
            .lean();

        return tasks;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

export async function getAllCompletedTasks() {
    try {
        await connectDB();

        const tasks = await Task.find({
            status: "completed",
        })
            .populate("createdBy")
            .populate("forProject")
            .lean();

        return tasks;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

export async function getUnreadCountsForTasks(taskIds, userId) {
    await connectDB();

    const counts = await TaskComment.aggregate([
        { $match: { taskId: { $in: taskIds }, readBy: { $ne: userId } } },
        { $group: { _id: "$taskId", count: { $sum: 1 } } }
    ]);

    // convert to a simple object for easy lookup
    const result = {};
    taskIds.forEach(id => {
        const c = counts.find(item => item._id.toString() === id.toString());
        result[id.toString()] = c ? c.count : 0;
    });

    return result;
}
