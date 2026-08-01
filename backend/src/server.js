import dotenv from "dotenv";
dotenv.config();

// console.log("CLIENT_URL =", process.env.CLIENT_URL);

// console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API Key:", process.env.CLOUDINARY_API_KEY);
// console.log(
//     "API Secret Exists:",
//     process.env.CLOUDINARY_API_SECRET ? "YES" : "NO"
// );

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./db/connectDB.js";

const PORT = process.env.PORT || 8000;

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.IO
export const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
    },
});

// ===============================
// Online Users
// ===============================

const onlineUsers = new Map();

// ===============================
// Socket.IO
// ===============================

io.on("connection", (socket) => {

    console.log("🟢 User Connected:", socket.id);

    // ----------------------------
    // User came online
    // ----------------------------

    socket.on("userOnline", ({ userId }) => {

        onlineUsers.set(userId, socket.id);

        io.emit(
            "onlineUsers",
            Array.from(onlineUsers.keys())
        );

    });

    // ----------------------------
    // Join Project Room
    // ----------------------------

    socket.on("joinProject", (projectId) => {

        socket.join(projectId);

        console.log(
            `📁 ${socket.id} joined ${projectId}`
        );

    });

    // ----------------------------
    // Leave Project Room
    // ----------------------------

    socket.on("leaveProject", (projectId) => {

        socket.leave(projectId);

        console.log(
            `🚪 ${socket.id} left ${projectId}`
        );

    });

    // ----------------------------
    // Typing Indicator
    // ----------------------------

    socket.on("typing", ({ projectId, user }) => {

        socket.to(projectId).emit("userTyping", {
            user,
        });

    });

    socket.on("stopTyping", ({ projectId }) => {

        socket.to(projectId).emit(
            "userStoppedTyping"
        );

    });

    // ----------------------------
    // Disconnect
    // ----------------------------

    socket.on("disconnect", () => {

        console.log(
            "🔴 User Disconnected:",
            socket.id
        );

        for (const [userId, id] of onlineUsers.entries()) {

            if (id === socket.id) {

                onlineUsers.delete(userId);

                break;

            }

        }

        io.emit(
            "onlineUsers",
            Array.from(onlineUsers.keys())
        );

    });

});

// ===============================
// Start Server
// ===============================

const startServer = async () => {

    try {

        await connectDB();

        server.listen(PORT, () => {

            console.log(
                `🚀 Server running on http://localhost:${PORT}`
            );

        });

    } catch (error) {

        console.error(
            "❌ Server Failed to Start"
        );

        console.error(error);

    }

};

startServer();