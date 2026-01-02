import { Schema, models, model } from "mongoose";

const auditSchema = new Schema({
    auditTitle: { type: String, required: true },
    service: { type: String, required: true },
    fields: { type: Object, required: true }, // stores dynamic form data
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" }, // user ID of the creator
    byAdmin: { type: Boolean, default: false },
}, { timestamps: true });

const Audit = models.Audit || model('Audit', auditSchema);

export default Audit;