import { io } from "../server.js";

import Task from "../models/Task.model.js";
import Project from "../models/Project.model.js";

import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// =======================================
// Create Task
// =======================================

const createTask = AsyncHandler(async (req, res) => {

    const { projectId } = req.params;

    const {
        title,
        description,
        assignee,
        priority,
        dueDate,
    } = req.body;

    if (!title) {
        throw new ApiError(400, "Task title is required");
    }

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    const isMember = project.members.some(
        member => member.toString() === req.user._id.toString()
    );

    if (!isMember) {
        throw new ApiError(
            403,
            "Only project members can create tasks"
        );
    }

    const task = await Task.create({

        title,

        description,

        project: projectId,

        createdBy: req.user._id,

        assignee: assignee || null,

        priority: priority || "medium",

        dueDate: dueDate || null,

    });

    const populatedTask =
        await Task.findById(task._id)
            .populate("createdBy", "fullName username")
            .populate("assignee", "fullName username");
            io.to(projectId).emit(
            "taskCreated",
                  populatedTask
            );

    return res.status(201).json(

        new ApiResponse(
            201,
            populatedTask,
            "Task created successfully"
        )

    );

});

// =======================================
// Get All Tasks
// =======================================

const getTasks = AsyncHandler(async (req, res) => {

    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    const isMember = project.members.some(
        member => member.toString() === req.user._id.toString()
    );

    if (!isMember) {
        throw new ApiError(
            403,
            "Only project members can view tasks"
        );
    }

    const tasks = await Task.find({

        project: projectId,

    })
        .populate("createdBy", "fullName username")
        .populate("assignee", "fullName username")
        .sort({
            createdAt: -1,
        });

    return res.status(200).json(

        new ApiResponse(
            200,
            tasks,
            "Tasks fetched successfully"
        )

    );

});


// =======================================
// Get Project Members
// =======================================

const getProjectMembers = AsyncHandler(async (req, res) => {

    const { projectId } = req.params;

    const project = await Project.findById(projectId)
        .populate(
            "members",
            "fullName username avatar"
        );

    if (!project) {

        throw new ApiError(
            404,
            "Project not found"
        );

    }

    const isMember = project.members.some(
        (member) =>
            member._id.toString() ===
            req.user._id.toString()
    );

    if (!isMember) {

        throw new ApiError(
            403,
            "Only project members can view members list"
        );

    }

    return res.status(200).json(

        new ApiResponse(
            200,
            project.members,
            "Project members fetched successfully"
        )

    );

});

// =======================================
// Update Task
// =======================================

const updateTask = AsyncHandler(async (req, res) => {

    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    Object.assign(task, req.body);
    
    task.status = req.body.status;

    await task.save();

    const updatedTask =
        await Task.findById(task._id)
            .populate("createdBy", "fullName username")
            .populate("assignee", "fullName username");

        io.to(task.project.toString()).emit(
    "taskUpdated",
    updatedTask
);

    return res.status(200).json(

        new ApiResponse(
            200,
            updatedTask,
            "Task updated successfully"
        )

    );

});

const updateTaskStatus = AsyncHandler(async (req, res) => {

    const { taskId } = req.params;
    const { status } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    task.status = status;

    await task.save();

    const updatedTask = await Task.findById(task._id)
        .populate("createdBy", "fullName username")
        .populate("assignee", "fullName username");

    return res.status(200).json(

        new ApiResponse(
            200,
            updatedTask,
            "Task status updated successfully"
        )

    );

});

// =======================================
// Delete Task
// =======================================

const deleteTask = AsyncHandler(async (req, res) => {

    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }
    
    const projectId = task.project.toString();

    await task.deleteOne();

    io.to(projectId).emit(
    "taskDeleted",
    taskId
);

    return res.status(200).json(

        new ApiResponse(
            200,
            {},
            "Task deleted successfully"
        )

    );

});

export {

    createTask,

    getTasks,

    getProjectMembers,

    updateTask,

    updateTaskStatus,

    deleteTask,

};