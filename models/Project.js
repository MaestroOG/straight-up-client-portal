import { Schema, models, model } from "mongoose";

const projectSchema = new Schema({
    projectTitle: { type: String, required: true },
    service: { type: String, required: true },
    fields: { type: Object, required: true }, // stores dynamic form data
    status: { type: String, enum: ['pending', 'in-progress', 'completed', 'rejected', 'archived'], default: 'pending' },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" }, // user ID of the creator
    packageSelected: { type: String, required: true },
    byAdmin: { type: Boolean, default: false },
}, { timestamps: true });

const Project = models.Project || model('Project', projectSchema);

export default Project;