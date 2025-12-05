import { Schema, model, models } from "mongoose";
import User from "./User";

const noteSchema = new Schema({
    note: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    readBy: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: [],
        },
    ],
}, { timestamps: true });

const Note = models.Note || model('Note', noteSchema);
export default Note;