'use server';

import { generateTaskCommentNotification, generateTaskNotification } from "@/htmlemailtemplates/taskEmailTemplates";
import { connectDB } from "@/lib/mongodb";
import { getLastThreeTaskCommentByTask } from "@/lib/task";
import { getUser } from "@/lib/user";
import Project from "@/models/Project";
import Task from "@/models/Task";
import TaskComment from "@/models/TaskComment";
import User from "@/models/User";
import { toYMD } from "@/utils/formUtils";
import { createTransporter } from "@/utils/transporterFns";
import { revalidatePath } from "next/cache";

export async function createTask(selectedUsers, prevState, formData) {
    const title = formData.get('title')?.trim();
    const description = formData.get('description')?.trim();
    const dueDate = formData.get('dueDate');
    const status = formData.get('status');
    const projectId = formData.get('projectId');
    const assignees = selectedUsers;

    const user = await getUser();

    if (!user || user?.role !== 'superadmin') {
        return {
            success: false,
            message: "Failed to create task. Please Authorize yourself."
        }
    }

    const validStatuses = ['pending', 'in-progress', 'completed', 'to-do']; // adjust as needed
    if (!status || !validStatuses.includes(status)) {
        return {
            success: false,
            message: "Valid status is required"
        }
    }

    if (!title || !description) {
        return {
            success: false,
            message: "Title and description are required"
        }
    }

    if (!dueDate || isNaN(Date.parse(dueDate))) {
        return {
            success: false,
            message: "Valid due date is required"
        }
    }

    try {
        await connectDB();

        const projectExists = await Project.findById(projectId);
        if (!projectExists) {
            return {
                success: false,
                message: "Project not found"
            }
        }

        const task = await Task.create({
            title,
            description,
            dueDate,
            status,
            createdBy: user?._id,
            forProject: projectId || null,
            assignees
        })

        const transporter = createTransporter();

        const taskDueDate = toYMD(task?.dueDate);

        const html = generateTaskNotification(title, "", taskDueDate, `https://portal.straightupdigital.com.au/tasks/${task?._id}`);

        for (const selectedUser of selectedUsers) {
            const assigneeUser = await User.findById(selectedUser);
            await transporter.sendMail({
                from: '"Straight Up Digital" <admin@straightupdigital.com.au>',
                to: ['admin@straightupdigital.com.au', assigneeUser?.email],
                subject: "New Task Assigned",
                html,
            })
        }

        if (!task) {
            return {
                success: false,
                message: "Failed to create task"
            }
        }

        revalidatePath('/', 'layout')

        return {
            success: true,
            message: "Task successfully created"
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Something went wrong'
        }
    }
}

export async function editTask(prevState, formData) {
    const title = formData.get('title')?.trim();
    const description = formData.get('description')?.trim();
    const dueDate = formData.get('dueDate');
    const status = formData.get('status');
    const taskId = formData.get('taskId');
    const assigneesRaw = formData.get('assignees');
    let assignees = [];
    if (assigneesRaw) {
        try {
            assignees = JSON.parse(assigneesRaw);
        } catch (error) {
            return {
                success: false,
                message: "Invalid assignees format"
            };
        }
    }

    const user = await getUser();

    if (!user || user?.role !== 'superadmin') {
        return {
            success: false,
            message: "You need admin privileges to perform this action"
        }
    }

    try {
        await connectDB();

        const updates = {};

        if (title) {
            updates.title = title;
        }

        if (description) {
            updates.description = description;
        }

        if (dueDate) {
            updates.dueDate = dueDate;
        }

        if (status) {
            updates.status = status;
        }

        if (assignees.length > 0) {
            updates.assignees = assignees;
        }

        const updatedTask = await Task.findByIdAndUpdate(taskId, { $set: updates }, { new: true });

        if (!updatedTask) {
            return {
                success: false,
                message: "Could not update task"
            }
        }

        revalidatePath('/', 'layout');

        return {
            success: true,
            message: "Task edited successfully"
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export async function deleteTask(prevState, formData) {
    const taskId = formData.get('taskId');
    const user = await getUser();

    if (!user) {
        return {
            success: false,
            message: "Cannot perform this action without authenticating"
        }
    }

    if (user?.role !== 'superadmin') {
        return {
            success: false,
            message: "You need admin privileges to perform this action"
        }
    }

    if (!taskId) {
        return {
            success: false,
            message: "Task ID is required"
        }
    }

    try {
        await connectDB();

        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return {
                success: false,
                message: "Could not delete task"
            }
        }

        revalidatePath('/', 'layout');

        return {
            success: true,
            message: "Task deleted successfully"
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Something went wrong"
        }
    }

}

export async function createTaskComment(prevState, formData) {
    const commentText = formData.get('commentText')?.trim();
    const taskId = formData.get('taskId')

    if (!taskId) {
        return {
            success: false,
            message: "Task ID is required"
        }
    }

    const user = await getUser();

    if (!user) {
        return {
            success: false,
            message: "You should be authenticated to make a comment"
        }
    }

    if (!commentText) {
        return {
            success: false,
            message: "Comment cannot be empty"
        }
    }

    try {
        await connectDB();

        const taskExists = await Task.findById(taskId);

        if (!taskExists) {
            return {
                success: false,
                message: "Task not found"
            }
        }

        const taskComment = await TaskComment.create({
            commentText,
            createdBy: user?._id,
            taskId
        })

        if (!taskComment) {
            return {
                success: false,
                message: "Cannot create comment"
            }
        }

        const lastThreeComments = await getLastThreeTaskCommentByTask(taskId);

        const transporter = createTransporter();

        for (const assignedUsers of taskExists?.assignees) {
            const taskCreatedDate = toYMD(taskComment?.createdAt)

            const assigneetoSendEmail = await User.findById(assignedUsers);
            const html = generateTaskCommentNotification(assigneetoSendEmail?.name, taskExists?.title, `https://portal.straightupdigital.com.au/tasks/${taskExists?._id}`, taskCreatedDate, lastThreeComments)
            await transporter.sendMail({
                from: '"Straight Up Digital" <admin@straightupdigital.com.au>',
                to: ['admin@straightupdigital.com.au', assigneetoSendEmail?.email],
                subject: "New Comment On Task",
                html,
            })
        }

        revalidatePath('/', 'layout')

        return {
            success: true,
            message: "Comment created successfully"
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}