import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";

import {
    getProjectById,
    sendJoinRequest,
    getJoinRequests,
    acceptJoinRequest,
    rejectJoinRequest,
} from "../../services/project.service";

import {
    FaUser,
    FaUsers,
    FaFolderOpen,
    FaGithub,
    FaCalendarAlt,
} from "react-icons/fa";

export default function ProjectDetails() {

    const { projectId } = useParams();

    const { user } = useAuth();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [joinRequests, setJoinRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProject = async () => {

        const res = await getProjectById(projectId);

        setProject(res.data.data);

    };

    const fetchJoinRequests = async () => {

        try {

            const res = await getJoinRequests(projectId);

            setJoinRequests(res.data.data);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        const loadData = async () => {

            try {

                await fetchProject();

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        };

        loadData();

    }, [projectId]);

    useEffect(() => {

        if (
            project &&
            user &&
            project.owner?._id === user._id
        ) {

            fetchJoinRequests();

        }

    }, [project, user]);

    if (loading) {

        return (

            <Layout>

                <div className="text-center py-20">

                    Loading...

                </div>

            </Layout>

        );

    }

    if (!project) {

        return (

            <Layout>

                <div className="text-center py-20">

                    Project not found

                </div>

            </Layout>

        );

    }

    const isOwner =
        user &&
        project.owner?._id === user._id;

    const isMember =
        user &&
        project.members?.some(
            member => member._id === user._id
        );

    const handleJoin = async () => {

        try {

            await sendJoinRequest(projectId);

            alert("Join Request Sent Successfully");

        } catch (err) {

            alert(
                err.response?.data?.message
            );

        }

    };

    const handleAccept = async (userId) => {

        try {

            await acceptJoinRequest(
                projectId,
                userId
            );

            await fetchProject();

            await fetchJoinRequests();

        } catch (err) {

            console.log(err);

        }

    };

    const handleReject = async (userId) => {

        try {

            await rejectJoinRequest(
                projectId,
                userId
            );

            await fetchJoinRequests();

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <Layout>

            <div className="bg-white rounded-2xl shadow-lg p-8">

                <div className="flex justify-between">

                    <div>

                        <h1 className="text-4xl font-bold">

                            {project.title}

                        </h1>

                        <p className="text-gray-500 mt-2">

                            {project.category}

                        </p>

                    </div>

                    {!isOwner && !isMember && (

                        <button
                            onClick={handleJoin}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                        >

                            Join Project

                        </button>

                    )}

                    {isMember && !isOwner && (

                        <span className="bg-green-100 text-green-700 px-5 py-3 rounded-xl">

                            ✔ Member

                        </span>

                    )}

                </div>

                <hr className="my-6" />

                <p className="text-gray-700 leading-7">

                    {project.description}

                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">

                    <div className="space-y-4">

                        <div className="flex items-center gap-3">

                            <FaUser className="text-blue-600"/>

                            <span>

                                <strong>Owner:</strong>

                                {" "}

                                {project.owner?.fullName}

                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <FaUsers className="text-green-600"/>

                            <span>

                                <strong>Members:</strong>

                                {" "}

                                {project.members?.length}

                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <FaFolderOpen className="text-purple-600"/>

                            <span>

                                <strong>Category:</strong>

                                {" "}

                                {project.category}

                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <FaCalendarAlt className="text-orange-500"/>

                            <span>

                                {new Date(
                                    project.createdAt
                                ).toLocaleDateString()}

                            </span>

                        </div>

                    </div>

                    <div>

                        <h3 className="font-semibold mb-3">

                            Tech Stack

                        </h3>

                        <div className="flex flex-wrap gap-2">

                            {project.techStack?.map(
                                (tech, index) => (

                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                                    >

                                        {tech}

                                    </span>

                                )
                            )}

                        </div>

                    </div>

                </div>

                <div className="flex flex-wrap gap-4 mt-8">

{project.githubLink && (

    <a
        href={project.githubLink}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl transition"
    >
        <FaGithub />
        View GitHub
    </a>

)}

{isMember && (

    <Link
        to={`/chat/${project._id}`}
        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
    >
        💬 Open Chat
    </Link>

)}

{isMember && (

    <Link
        to={`/tasks/${project._id}`}
        className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition"
    >
        📋 Task Board
    </Link>

)}

</div>

                <hr className="my-10"/>

                <h2 className="text-2xl font-bold mb-5">

                    Members

                </h2>

                <div className="space-y-3">

                    {project.members?.map(member => (

                        <div
                            key={member._id}
                            className="border rounded-xl p-4 flex justify-between"
                        >

                            <div>

                                <p className="font-semibold">

                                    {member.fullName}

                                </p>

                                <p className="text-sm text-gray-500">

                                    @{member.username}

                                </p>

                            </div>

                        </div>

                    ))}

                </div>

                {isOwner && (

                    <>

                        <hr className="my-10"/>

                        <h2 className="text-2xl font-bold mb-5">

                            Pending Join Requests

                        </h2>

                        {joinRequests.length === 0 ? (

                            <p>

                                No pending requests.

                            </p>

                        ) : (

                            joinRequests.map(request => (

                                <div
                                    key={request.user._id}
                                    className="border rounded-xl p-4 mb-4 flex justify-between items-center"
                                >

                                    <div>

                                        <h3 className="font-semibold">

                                            {request.user.fullName}

                                        </h3>

                                        <p className="text-gray-500">

                                            @{request.user.username}

                                        </p>

                                    </div>

                                    <div className="flex gap-3">

                                        <button
                                            onClick={() =>
                                                handleAccept(
                                                    request.user._id
                                                )
                                            }
                                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                                        >

                                            Accept

                                        </button>

                                        <button
                                            onClick={() =>
                                                handleReject(
                                                    request.user._id
                                                )
                                            }
                                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                                        >

                                            Reject

                                        </button>

                                    </div>

                                </div>

                            ))

                        )}

                    </>

                )}

            </div>

        </Layout>

    );

}