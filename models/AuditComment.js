import { Schema, model, models } from "mongoose";
import Audit from "./Audit";

const auditCommentSchema = new Schema({
    auditComment: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    auditId: {
        type: Schema.Types.ObjectId,
        ref: "Audit",
        required: true
    },
}, { timestamps: true });

const AuditComment = models.AuditComment || model('AuditComment', auditCommentSchema);
export default AuditComment;