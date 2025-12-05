import { Schema, models, model } from 'mongoose';
import User from './User';

const discussionSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    topic: {
        type: String,
        required: true,
        trim: true
    },
    subtitle: {
        type: String,
        trim: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, { timestamps: true });

const Discussion = models.Discussion || model('Discussion', discussionSchema);
export default Discussion;