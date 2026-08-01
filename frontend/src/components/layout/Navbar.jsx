import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/auth.service";

export default function Navbar() {

    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const handleLogout = async () => {

        try {

            await logoutUser();

            setUser(null);

            navigate("/login");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">

            <div>
                <h1 className="text-2xl font-bold text-blue-600">
                    BuildSphere
                </h1>
            </div>

            <div className="flex items-center gap-5">

                <div className="text-right">

                    <h3 className="font-semibold">
                        {user?.fullName}
                    </h3>

                    <p className="text-sm text-gray-500">
                        @{user?.username}
                    </p>

                </div>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                    Logout
                </button>

                

            </div>

        </header>

    );

}