import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { getMyProjects } from "../../services/project.service";
import ProjectCard from "../../components/project/ProjectCard";
import { Link } from "react-router-dom";


export default function Projects() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {

        const fetchProjects = async () => {

            try {

                const res = await getMyProjects();

                setProjects(res.data.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchProjects();

    }, []);

    const filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <Layout>

            {/* Header */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                <div>

                    <h1 className="text-4xl font-bold text-gray-800">
                        My Projects
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage and collaborate on your BuildSphere projects.
                    </p>

                </div>

                <Link
                    to="/projects/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
                >
                        + Create Project
                </Link>

            </div>

            {/* Search */}

            <div className="mb-6">

                <input
                    type="text"
                    placeholder="🔍 Search projects..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-96 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

            {/* Loading */}

            {loading ? (

                <div className="text-center py-20">

                    <h2 className="text-xl font-semibold">
                        Loading Projects...
                    </h2>

                </div>

            ) : filteredProjects.length === 0 ? (

                <div className="bg-white rounded-2xl shadow-md p-10 text-center">

                    <h2 className="text-2xl font-bold">
                        No Projects Found
                    </h2>

                    <p className="text-gray-500 mt-2">

                        {search
                            ? "No project matches your search."
                            : "Create your first project to get started."}

                    </p>

                </div>

            ) : (

                <>

                    {/* Project Count */}

                    <p className="text-gray-500 mb-4">

                        Showing{" "}

                        <span className="font-semibold">

                            {filteredProjects.length}

                        </span>{" "}

                        project(s)

                    </p>

                    {/* Project Grid */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {filteredProjects.map((project) => (

                            <ProjectCard
                                key={project._id}
                                project={project}
                            />

                        ))}

                    </div>

                </>

            )}

        </Layout>

    );

}