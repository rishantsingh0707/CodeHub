import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DailyTask',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;