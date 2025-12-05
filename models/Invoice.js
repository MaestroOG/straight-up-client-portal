import { Schema, model, models } from "mongoose";
import User from "./User";

const invoiceSchema = new Schema({
    status: {
        type: String,
        enum: ["Paid", "Pending"]
    },
    partner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    detail: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Invoice = models.Invoice || model('Invoice', invoiceSchema);
export default Invoice;