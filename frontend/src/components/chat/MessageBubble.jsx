export default function MessageBubble({
    message,
    isMine,
    onlineUsers,
}) {

    const isImage =
        message.attachmentType?.startsWith("image");

    return (

        <div
            className={`flex mb-4 ${
                isMine
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            <div
                className={`max-w-md w-fit px-4 py-3 rounded-2xl shadow overflow-hidden break-words ${
                    isMine
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-200"
                }`}
            >

                {/* Sender */}

                {!isMine && (

                    <div className="flex items-center gap-2 mb-2">

                        <span
                            className={`w-2 h-2 rounded-full ${
                                onlineUsers.includes(
                                    message.sender?._id
                                )
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                            }`}
                        />

                        <span className="font-semibold text-blue-700 text-sm">

                            {message.sender?.fullName}

                        </span>

                    </div>

                )}

                {/* Text */}

                {message.text && (

                    <p className="break-words whitespace-pre-wrap">

                        {message.text}

                    </p>

                )}

                {/* Attachment */}

{message.attachment && (
    <div className="mt-3">

        {message.attachmentType?.startsWith("image") ? (

            <a
                href={message.attachment}
                target="_blank"
                rel="noreferrer"
            >
                <img
                    src={message.attachment}
                    alt={message.attachmentName}
                    className="rounded-xl max-h-72 object-cover border hover:opacity-90 transition"
                />
            </a>

        ) : (

            <a
                href={message.attachment}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-3 p-3 rounded-lg border transition ${
                    isMine
                        ? "bg-white text-black hover:bg-gray-100"
                        : "bg-gray-50 hover:bg-gray-100"
                }`}
            >
                <span className="text-2xl">📄</span>

                <div className="flex flex-col">
                    <span className="font-medium truncate max-w-xs">
                        {message.attachmentName}
                    </span>

                    <span className="text-xs text-gray-500">
                        Click to download
                    </span>
                </div>
            </a>

        )}

    </div>
)}

                {/* Time */}

                <p
                    className={`text-xs mt-3 ${
                        isMine
                            ? "text-blue-100"
                            : "text-gray-400"
                    }`}
                >

                    {new Date(
                        message.createdAt
                    ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}

                </p>

            </div>

        </div>

    );

}