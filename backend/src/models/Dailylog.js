import mongoose from "mongoose";

const DailylogSchema = new mongoose.Schema({
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
    likeCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Dailylog = mongoose.model("Dailylog", DailylogSchema);

export default Dailylog;