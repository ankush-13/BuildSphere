import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";
import { getDashboard } from "../../services/dashboard.service";

import StatsCard from "../../components/dashboard/StatsCard";
import AnalyticsCard from "../../components/dashboard/AnalyticsCard";
import ProgressCard from "../../components/dashboard/ProgressCard";
import AIInsights from "../../components/dashboard/AIInsights";
import RecentActivity from "../../components/dashboard/RecentActivity";

import {
    FaFolderOpen,
    FaUsers,
    FaClock,
    FaChartBar,
    FaTasks,
    FaCheckCircle,
    FaRocket,
    FaRobot,
} from "react-icons/fa";

export default function Dashboard() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const res = await getDashboard();

                setDashboard(res.data.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    if (loading) {

        return (

            <Layout>

                <div className="text-center text-xl mt-20">

                    Loading Dashboard...

                </div>

            </Layout>

        );

    }

    const totalProjects = dashboard?.totalProjects || 0;
    const myProjects = dashboard?.myProjects || 0;
    const joinedProjects = dashboard?.joinedProjects || 0;
    const pendingRequests = dashboard?.pendingJoinRequests || 0;

    const completedProjects = myProjects + joinedProjects;

    return (

        <Layout>

            <div className="space-y-8">

                {/* Welcome */}

                <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl text-white p-8 shadow-lg">

                    <h1 className="text-4xl font-bold">

                        Welcome back, {user?.fullName} 👋

                    </h1>

                    <p className="mt-3 text-blue-100 text-lg">

                        Manage projects, collaborate with your team,
                        track progress and boost productivity using AI.

                    </p>

                </div>

                {/* Main Stats */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    <StatsCard
                        title="My Projects"
                        value={myProjects}
                        icon={<FaFolderOpen />}
                        color="bg-blue-600"
                    />

                    <StatsCard
                        title="Joined Projects"
                        value={joinedProjects}
                        icon={<FaUsers />}
                        color="bg-green-600"
                    />

                    <StatsCard
                        title="Pending Requests"
                        value={pendingRequests}
                        icon={<FaClock />}
                        color="bg-yellow-500"
                    />

                    <StatsCard
                        title="Total Projects"
                        value={totalProjects}
                        icon={<FaChartBar />}
                        color="bg-purple-600"
                    />

                </div>

                {/* Analytics */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    <AnalyticsCard
                        title="Workspace"
                        value={totalProjects}
                        subtitle="Projects Available"
                        icon={<FaRocket />}
                        color="bg-indigo-600"
                    />

                    <AnalyticsCard
                        title="Your Work"
                        value={completedProjects}
                        subtitle="Projects Involved"
                        icon={<FaTasks />}
                        color="bg-green-600"
                    />

                    <AnalyticsCard
                        title="Completed"
                        value={completedProjects}
                        subtitle="Active Participation"
                        icon={<FaCheckCircle />}
                        color="bg-blue-600"
                    />

                    <AnalyticsCard
                        title="AI Assistant"
                        value="Ready"
                        subtitle="Gemini Connected"
                        icon={<FaRobot />}
                        color="bg-pink-600"
                    />

                </div>

                {/* Progress */}

                <ProgressCard
                    completed={completedProjects}
                    total={Math.max(totalProjects, 1)}
                />

                {/* AI + Activity */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <AIInsights
                        dashboard={dashboard}
                    />

                    <RecentActivity
                        dashboard={dashboard}
                    />

                </div>

                {/* Quick Actions */}

                <div className="bg-white rounded-2xl shadow-md p-6">

                    <h2 className="text-2xl font-bold mb-6">

                        ⚡ Quick Actions

                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                        <button
                            onClick={() =>
                                navigate("/projects/create")
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-5 transition"
                        >

                            <div className="text-3xl mb-3">

                                🚀

                            </div>

                            <h3 className="font-bold">

                                Create Project

                            </h3>

                            <p className="text-sm opacity-90 mt-2">

                                Start a new collaboration.

                            </p>

                        </button>

                        <button
                            onClick={() =>
                                navigate("/discover")
                            }
                            className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-5 transition"
                        >

                            <div className="text-3xl mb-3">

                                🌍

                            </div>

                            <h3 className="font-bold">

                                Discover Projects

                            </h3>

                            <p className="text-sm opacity-90 mt-2">

                                Join amazing teams.

                            </p>

                        </button>

                        <button
                            onClick={() =>
                                navigate("/ai")
                            }
                            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-5 transition"
                        >

                            <div className="text-3xl mb-3">

                                🤖

                            </div>

                            <h3 className="font-bold">

                                AI Copilot

                            </h3>

                            <p className="text-sm opacity-90 mt-2">

                                Get instant AI assistance.

                            </p>

                        </button>

                    </div>

                </div>

            </div>

        </Layout>

    );

}