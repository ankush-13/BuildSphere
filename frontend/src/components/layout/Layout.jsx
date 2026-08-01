import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {

    return (

        <div className="min-h-screen bg-gray-100">

            <Sidebar />

            <div className="ml-64">

                <Navbar />

                <main className="p-8">

                    {children}

                </main>

            </div>

        </div>

    );

}