import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {getAllDailyTasks, getTaskById, createDailyTask, deleteDailyTask,likeDailyTask } from '../controller/tasks.controllers.js';

const router = express.Router();

// Task routes

router.get("/", protect, getAllDailyTasks);
router.get("/:id", protect,getTaskById);
router.delete("/:id/delete", protect, deleteDailyTask);
router.post("/post", protect, createDailyTask);

// like routes

router.post("/:id/like", protect, likeDailyTask);

export default router;