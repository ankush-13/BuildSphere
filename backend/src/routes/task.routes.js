import { Router } from "express";

import {
    createTask,
    getTasks,
    getProjectMembers,
    updateTask,
    deleteTask,
    updateTaskStatus,
} from "../controllers/task.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// =====================================
// Get All Tasks of a Project
// Create New Task
// =====================================


router.get(
    "/:projectId/members",
    verifyJWT,
    getProjectMembers
);

router
    .route("/:projectId")
    .get(verifyJWT, getTasks)
    .post(verifyJWT, createTask);

// =====================================
// Update Task Details
// Delete Task
// =====================================

router
    .route("/task/:taskId")
    .patch(verifyJWT, updateTask)
    .delete(verifyJWT, deleteTask);

// =====================================
// Update Task Status (Drag & Drop)
// =====================================

router.patch(
    "/:taskId/status",
    verifyJWT,
    updateTaskStatus
);

export default router;