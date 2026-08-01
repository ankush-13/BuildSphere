import api from "../api/axios";

// =====================================
// Get All Tasks
// =====================================

export const getTasks = (projectId) =>
    api.get(`/tasks/${projectId}`);

// =====================================
// Create Task
// =====================================

export const createTask = (projectId, data) =>
    api.post(`/tasks/${projectId}`, data);

// =====================================
// Update Task Details
// =====================================

export const updateTask = (taskId, data) =>
    api.patch(`/tasks/task/${taskId}`, data);

// =====================================
// Update Task Status (Drag & Drop)
// =====================================

export const updateTaskStatus = (taskId, status) =>
    api.patch(`/tasks/${taskId}/status`, {
        status,
    });

// =====================================
// Delete Task
// =====================================

export const deleteTask = (taskId) =>
    api.delete(`/tasks/task/${taskId}`);


// =====================================
// Get Project Members
// =====================================

export const getProjectMembers = (projectId) =>
    api.get(`/tasks/${projectId}/members`);