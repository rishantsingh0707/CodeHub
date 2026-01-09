import express from 'express';

const router = express.Router();

// comment routes
router.get("/:id/get", protect);
router.post("/:id/post", protect);
router.delete("/:id/comment/:commentId", protect);