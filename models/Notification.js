import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    recipients: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    sendToAll: {
        type: Boolean,
        default: false
    },
    readBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: [],
        },
    ],
}, { timestamps: true });


const Notification = mongoose.models?.Notification || mongoose.model("Notification", notificationSchema);
export default Notification;