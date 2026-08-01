import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaBell,
    FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/auth.service";
import {
    getNotifications,
    markNotificationAsRead,
} from "../../services/notification.service";

export default function Navbar() {

    const navigate = useNavigate();

    const { user, setUser } = useAuth();

    const [notifications, setNotifications] = useState([]);

    const [showDropdown, setShowDropdown] =
        useState(false);

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications = async () => {

        try {

            const res =
                await getNotifications();

            setNotifications(
                res.data.data || []
            );

        } catch (err) {

            console.error(err);

        }

    };

    const unreadCount = notifications.filter(
        (n) => !n.isRead
    ).length;

    const handleLogout = async () => {

        try {

            await logoutUser();

            setUser(null);

            navigate("/login");

        } catch (error) {

            console.error(error);

        }

    };

    const handleRead = async (id) => {

        try {

            await markNotificationAsRead(id);

            setNotifications((prev) =>
                prev.map((n) =>
                    n._id === id
                        ? {
                              ...n,
                              isRead: true,
                          }
                        : n
                )
            );

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">

            <h1 className="text-2xl font-bold text-blue-600">

                🚀 BuildSphere

            </h1>

            <div className="flex items-center gap-6">

                {/* Notification */}

                <div className="relative">

                    <button
                        onClick={() =>
                            setShowDropdown(
                                !showDropdown
                            )
                        }
                        className="relative text-2xl text-gray-700 hover:text-blue-600"
                    >

                        <FaBell />

                        {unreadCount > 0 && (

                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">

                                {unreadCount}

                            </span>

                        )}

                    </button>

                    {showDropdown && (

                        <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-xl border z-50 max-h-96 overflow-y-auto">

                            <div className="p-4 border-b font-bold">

                                Notifications

                            </div>

                            {notifications.length ===
                            0 ? (

                                <div className="p-5 text-gray-500 text-center">

                                    No notifications

                                </div>

                            ) : (

                                notifications.map(
                                    (
                                        notification
                                    ) => (

                                        <div
                                            key={
                                                notification._id
                                            }
                                            onClick={() =>
                                                handleRead(
                                                    notification._id
                                                )
                                            }
                                            className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                                                notification.isRead
                                                    ? ""
                                                    : "bg-blue-50"
                                            }`}
                                        >

                                            <p className="text-sm">

                                                {
                                                    notification.message
                                                }

                                            </p>

                                            <p className="text-xs text-gray-500 mt-2">

                                                {new Date(
                                                    notification.createdAt
                                                ).toLocaleString()}

                                            </p>

                                        </div>

                                    )
                                )

                            )}

                        </div>

                    )}

                </div>

                {/* User */}

                <div className="text-right">

                    <h3 className="font-semibold">

                        {user?.fullName}

                    </h3>

                    <p className="text-sm text-gray-500">

                        @{user?.username}

                    </p>

                </div>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </header>

    );

}