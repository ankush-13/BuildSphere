import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import { socket } from "../../socket/socket";
import { useAuth } from "../../context/AuthContext";

import JoinRequestPopup from "../Notification/JoinRequestPopup";

export default function Layout({ children }) {

    const { user } = useAuth();

    const [notification, setNotification] = useState(null);

    useEffect(() => {

        if (!user?._id) return;

        socket.connect();

        // Tell backend this user is online
        socket.emit("userOnline", {
            userId: user._id,
        });

        // Listen for live notifications
        socket.on("newNotification", (data) => {

            setNotification(data);

            setTimeout(() => {
                setNotification(null);
            }, 8000);

        });

        return () => {

            socket.off("newNotification");

        };

    }, [user]);

    return (

        <div className="min-h-screen bg-gray-100">

            <Sidebar />

            <div className="ml-64">

                <Navbar />

                <main className="p-8">

                    {children}

                </main>

            </div>

            <JoinRequestPopup
                notification={notification}
                onClose={() => setNotification(null)}
            />

        </div>

    );

}