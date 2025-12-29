import { Schema, model, models } from "mongoose";

const FaqSchema = new Schema(
    {
        serviceSlug: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true,
        },

        question: {
            type: String,
            required: true,
            trim: true,
        },

        answer: {
            type: String,
            required: true,
            trim: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Faq = models.Faq || model("Faq", FaqSchema);
export default Faq;
