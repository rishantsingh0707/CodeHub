import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getDailyTasks, createDailyTask, deleteDailyTask,likeDailyTask } from '../controller/tasks.controllers.js';

const router = express.Router();

// Task routes

router.get("/:id", protect,getDailyTasks);
router.delete("/:id/delete", protect, deleteDailyTask);
router.post("/post", protect, createDailyTask);

// like routes

router.post("/:id/like", protect, likeDailyTask);

export default router;