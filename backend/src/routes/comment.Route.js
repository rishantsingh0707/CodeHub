import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createComment, getCommentsByTask, deleteComment } from '../controller/comment.controller.js';
const router = express.Router();

// comment routes
router.get("/:id/get", protect, getCommentsByTask);
router.post("/:id/post", protect, createComment);
router.delete("/:id/comment/:commentId", protect, deleteComment);

export default router;