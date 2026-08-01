import { NavLink } from "react-router-dom";

import {
    FaHome,
    FaFolderOpen,
    FaPlusCircle,
    FaCompass,
    FaBell,
    FaComments,
    FaRobot,
} from "react-icons/fa";

export default function Sidebar() {

    const navItem =
        "flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200";

    const active =
        "bg-blue-600 text-white";

    const inactive =
        "text-gray-300 hover:bg-gray-800 hover:text-white";

    return (

        <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white shadow-lg">

            {/* Logo */}

            <div className="p-6 border-b border-gray-800">

                <h1 className="text-3xl font-bold">
                    🚀 BuildSphere
                </h1>

                <p className="text-gray-400 text-sm mt-1">
                    Collaborate. Innovate. Launch.
                </p>

            </div>

            {/* Navigation */}

            <nav className="p-4 space-y-2">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `${navItem} ${isActive ? active : inactive}`
                    }
                >
                    <FaHome />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/projects"
                    end
                    className={({ isActive }) =>
                        `${navItem} ${isActive ? active : inactive}`
                    }
                >
                    <FaFolderOpen />
                    My Projects
                </NavLink>

                <NavLink
                    to="/discover"
                    className={({ isActive }) =>
                        `${navItem} ${isActive ? active : inactive}`
                    }
                >
                    <FaCompass />
                    Discover Projects
                </NavLink>

                <NavLink
                    to="/projects/create"
                    className={({ isActive }) =>
                        `${navItem} ${isActive ? active : inactive}`
                    }
                >
                    <FaPlusCircle />
                    Create Project
                </NavLink>

                {/* ⭐ AI Assistant */}

                <NavLink
                    to="/ai"
                    className={({ isActive }) =>
                        `${navItem} ${
                            isActive
                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                                : "text-purple-300 hover:bg-purple-700 hover:text-white"
                        }`
                    }
                >
                    <FaRobot />
                    AI Assistant
                </NavLink>

                <NavLink
                    to="/notifications"
                    className={({ isActive }) =>
                        `${navItem} ${isActive ? active : inactive}`
                    }
                >
                    <FaBell />
                    Notifications
                </NavLink>



            </nav>

            {/* Bottom AI Badge */}

            <div className="absolute bottom-6 left-4 right-4">

                <div className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-center shadow-lg">

                    <div className="text-3xl mb-2">
                        🤖
                    </div>

                    <p className="font-semibold">
                        AI Copilot
                    </p>

                    <p className="text-xs opacity-90 mt-1">
                        Powered by Gemini
                    </p>

                </div>

            </div>

        </aside>

    );

}