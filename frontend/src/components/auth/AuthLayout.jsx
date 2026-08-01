import { Link } from "react-router-dom";
import { FaRocket } from "react-icons/fa";

export default function AuthLayout({
    title,
    subtitle,
    children,
    footerText,
    footerLink,
    footerLinkText,
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl grid md:grid-cols-2">

                {/* Left Side */}
                <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-12">

                    <FaRocket className="text-6xl mb-6" />

                    <h1 className="text-5xl font-bold">
                        BuildSphere
                    </h1>

                    <p className="mt-5 text-lg leading-8 text-blue-100">
                        Collaborate. Innovate. Launch.
                    </p>

                    <p className="mt-10 text-blue-200">
                        Manage projects, collaborate with developers,
                        discover opportunities and build amazing products
                        together.
                    </p>

                </div>

                {/* Right Side */}
                <div className="p-10 md:p-12">

                    <h2 className="text-4xl font-bold text-gray-800">
                        {title}
                    </h2>

                    <p className="text-gray-500 mt-2 mb-8">
                        {subtitle}
                    </p>

                    {children}

                    <div className="mt-8 text-center text-gray-600">

                        {footerText}

                        <Link
                            to={footerLink}
                            className="ml-2 text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            {footerLinkText}
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}