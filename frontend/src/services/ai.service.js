import api from "../api/axios";

export const askAI = (prompt) =>
    api.post("/ai/chat", {
        prompt,
    });