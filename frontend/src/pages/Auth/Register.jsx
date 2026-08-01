import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaUserCircle,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

import AuthLayout from "../../components/auth/AuthLayout";
import { registerUser } from "../../services/auth.service";

export default function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
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

            await registerUser(formData);

            alert("Registration Successful!");

            navigate("/login");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <AuthLayout
            title="Create Account 🚀"
            subtitle="Join BuildSphere and start collaborating."
            footerText="Already have an account?"
            footerLink="/login"
            footerLinkText="Login"
        >

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <div className="relative">

                    <FaUser
                        className="absolute left-4 top-4 text-gray-400"
                    />

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                <div className="relative">

                    <FaUserCircle
                        className="absolute left-4 top-4 text-gray-400"
                    />

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                <div className="relative">

                    <FaEnvelope
                        className="absolute left-4 top-4 text-gray-400"
                    />

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

                    <FaLock
                        className="absolute left-4 top-4 text-gray-400"
                    />

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
                        ? "Creating Account..."
                        : "Create Account"}

                </button>

            </form>

        </AuthLayout>

    );

}