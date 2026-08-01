import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import { createProject } from "../../services/project.service";

export default function CreateProject() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        techStack: "",
        githubLink: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await createProject({
                ...formData,
                techStack: formData.techStack
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
            });

            alert("Project created successfully!");

            navigate("/projects");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to create project"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <Layout>

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Create New Project
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        className="w-full border rounded-xl p-3"
                        placeholder="Project Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        className="w-full border rounded-xl p-3"
                        rows="5"
                        placeholder="Project Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="w-full border rounded-xl p-3"
                        placeholder="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="w-full border rounded-xl p-3"
                        placeholder="Tech Stack (React, Node, MongoDB)"
                        name="techStack"
                        value={formData.techStack}
                        onChange={handleChange}
                    />

                    <input
                        className="w-full border rounded-xl p-3"
                        placeholder="GitHub Repository URL"
                        name="githubLink"
                        value={formData.githubLink}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                    >
                        {loading
                            ? "Creating..."
                            : "Create Project"}
                    </button>

                </form>

            </div>

        </Layout>

    );

}