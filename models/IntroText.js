import { Schema, model, models } from 'mongoose';

const IntroTextSchema = new Schema({
    text: {
        type: String,
        required: true
    },
}, { timestamps: true });

const IntroText = models.IntroText || model('IntroText', IntroTextSchema);
export default IntroText;