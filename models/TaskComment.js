import { Schema, model, models } from "mongoose";

const taskCommentSchema = new Schema({
    commentText: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },
}, { timestamps: true });

const TaskComment = models.TaskComment || model('TaskComment', taskCommentSchema);
export default TaskComment;