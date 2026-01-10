import Comment from '../models/Comment.js';

export const createComment = async (req, res) => {
    try {
        const user = req.user;
        const { comment } = req.body;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Task ID is required.' });
        }
        const commentText = comment?.trim();
        if (!commentText) {
            return res.status(400).json({ message: 'Comment cannot be empty.' });
        }

        if (!comment) {
            return res.status(400).json({ message: 'Comment is required.' });
        }
        const newComment = {
            taskId: id,
            createdBy: user.id,
            comment,
        };

        const savedComment = await Comment.create(newComment);

        return res.status(201).json({ message: 'Comment created successfully.', comment: savedComment });
    } catch (error) {
        console.error('Error creating comment in create controller:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

export const getCommentsByTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Task ID is required.' });
        }
        const comments = await Comment.find({ taskId: id }).populate('createdBy', 'name').sort({ createdAt: -1 });
    
        return res.status(200).json({ comments });
    } catch (error) {
        console.error('Error fetching comments in getCommentsByTask controller:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        if (!commentId) {
            return res.status(400).json({ message: 'Comment ID is required.' });
        }
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found.' });
        }
        return res.status(200).json({ message: 'Comment deleted successfully.' });
    } catch (error) {
        console.error('Error deleting comment in deleteComment controller:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}