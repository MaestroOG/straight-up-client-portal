'use server';

import { generateAdminToUserEmailNoteTemplate, generateNoteCreatedEmailUserTemplate, generateProjectCreatedEmailTemplate } from "@/htmlemailtemplates/emailTemplates";
import { generateProjectStatusUpdateEmail } from "@/htmlemailtemplates/projectStatusTemplates";
import { addExpenditure } from "@/lib/admin";
import { connectDB } from "@/lib/mongodb";
import { getUser } from "@/lib/user";
import Expenditure from "@/models/Expenditure";
import Note from "@/models/Note";
import Project from "@/models/Project";
import User from "@/models/User";
import { cleanFormEntries, formatDateToYMD, validateEntries } from "@/utils/formUtils";
import { createTransporter } from "@/utils/transporterFns";
import { revalidatePath } from "next/cache";

export async function createProject(prevState, formData) {
    const user = await getUser();
    const service = formData.get("service");
    const projectTitle = formData.get("projectTitle");
    const packageSelected = formData.get("selectedPackage")
    const entries = {};
    const partnerId = formData.get("partnerId");
    const amount = Number(packageSelected.replace(/[^0-9.]/g, '').replace(/,/g, ''));

    // Turn formData into a plain object
    formData.forEach((value, key) => {
        if (key !== "service") {
            entries[key] = value;
        }
    });

    const cleanedEntries = cleanFormEntries(entries);

    if (!cleanedEntries || !validateEntries(cleanedEntries)) {
        return {
            success: false,
            message: "Project not created.",
        }
    }

    try {
        await connectDB();


        if (user?.role === 'superadmin') {
            const projectForUser = await User.findById(partnerId);

            const userBalance = projectForUser?.credit || 0;

            // if (userBalance < amount) {
            //     return {
            //         success: false,
            //         message: "Insufficient credit balance. Please top up the user's account.",
            //     }
            // }

            const expenditure = await addExpenditure(partnerId, amount);

            // const updatedUser = await User.findByIdAndUpdate(
            //     partnerId,
            //     { $set: { credit: userBalance - amount } },
            //     { new: true } // ✅ returns the updated user
            // );

            // if (!updatedUser) {
            //     return {
            //         success: false,
            //         message: "Failed to deduct credit from user.",
            //     }
            // }

            const project = await Project.create({
                projectTitle,
                service,
                fields: cleanedEntries,
                status: 'pending',
                createdBy: projectForUser?._id,
                packageSelected,
                byAdmin: true
            })

            const html = generateProjectCreatedEmailTemplate(projectForUser?.companyName, projectTitle, service, packageSelected, `https://portal.straightup.com/projects/${project?._id}`);

            const transporter = createTransporter();

            await transporter.sendMail({
                from: '"Straight Up Digital" <portalstraightup@gmail.com>',
                to: [projectForUser?.email, 'portalstraightup@gmail.com'],
                subject: "Project Created - Straight Up Digital",
                html,
            })
        }

        if (user?.role === 'user') {

            const userFromDB = await User.findById(user?._id);

            const userBalance = userFromDB?.credit || 0;

            // if (userBalance < amount) {
            //     return {
            //         success: false,
            //         message: "Insufficient credit balance. Please top up your account.",
            //     }
            // }

            const expenditure = await addExpenditure(partnerId, amount);

            // const updatedUser = await User.findByIdAndUpdate(
            //     partnerId,
            //     { $set: { credit: userBalance - amount } },
            //     { new: true } // ✅ returns the updated user
            // );

            // if (!updatedUser) {
            //     return {
            //         success: false,
            //         message: "Failed to deduct credit from user.",
            //     }
            // }

            const project = await Project.create({
                projectTitle,
                service,
                fields: cleanedEntries,
                status: 'pending',
                createdBy: user?._id,
                packageSelected
            })


            const html = generateProjectCreatedEmailTemplate(user?.companyName, projectTitle, service, packageSelected, `https://portal.straightup.com/projects/${project?._id}`);

            const transporter = createTransporter();

            await transporter.sendMail({
                from: '"Straight Up Digital" <portalstraightup@gmail.com>',
                to: [user?.email, 'portalstraightup@gmail.com'],
                subject: "Project Created - Straight Up Digital",
                html,
            })
        }

        return {
            success: true,
            message: "Project created successfully",
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to create project."
        }
    }
}


export async function addNote(id, prevState, formData) {
    const user = await getUser();
    const commentText = formData.get('commentText');


    try {
        await connectDB();
        const project = await Project.findById(id).populate("createdBy");
        await Note.create({
            note: commentText,
            createdBy: user?._id,
            projectId: id,
        })

        revalidatePath('/', "layout")

        const transporter = createTransporter();

        const html = generateNoteCreatedEmailUserTemplate(`https://portal.straightup.com/projects/${project?._id}`, user?.name, project?.projectTitle);

        if (user?.role === 'user') {
            await transporter.sendMail({
                from: '"Straight Up Digital" <portalstraightup@gmail.com>',
                to: 'portalstraightup@gmail.com',
                subject: "Note Created - Straight Up Digital",
                html,
            })
        }

        if (user?.role === 'superadmin') {
            const date = formatDateToYMD(project?.createdAt)
            const adminToUserHtml = generateAdminToUserEmailNoteTemplate(project?.projectTitle, project?.createdBy?.name, date, 'https://portal.straightup.com');
            await transporter.sendMail({
                from: '"Straight Up Digital" <portalstraightup@gmail.com>',
                to: [project?.createdBy.email, 'portalstraightup@gmail.com'],
                subject: "Note Created - Straight Up Digital",
                html: adminToUserHtml,
            })
        }

        return {
            success: true,
            message: "Comment added successfully",
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to add comment"
        }
    }
}


export async function ApproveProject(projectId, prevState, formData) {
    const user = await getUser();
    await connectDB();
    await Project.findByIdAndUpdate(projectId, { status: 'in-progress' });
    revalidatePath('/', "layout");

    const project = await Project.findById(projectId).populate('createdBy');


    const html = generateProjectStatusUpdateEmail(project?.projectTitle, 'in-progress', project?.createdBy.name, project?.updatedAt);

    const transporter = createTransporter();

    await transporter.sendMail({
        from: '"Straight Up Digital" <portalstraightup@gmail.com>',
        to: [project?.createdBy.email, 'portalstraightup@gmail.com'],
        subject: "Project Status Update - Straight Up Digital",
        html,
    })

    return {
        success: true,
        message: "Project approved successfully",
    }
}

export async function RejectProject(projectId, prevState, formData) {
    const user = await getUser();
    try {
        await connectDB();
        await Project.findByIdAndUpdate(projectId, { status: 'rejected' });
        revalidatePath('/', "layout");

        const project = await Project.findById(projectId).populate('createdBy');

        const amount = Number(project?.packageSelected.replace(/[^0-9.]/g, '').replace(/,/g, ''));

        const updatedUser = await User.findByIdAndUpdate(project?.createdBy, { $inc: { credit: amount } }, { new: true });

        const expenditure = await addExpenditure(project?.createdBy, -amount);

        if (!updatedUser) {
            return {
                success: false,
                message: "Failed to refund credit to user.",
            }
        }


        const html = generateProjectStatusUpdateEmail(project?.projectTitle, 'cancelled', project?.createdBy.name, project?.updatedAt);

        const transporter = createTransporter();

        await transporter.sendMail({
            from: '"Straight Up Digital" <portalstraightup@gmail.com>',
            to: [user?.email, 'portalstraightup@gmail.com'],
            subject: "Project Status Update - Straight Up Digital",
            html,
        })

        return {
            success: true,
            message: "Project rejected successfully and credit refunded.",
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong.",
        }
    }
}


export async function changeProjectStatus(projectId, prevState, formData) {
    const status = formData.get("status")?.trim();
    const user = await getUser();
    await connectDB();

    await Project.findByIdAndUpdate(projectId, { status: status });
    revalidatePath('/', "layout");

    const project = await Project.findById(projectId).populate('createdBy');

    const html = generateProjectStatusUpdateEmail(project?.projectTitle, status, project?.createdBy.name, project?.updatedAt);

    const transporter = createTransporter();

    await transporter.sendMail({
        from: '"Straight Up Digital" <portalstraightup@gmail.com>',
        to: ["portalstraightup@gmail.com", user?.email],
        subject: "Project Status Update - Straight Up Digital",
        html,
    })

    return {
        success: true,
        message: "Project status updated successfully",
    }
}

export async function archiveProject(prevState, formData) {
    const projectId = formData.get("projectId")?.trim();

    try {
        await connectDB();
        const updatedProject = await Project.findByIdAndUpdate(projectId, { status: 'archived' }, { new: true });
        if (!updatedProject) {
            return {
                success: false,
                message: "Failed to archive project.",
            }
        }

        revalidatePath('/', 'layout');

        return {
            success: true,
            message: 'Project archived successfully.'
        }
    } catch (error) {
        console.error("Error archiving project:", error);
        return {
            success: false,
            message: "Something went wrong.",
        }
    }
}

export async function deleteComment(prevState, formData) {
    const user = await getUser();
    const commentId = formData.get('commentId');

    if (!commentId) {
        return {
            success: false,
            message: "Comment needs to exist"
        }
    }

    try {
        await connectDB();

        const comment = await Note.findById(commentId);

        if (!comment) {
            return {
                success: false,
                message: "Comment not found"
            }
        }

        if (comment.createdBy.toString() !== user?._id?.toString() && user?.role !== 'superadmin') {
            return {
                success: false,
                message: "Unauthorized to delete this comment"
            }
        }

        const deletedComment = await Note.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return {
                success: false,
                message: "Could not delete comment"
            }
        }

        revalidatePath('/', 'layout');

        return {
            success: true,
            message: "Comment deleted successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export async function editComment(prevState, formData) {
    const note = formData.get('commentText');
    const noteId = formData.get('commentId');

    try {
        await connectDB();

        const updates = {};

        if (note) {
            updates.note = note;
        }

        const updatedNote = await Note.findByIdAndUpdate(noteId, { $set: updates }, { new: true });

        if (!updatedNote) {
            return {
                success: false,
                message: "Could not update comment"
            }
        }

        revalidatePath('/', 'layout');

        return {
            success: true,
            message: "Update successfully"
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}