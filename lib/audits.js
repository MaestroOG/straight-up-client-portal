import Audit from "@/models/Audit";
import { connectDB } from "./mongodb";
import AuditComment from "@/models/AuditComment";

export async function getAllAudits() {
    try {
        await connectDB();
        const audits = await Audit.find({}).populate('createdBy').lean();
        return audits;
    } catch (error) {
        console.error("Error fetching audits:", error);
        return [];
    }
}

export async function getAllUserAudits(userId) {
    try {
        await connectDB();
        const audits = await Audit.find({ createdBy: userId }).populate('createdBy').lean();
        return audits;
    } catch (error) {
        console.error("Error fetching audits:", error);
        return [];
    }
}

export async function getAuditById(auditId) {
    try {
        await connectDB();
        const audit = await Audit.findById(auditId).populate('createdBy').lean();
        return audit;
    } catch (error) {
        console.error("Error fetching audit by ID:", error);
        return null;
    }
}

export async function getAuditCommentsbyAuditId(auditId) {
    try {
        await connectDB();
        const auditComments = await AuditComment.find({ auditId }).populate('createdBy').lean();
        return auditComments;
    } catch (error) {
        console.error("Error fetching audit comments by audit ID:", error);
        return [];
    }
}