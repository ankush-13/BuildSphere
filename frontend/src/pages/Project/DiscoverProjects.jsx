import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";
import ProjectCard from "../../components/project/ProjectCard";

import { searchProjects } from "../../services/project.service";

export default function DiscoverProjects() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {

        const fetchProjects = async () => {

            try {

                const res = await searchProjects(query, category);

                setProjects(res.data.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchProjects();

    }, [query, category]);

    return (

        <Layout>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                <h1 className="text-4xl font-bold">
                    Discover Projects
                </h1>

                <div className="flex gap-3">

                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="border rounded-lg px-4 py-2 w-64"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border rounded-lg px-4 py-2"
                    >
                        <option>All</option>
                        <option>Web</option>
                        <option>AI</option>
                        <option>Mobile</option>
                        <option>IoT</option>
                        <option>Blockchain</option>
                        <option>Other</option>
                    </select>

                </div>

            </div>

            {loading ? (

                <p>Loading...</p>

            ) : projects.length === 0 ? (

                <div className="bg-white rounded-xl p-10 text-center shadow">

                    <h2 className="text-2xl font-semibold">
                        No projects found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Try another search or category.
                    </p>

                </div>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {projects.map((project) => (

                        <ProjectCard
                            key={project._id}
                            project={project}
                        />

                    ))}

                </div>

            )}

        </Layout>

    );

}