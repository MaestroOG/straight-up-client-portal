import { Schema, models, model } from "mongoose";

const howToVideoSchema = new Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    videoLink: {
        type: String,
        unique: true,
        trim: true,
        required: true
    }
}, { timestamps: true });

const HowToVideo = models.HowToVideo || model('HowToVideo', howToVideoSchema);
export default HowToVideo;