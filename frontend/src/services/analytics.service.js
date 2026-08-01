import api from "../api/axios";

// ===============================
// Get Analytics
// ===============================

export const getAnalytics = () =>
    api.get("/analytics");