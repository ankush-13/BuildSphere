import { Link } from "react-router-dom";
import {
    FaRocket,
    FaUsers,
    FaProjectDiagram,
    FaComments,
    FaGithub,
    FaArrowRight,
} from "react-icons/fa";

export default function Home() {

    return (

        <div className="min-h-screen bg-gray-50">

            {/* Navbar */}

            <nav className="bg-white shadow">

                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    <div className="flex items-center gap-3">

                        <FaRocket className="text-blue-600 text-3xl" />

                        <h1 className="text-2xl font-bold text-gray-800">
                            BuildSphere
                        </h1>

                    </div>

                    <div className="flex gap-4">

                        <Link
                            to="/login"
                            className="px-5 py-2 rounded-lg text-blue-600 hover:bg-blue-50"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                        >
                            Register
                        </Link>

                    </div>

                </div>

            </nav>

            {/* Hero */}

            <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

                <div>

                    <h1 className="text-6xl font-extrabold leading-tight">

                        Collaborate.

                        <span className="text-blue-600">

                            {" "}Innovate.

                        </span>

                        <br />

                        Launch.

                    </h1>

                    <p className="mt-8 text-xl text-gray-600 leading-8">

                        BuildSphere helps students, developers and startups
                        collaborate on real-world projects, build portfolios
                        and launch amazing ideas together.

                    </p>

                    <div className="mt-10 flex gap-5">

                        <Link
                            to="/register"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-3"
                        >
                            Get Started

                            <FaArrowRight />

                        </Link>

                        <Link
                            to="/login"
                            className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl"
                        >
                            Login
                        </Link>

                    </div>

                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 text-white">

                    <h2 className="text-3xl font-bold mb-8">

                        Why BuildSphere?

                    </h2>

                    <div className="space-y-6">

                        <div className="flex gap-4">

                            <FaProjectDiagram className="text-3xl" />

                            <div>

                                <h3 className="font-semibold text-xl">

                                    Project Collaboration

                                </h3>

                                <p className="text-blue-100">

                                    Create and manage collaborative projects.

                                </p>

                            </div>

                        </div>

                        <div className="flex gap-4">

                            <FaUsers className="text-3xl" />

                            <div>

                                <h3 className="font-semibold text-xl">

                                    Find Team Members

                                </h3>

                                <p className="text-blue-100">

                                    Connect with skilled developers.

                                </p>

                            </div>

                        </div>

                        <div className="flex gap-4">

                            <FaComments className="text-3xl" />

                            <div>

                                <h3 className="font-semibold text-xl">

                                    Real-Time Communication

                                </h3>

                                <p className="text-blue-100">

                                    Chat and work together seamlessly.

                                </p>

                            </div>

                        </div>

                        <div className="flex gap-4">

                            <FaGithub className="text-3xl" />

                            <div>

                                <h3 className="font-semibold text-xl">

                                    GitHub Integration

                                </h3>

                                <p className="text-blue-100">

                                    Manage repositories alongside projects.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Footer */}

            <footer className="bg-gray-900 text-white text-center py-8">

                © 2026 BuildSphere • Collaborate. Innovate. Launch.

            </footer>

        </div>

    );

}