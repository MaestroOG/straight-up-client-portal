import { Schema, model, models } from "mongoose";
import Category from "./Category";

const resourceSchema = new Schema({
    title: {
        type: String,
        trim: true,
        unique: true
    },
    fileUrl: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    }
}, { timestamps: true });

const Resource = models.Resource || model('Resource', resourceSchema);
export default Resource;