import authRouter from "./routes/auth.routes.js";
import projectRouter from "./routes/project.routes.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dashboardRouter from "./routes/dashboard.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import chatRouter from "./routes/chat.routes.js";
import taskRouter from "./routes/task.routes.js";
import aiRouter from "./routes/ai.routes.js";
import analyticsRouter from "./routes/analytics.routes.js";

const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/cors-test", (req, res) => {
    res.json({
        success: true,
        message: "CORS works"
    });
});

app.use(
    "/api/v1/auth",
    authRouter
);

app.use(
    "/api/v1/projects",
    projectRouter
);

app.use("/api/v1/dashboard", dashboardRouter);

app.use("/api/v1/analytics", analyticsRouter);

app.use("/api/v1/notifications", notificationRouter);

app.use(
    "/api/v1/tasks",
    taskRouter
);

app.use("/api/v1/chat", chatRouter);



app.use(
    "/api/v1/messages",
    chatRouter
);

app.use("/api/v1/ai", aiRouter);


// Test Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 BuildSphere API is running..."
    });
});

export default app;