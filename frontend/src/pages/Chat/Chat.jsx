import MessageBubble from "../../components/chat/MessageBubble";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import { socket } from "../../socket/socket";
import { useAuth } from "../../context/AuthContext";

import {
    getMessages,
    sendMessage,
    uploadChatFile,
} from "../../services/chat.service";

export default function Chat() {
    const { projectId } = useParams();
    const { user } = useAuth();

    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [typingUser, setTypingUser] = useState("");
    const [onlineUsers, setOnlineUsers] = useState([]);

    const messagesEndRef = useRef(null);

    // ------------------------
    // Load Previous Messages
    // ------------------------

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const res = await getMessages(projectId);
                setMessages(res.data.data || []);
            } catch (err) {
                console.error(err);
            }
        };

        loadMessages();
    }, [projectId]);

    // ------------------------
    // Socket Connection
    // ------------------------

    useEffect(() => {
        socket.connect();

        socket.emit("joinProject", projectId);

        socket.on("connect", () => {
            setConnected(true);

            socket.emit("userOnline", {
                userId: user?._id,
            });
        });

        socket.on("disconnect", () => {
            setConnected(false);
        });

        socket.on("onlineUsers", (users) => {
            setOnlineUsers(users || []);
        });

        socket.on("receiveMessage", (message) => {
            console.log("Socket Message:", message);
            setMessages((prev) => [...prev, message]);
        });

        socket.on("userTyping", ({ user }) => {
            setTypingUser(user);
        });

        socket.on("userStoppedTyping", () => {
            setTypingUser("");
        });

        return () => {
            socket.emit("leaveProject", projectId);

            socket.off("connect");
            socket.off("disconnect");
            socket.off("onlineUsers");
            socket.off("receiveMessage");
            socket.off("userTyping");
            socket.off("userStoppedTyping");

            socket.disconnect();
        };
    }, [projectId, user]);

    // ------------------------
    // Auto Scroll
    // ------------------------

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    // ------------------------
    // Send Text Message
    // ------------------------

    const handleSend = async () => {
        if (!text.trim()) return;

        try {
            await sendMessage(projectId, {
                text,
            });

            setText("");

            socket.emit("stopTyping", {
                projectId,
            });
        } catch (err) {
            console.error(err);
        }
    };

    // ------------------------
    // Upload File
    // ------------------------

    const handleFileUpload = async () => {
        if (!selectedFile) return;

        try {
            const formData = new FormData();

            formData.append("file", selectedFile);

            if (text.trim()) {
                formData.append("text", text);
            }

            await uploadChatFile(projectId, formData);

            setSelectedFile(null);
            setText("");

            const fileInput = document.getElementById("chat-file");
            if (fileInput) fileInput.value = "";
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto">
                {/* Header */}

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Project Chat</h1>

                    <span
                        className={`font-semibold ${
                            connected
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {connected
                            ? "🟢 Connected"
                            : "🔴 Disconnected"}
                    </span>
                </div>

                {/* Chat Box */}

                <div className="bg-white rounded-xl shadow-md h-[500px] overflow-y-auto overflow-x-hidden p-5">
                    {messages.length === 0 ? (
                        <p className="text-center text-gray-500 mt-20">
                            No messages yet.
                        </p>
                    ) : (
                       messages.map((message) => {

    const isMine =
        message.sender?._id === user?._id;

    return (

        <MessageBubble
            key={message._id}
            message={message}
            isMine={isMine}
            onlineUsers={onlineUsers}
        />

    );

})
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Typing Indicator */}

                {typingUser && (
                    <p className="text-sm italic text-gray-500 mt-3">
                        {typingUser} is typing...
                    </p>
                )}

                {/* Selected File */}

                {selectedFile && (
                    <div className="flex items-center justify-between mt-3 p-3 bg-gray-100 rounded-lg">
                        <p className="text-sm truncate">
                            📎 {selectedFile.name}
                        </p>

                        <button
                            onClick={() =>
                                setSelectedFile(null)
                            }
                            className="text-red-500 font-semibold"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Input Area */}

                <div className="flex gap-3 mt-4">
                    <input
                        type="text"
                        value={text}
                        placeholder="Type your message..."
                        className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                            setText(e.target.value);

                            socket.emit("typing", {
                                projectId,
                                user: user.fullName,
                            });

                            clearTimeout(window.typingTimeout);

                            window.typingTimeout =
                                setTimeout(() => {
                                    socket.emit(
                                        "stopTyping",
                                        {
                                            projectId,
                                        }
                                    );
                                }, 1000);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSend();
                            }
                        }}
                    />

                    <input
                        id="chat-file"
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                            setSelectedFile(
                                e.target.files?.[0] || null
                            )
                        }
                    />

                    <label
                        htmlFor="chat-file"
                        className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 rounded-lg flex items-center"
                    >
                        📎
                    </label>

                    <button
                        onClick={handleFileUpload}
                        disabled={!selectedFile}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-5 rounded-lg transition"
                    >
                        Upload
                    </button>

                    <button
                        onClick={handleSend}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </Layout>
    );
}