import { useEffect, useRef, useState } from "react";

import Layout from "../../components/layout/Layout";
import MessageBubble from "../../components/AI/MessageBubble";

import { askAI } from "../../services/ai.service";

export default function AI() {
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    const suggestions = [
        "Build a React Login Page",
        "Suggest a MERN project",
        "Explain React Hooks",
        "Generate README.md",
        "Debug my JavaScript code",
        "Create MongoDB Schema",
    ];

    // Auto Scroll

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    const handleAsk = async () => {
        if (!prompt.trim()) return;

        const currentPrompt = prompt;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: currentPrompt,
            },
        ]);

        setPrompt("");

        try {
            setLoading(true);

            const res = await askAI(currentPrompt);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: res.data.data.reply,
                },
            ]);
        } catch (err) {
            console.error(err);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "❌ Sorry! I couldn't generate a response. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto h-[calc(100vh-120px)] flex flex-col">

                {/* Header */}

                <div className="mb-6">

                    <h1 className="text-4xl font-bold">
                        🤖 BuildSphere AI Copilot
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Your intelligent assistant for MERN development,
                        debugging, resume building, project ideas and
                        placement preparation.
                    </p>

                </div>

                {/* Chat */}

                <div className="flex-1 bg-gray-100 rounded-2xl shadow overflow-y-auto p-6">

                    {messages.length === 0 && (

                        <div className="flex flex-col items-center justify-center h-full text-center">

                            <div className="text-7xl mb-6">
                                🤖
                            </div>

                            <h2 className="text-3xl font-bold mb-3">
                                Welcome to BuildSphere AI
                            </h2>

                            <p className="text-gray-500 max-w-xl mb-8">
                                Ask me anything about React, Node.js,
                                MongoDB, Express, JavaScript, Git,
                                Resume Building, Placement Preparation,
                                DSA, Project Ideas or Debugging.
                            </p>

                        </div>

                    )}

                    {messages.map((msg, index) => (

                        <MessageBubble
                            key={index}
                            role={msg.role}
                            content={msg.content}
                        />

                    ))}

                    {loading && (
                        <MessageBubble loading />
                    )}

                    <div ref={bottomRef}></div>

                </div>

                {/* Suggested Prompts */}

                <div className="flex flex-wrap gap-3 mt-5">

                    {suggestions.map((item, index) => (

                        <button
                            key={index}
                            onClick={() => setPrompt(item)}
                            className="bg-white border hover:bg-blue-50 hover:border-blue-500 transition px-4 py-2 rounded-full text-sm shadow"
                        >
                            💡 {item}
                        </button>

                    ))}

                </div>

                {/* Input */}

                <div className="mt-5">

                    <div className="flex justify-between items-center mb-3">

                        <h2 className="font-semibold text-gray-700">
                            Chat
                        </h2>

                        <button
                            onClick={() => setMessages([])}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                            🗑 Clear Chat
                        </button>

                    </div>

                    <div className="flex gap-4">

                        <textarea
                            rows={2}
                            value={prompt}
                            onChange={(e) =>
                                setPrompt(e.target.value)
                            }
                            placeholder="Ask BuildSphere AI anything..."
                            className="flex-1 border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyDown={(e) => {
                                if (
                                    e.key === "Enter" &&
                                    !e.shiftKey
                                ) {
                                    e.preventDefault();
                                    handleAsk();
                                }
                            }}
                        />

                        <button
                            onClick={handleAsk}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 rounded-xl transition font-semibold"
                        >
                            {loading ? "Thinking..." : "Send"}
                        </button>

                    </div>

                </div>

            </div>
        </Layout>
    );
}