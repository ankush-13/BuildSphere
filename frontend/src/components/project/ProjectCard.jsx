import { Link } from "react-router-dom";
import {
    FaUsers,
    FaUserTie,
    FaCalendarAlt,
    FaArrowRight,
} from "react-icons/fa";

export default function ProjectCard({ project }) {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">

                <h2 className="text-xl font-bold">
                    {project.title}
                </h2>

            </div>

            {/* Body */}
            <div className="p-5">

                <p className="text-gray-600 line-clamp-3 min-h-[72px]">
                    {project.description}
                </p>

                <div className="mt-5 space-y-3 text-gray-700">

                    <div className="flex items-center gap-2">
                        <FaUserTie className="text-blue-600" />
                        <span>
                            <strong>Owner:</strong>{" "}
                            {project.owner?.fullName}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaUsers className="text-green-600" />
                        <span>
                            <strong>Members:</strong>{" "}
                            {project.members?.length || 0}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-orange-500" />
                        <span>
                            <strong>Created:</strong>{" "}
                            {new Date(
                                project.createdAt
                            ).toLocaleDateString()}
                        </span>
                    </div>

                </div>

                <Link
                    to={`/projects/${project._id}`}
                    className="mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all"
                >
                    View Project
                    <FaArrowRight />
                </Link>

            </div>

        </div>
    );
}