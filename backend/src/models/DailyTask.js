import mongoose from "mongoose";

const DailyTaskSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
}, { timestamps: true });

const DailyTask = mongoose.model("DailyTask", DailyTaskSchema);

export default DailyTask;