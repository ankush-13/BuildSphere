import api from "../api/axios";

// Existing
export const getMyProjects = () =>
    api.get("/projects/my-projects");

export const createProject = (data) =>
    api.post("/projects/create", data);

export const getProjectById = (id) =>
    api.get(`/projects/${id}`);

export const searchProjects = (query) =>
    api.get(`/projects/search?query=${query}`);

// ==========================
// JOIN REQUESTS
// ==========================

export const sendJoinRequest = (
    projectId,
    message = ""
) =>
    api.post(
        `/projects/${projectId}/join`,
        { message }
    );

export const getJoinRequests = (
    projectId
) =>
    api.get(
        `/projects/${projectId}/join-requests`
    );

export const acceptJoinRequest = (
    projectId,
    userId
) =>
    api.post(
        `/projects/${projectId}/accept/${userId}`
    );

export const rejectJoinRequest = (
    projectId,
    userId
) =>
    api.post(
        `/projects/${projectId}/reject/${userId}`
    );