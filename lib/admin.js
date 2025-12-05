import PendingUser from "@/models/PendingUser";
import { connectDB } from "./mongodb";
import User from "@/models/User";
import Project from "@/models/Project";
import Note from "@/models/Note";
import DeletedUser from "@/models/DeletedUser";
import { getUser, getUserFromDB } from "./user";
import { toCamelCase } from "@/utils/formUtils";
import Resource from "@/models/Resource";
import HowToVideo from "@/models/HowToVideo";
import Expenditure from "@/models/Expenditure";
import Category from "@/models/Category";

export async function getAllAdminAndManagers() {
    try {
        await connectDB();
        const users = await User.find({
            role: { $in: ['superadmin', 'manager'] }
        }).lean();

        return users;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getAllPendingUsers() {
    await connectDB();
    return await PendingUser.find({});
}

export async function getPendingUserById(id) {
    await connectDB();
    return await PendingUser.findById(id);
}

export async function getAllUsers() {
    await connectDB();
    return await User.find({}).sort({ createdAt: -1 }).lean();
}

export async function getUserById(userId) {
    await connectDB();
    return User.findById(userId).lean();
}

export async function getAllComments(page = 1, limit = 10) {
    await connectDB();

    const skip = (page - 1) * limit;

    const notes = await Note.find({ projectId: { $ne: null } })
        .populate("createdBy")
        .populate("projectId")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    const total = await Note.countDocuments({ projectId: { $ne: null } });

    return {
        notes: JSON.parse(JSON.stringify(notes)),
        hasMore: skip + notes.length < total,
    };
}

export async function getAllDeletedUsers() {
    await connectDB();
    return await DeletedUser.find({}).lean();
}

export async function getAllSimpleUsers() {
    await connectDB();
    return await User.find({ role: 'user' }).lean();
}

export async function getAllManagerRelatedProjects() {
    await connectDB();
    const user = await getUserFromDB();

    if (!user || !user.serviceManager || user.serviceManager.length === 0) {
        return [];
    }

    const normalizedServices = user.serviceManager.map(service =>
        toCamelCase(service)
    );

    const projects = await Project.find({
        service: { $in: normalizedServices }
    }).lean();

    return projects;
}

export async function getAllProjects() {
    await connectDB();
    return await Project.find({
        status: { $nin: ['rejected', 'completed', 'archived'] }
    })
        .populate("createdBy")
        .sort({ createdAt: -1 })
        .lean();

}

export async function getAllCompletedProjectsThisMonth() {
    await connectDB();

    const count = await Project.countDocuments({
        status: "completed",
    });

    return count;
}


export async function getAllPendingProjectsThisMonth() {
    await connectDB();

    const count = await Project.countDocuments({
        status: "pending",
    });

    return count;
}


export async function getAllRunningProjectsThisMonth() {
    await connectDB();

    const count = await Project.countDocuments({
        status: "in-progress",
    });

    return count;
}


export async function getAllPartners() {
    await connectDB();
    return await User.find({ role: 'user' }).lean();
}


export async function getAllResources() {
    await connectDB();
    return await Resource.find({}).sort({ createdAt: -1 }).populate("category").lean();
}

export async function getAllHowToVideos() {
    await connectDB();
    return await HowToVideo.find({}).sort({ createdAt: -1 }).lean();
}

export const getAllCommentsOnUserProjects = async (userId) => {
    try {
        await connectDB();

        if (!userId) {
            throw new Error("userId is required");
        }
        // Step 1: find all project IDs created by the user
        const userProjects = await Project.find({ createdBy: userId }).select("_id");

        const projectIds = userProjects.map((project) => project._id);

        // Step 2: find all notes that belong to those projects
        const notes = await Note.find({ projectId: { $in: projectIds } })
            .populate("createdBy", "name email") // optional
            .populate("projectId", "title") // optional
            .sort({ createdAt: -1 });

        return notes;
    } catch (error) {
        console.error("Error fetching comments on user's projects:", error);
        throw error;
    }
};

export async function addExpenditure(forUserId, amount) {
    try {
        await connectDB();
        const updatedExpenditure = await Expenditure.findOneAndUpdate(
            { forUser: forUserId },
            { $inc: { expenditure: amount } }, // increment the existing amount
            { upsert: true, new: true, setDefaultsOnInsert: true } // create if not exists
        );

        if (updatedExpenditure.expenditure < 0) {
            updatedExpenditure.expenditure = 0;
            await updatedExpenditure.save();
        }

        return updatedExpenditure;
    } catch (error) {
        console.error("Error adding expenditure:", error);
        throw error;
    }
}

export async function getTotalExpenditureForUser(userId) {
    try {
        await connectDB();
        const now = new Date();
        const currentMonth = now.getMonth() + 1; // 1–12
        const currentYear = now.getFullYear();

        const monthlyTotal = await Expenditure.aggregate([
            {
                $match: {
                    forUser: new mongoose.Types.ObjectId(userId),
                    $expr: {
                        $and: [
                            { $eq: [{ $year: "$createdAt" }, currentYear] },
                            { $eq: [{ $month: "$createdAt" }, currentMonth] },
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalExpenditure: { $sum: "$expenditure" },
                },
            },
        ]);

        return monthlyTotal[0]?.totalExpenditure || 0;
    } catch (error) {
        console.error("Error fetching total expenditure:", error);
        return null;
    }
}

export async function getTotalExpenditure() {
    try {
        await connectDB();
        const now = new Date();
        const currentMonth = now.getMonth() + 1; // 1-12
        const currentYear = now.getFullYear();

        const monthlyTotal = await Expenditure.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $year: "$createdAt" }, currentYear] },
                            { $eq: [{ $month: "$createdAt" }, currentMonth] },
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalExpenditure: { $sum: "$expenditure" },
                },
            },
        ]);

        const totalExpenditure = monthlyTotal[0]?.totalExpenditure || 0;
        return totalExpenditure;
    } catch (error) {
        console.error("Error fetching total expenditure:", error);
        return null;
    }
}

export async function getResourceCategories() {
    try {
        await connectDB();
        const categories = await Category.find({}).sort({ createdAt: -1 }).lean();
        return categories;
    } catch (error) {
        console.error("Error fetching resource categories:", error);
        return null;
    }
}

export async function getAllUnreadComments(userId) {
    try {
        if (!userId) throw new Error("User ID is required");

        await connectDB();

        const unreadNotes = await Note.find({
            readBy: { $nin: [userId] },
        })
            .populate("createdBy")
            .populate("projectId")
            .sort({ createdAt: -1 }).lean();

        return unreadNotes;
    } catch (error) {
        console.error(error);
        return [];
    }
}