import { FaBell } from "react-icons/fa";

export default function JoinRequestPopup({
    notification,
    onClose,
}) {
    if (!notification) return null;

    return (
        <div className="fixed top-6 right-6 z-[9999] animate-bounce">

            <div className="bg-white rounded-2xl shadow-2xl border w-96 overflow-hidden">

                {/* Header */}

                <div className="bg-blue-600 text-white p-4 flex items-center gap-3">

                    <FaBell size={22} />

                    <div>

                        <h3 className="font-bold text-lg">
                            New Join Request
                        </h3>

                        <p className="text-sm opacity-90">
                            BuildSphere Notification
                        </p>

                    </div>

                </div>

                {/* Body */}

                <div className="p-5">

                    <p className="text-gray-700 leading-relaxed">

                        {notification.message}

                    </p>

                </div>

                {/* Footer */}

                <div className="border-t p-4 flex justify-end">

                    <button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                    >
                        OK
                    </button>

                </div>

            </div>

        </div>
    );
}