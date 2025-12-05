import Discussion from "@/models/Discussion";
import { connectDB } from "./mongodb";
import User from "@/models/User";
import Opinion from "@/models/Opinion";
import mongoose from "mongoose";

export async function getAllDiscussions() {
    await connectDB();
    const discussions = await Discussion.find({}).populate('createdBy').sort({ createdAt: -1 }).lean();
    return discussions;
}

export async function getDiscussionById(id) {
    await connectDB();
    const discussion = await Discussion.findById(id).populate('createdBy').lean();
    return discussion;
}

export async function getOpinionsByDiscussionId(discussionId) {
    await connectDB();
    const opinions = await Opinion.find({ discussionId }).populate('createdBy').sort({ createdAt: -1 }).lean();
    return opinions;
}

export async function getUnreadOpinionsCount(discussionId, userId) {
    try {
        await connectDB()

        const count = await Opinion.countDocuments({
            discussionId,
            readBy: { $ne: userId }, // Not in readBy
        })

        return count
    } catch (error) {
        console.error("Error getting unread opinions count:", error);
        return 0;
    }
}

export async function getUnreadCountsForUser(userId) {
    await connectDB()

    const unreadCounts = await Opinion.aggregate([
        {
            $match: {
                readBy: { $ne: new mongoose.Types.ObjectId(userId) },
            },
        },
        {
            $group: {
                _id: '$discussionId',
                unreadCount: { $sum: 1 },
            },
        },
    ])

    // Convert to a simple { [discussionId]: count } object
    const countsMap = {}
    unreadCounts.forEach((d) => {
        countsMap[d._id.toString()] = d.unreadCount
    })

    return countsMap
}