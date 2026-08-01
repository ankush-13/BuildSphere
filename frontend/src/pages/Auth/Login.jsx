import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import AuthLayout from "../../components/auth/AuthLayout";

import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

export default function Login() {

    const navigate = useNavigate();

    const { fetchCurrentUser } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            await loginUser(formData);

            await fetchCurrentUser();

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.message || "Login failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <AuthLayout
            title="Welcome Back 👋"
            subtitle="Login to continue your BuildSphere journey."
            footerText="Don't have an account?"
            footerLink="/register"
            footerLinkText="Register"
        >

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <div className="relative">

                    <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                <div className="relative">

                    <FaLock className="absolute left-4 top-4 text-gray-400" />

                    <input
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                        className="absolute right-4 top-4 text-gray-500"
                    >

                        {showPassword
                            ? <FaEyeSlash />
                            : <FaEye />}

                    </button>

                </div>

                {error && (

                    <div className="bg-red-100 text-red-700 rounded-lg p-3 text-sm">

                        {error}

                    </div>

                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                >

                    {loading
                        ? "Logging in..."
                        : "Login"}

                </button>

            </form>

        </AuthLayout>

    );

}