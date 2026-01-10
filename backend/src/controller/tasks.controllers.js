import DailyTask from '../models/DailyTask.js';
import User from "../models/User.js";
import Comment from '../models/Comment.js';

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Task ID is required.' });
        }

        const task = await DailyTask
            .findById(id)
            .populate('createdBy', 'username')
            .lean();

        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        return res.status(200).json({ task });

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const getAllDailyTasks = async (req, res) => {
    try {
        const tasks = await DailyTask
            .find()
            .populate("createdBy", "name followers")
            .sort({ createdAt: -1 });

        const tasksWithComments = await Promise.all(
            tasks.map(async (task) => {
                const commentCount = await Comment.countDocuments({
                    taskId: task._id
                });

                return {
                    ...task.toObject(),
                    commentCount,
                    hasComments: commentCount > 0
                };
            })
        );

        res.status(200).json(tasksWithComments);
    } catch (error) {
        console.error('Error fetching all daily tasks:', error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createDailyTask = async (req, res) => {
    try {
        const userId = req.user._id;
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required." });
        }

        const task = await DailyTask.create({
            createdBy: userId,
            title,
            content,
        });

        const user = await User.findById(userId);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!user.lastActive) {
            user.currentStreak = 1;
        } else {
            const lastActive = new Date(user.lastActive);
            lastActive.setHours(0, 0, 0, 0);

            const diffInDays =
                (today - lastActive) / (1000 * 60 * 60 * 24);

            if (diffInDays === 1) {
                user.currentStreak += 1;
            } else if (diffInDays > 1) {
                user.currentStreak = 1;
            }
        }

        user.longestStreak = Math.max(
            user.longestStreak,
            user.currentStreak
        );

        user.lastActive = new Date();
        await user.save();

        res.status(201).json({
            task,
            currentStreak: user.currentStreak,
            longestStreak: user.longestStreak,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

export const deleteDailyTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const task = await DailyTask.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }

        if (task.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Not authorized." });
        }

        await task.deleteOne();

        res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

export const likeDailyTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const task = await DailyTask.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const alreadyLiked = task.likes.some(
            id => id.toString() === userId.toString()
        );

        if (alreadyLiked) {
            task.likes.pull(userId); // unlike
        } else {
            task.likes.push(userId); // like
        }

        await task.save();

        res.status(200).json({
            likesCount: task.likes.length,
            liked: !alreadyLiked
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};
