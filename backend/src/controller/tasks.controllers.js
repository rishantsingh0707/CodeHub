import DailyTask from '../models/DailyTask.js';

export const getDailyTasks = async (req, res) => {
    try {
        const userId = req.user._id;

        const tasks = await DailyTask.find({ createdBy: userId });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


export const createDailyTask = async (req, res) => {
    try {
        const userId = req.user._id;
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required.' });
        }

        const newTask = new DailyTask({
            createdBy: userId,
            title,
            content,
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.error('Error creating daily task:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
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
