import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy, FaCheck } from "react-icons/fa";

export default function MessageBubble({
    role,
    content,
    loading = false,
}) {
    const [copied, setCopied] = useState(false);

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    if (loading) {
        return (
            <div className="flex justify-start mb-6">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg">
                        🤖
                    </div>

                    <div className="bg-white rounded-2xl shadow px-5 py-4">
                        <div className="flex gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
                            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150"></span>
                            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-300"></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const isUser = role === "user";

    return (
        <div
            className={`flex mb-6 ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >
            <div
                className={`flex gap-3 max-w-4xl ${
                    isUser ? "flex-row-reverse" : ""
                }`}
            >
                {/* Avatar */}

                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                        isUser
                            ? "bg-green-600 text-white"
                            : "bg-blue-600 text-white"
                    }`}
                >
                    {isUser ? "👤" : "🤖"}
                </div>

                {/* Bubble */}

                <div
                    className={`rounded-2xl shadow px-5 py-4 ${
                        isUser
                            ? "bg-blue-600 text-white"
                            : "bg-white"
                    }`}
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({
                                inline,
                                className,
                                children,
                                ...props
                            }) {
                                const match =
                                    /language-(\w+)/.exec(
                                        className || ""
                                    );

                                if (!inline && match) {
                                    return (
                                        <div className="relative my-4">
                                            <button
                                                onClick={() =>
                                                    copyCode(
                                                        String(
                                                            children
                                                        ).replace(
                                                            /\n$/,
                                                            ""
                                                        )
                                                    )
                                                }
                                                className="absolute right-3 top-3 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs flex items-center gap-2"
                                            >
                                                {copied ? (
                                                    <>
                                                        <FaCheck />
                                                        Copied
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaCopy />
                                                        Copy
                                                    </>
                                                )}
                                            </button>

                                            <SyntaxHighlighter
                                                style={oneDark}
                                                language={match[1]}
                                                PreTag="div"
                                                {...props}
                                            >
                                                {String(
                                                    children
                                                ).replace(
                                                    /\n$/,
                                                    ""
                                                )}
                                            </SyntaxHighlighter>
                                        </div>
                                    );
                                }

                                return (
                                    <code
                                        className="bg-gray-200 text-red-600 px-1 rounded"
                                        {...props}
                                    >
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}