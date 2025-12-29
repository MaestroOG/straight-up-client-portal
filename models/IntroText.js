import { Schema, model, models } from 'mongoose';
import User from './User.js';

const IntroTextSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const IntroText = models.IntroText || model('IntroText', IntroTextSchema);
export default IntroText;