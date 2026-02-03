import { Schema, model, models } from "mongoose";
import Project from "./Project";
import User from "./User";

const FileSchema = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "uploaded", "failed"],
        default: "pending"
    },
    uploaderRole: {
        type: String,
        enum: ["superadmin", "team-member", "user"],
        required: true,
        default: "user"
    },
    fileName: {
        type: String,
    },
    mimeType: {
        type: String,
    },
    size: {
        type: String,
    },
    storagePath: {
        type: String,
        unique: true,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const File = models.File || model("File", FileSchema);
export default File;