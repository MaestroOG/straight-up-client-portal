import { Schema, models, model } from 'mongoose';
import Discussion from './Discussion';
import User from './User';

const opinionSchema = new Schema({
    opinion: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    discussionId: {
        type: Schema.Types.ObjectId,
        ref: "Discussion",
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

const Opinion = models.Opinion || model('Opinion', opinionSchema);
export default Opinion;