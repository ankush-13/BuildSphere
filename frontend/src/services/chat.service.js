import api from "../api/axios";

export const getMessages = (projectId) =>
    api.get(`/chat/${projectId}`);

export const sendMessage = (projectId, data) =>
    api.post(`/chat/${projectId}`, data);

export const uploadChatFile = (projectId, formData) =>
    api.post(`/chat/${projectId}/file`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });