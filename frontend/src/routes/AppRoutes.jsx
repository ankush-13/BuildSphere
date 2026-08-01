import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Register from "../pages/Auth/Register";
import Projects from "../pages/Project/Projects";
import ProjectDetails from "../pages/Project/ProjectDetails";
import CreateProject from "../pages/Project/CreateProject";
import DiscoverProjects from "../pages/Project/DiscoverProjects";
import Chat from "../pages/Chat/Chat";
import TaskBoard from "../pages/TaskBoard/TaskBoard";
import AI from "../pages/AI/AI";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/projects"
                    element={
                        <ProtectedRoute>
                            <Projects />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/projects/:projectId"
                    element={
                      <ProtectedRoute>
                        <ProjectDetails />
                      </ProtectedRoute>
                    }
                />

                <Route
                    path="/projects/create"
                    element={
                           <ProtectedRoute>
                           <CreateProject />
                           </ProtectedRoute>
                    }
                />

                <Route
                    path="/discover"
                    element={
                          <ProtectedRoute>
                            <DiscoverProjects />
                          </ProtectedRoute>
                    }
                />

                <Route
                   path="/chat/:projectId"
                   element={
                    <ProtectedRoute>
                       <Chat />
                    </ProtectedRoute>
                    }
                />

                <Route
    path="/tasks/:projectId"
    element={
        <ProtectedRoute>
            <TaskBoard />
        </ProtectedRoute>
    }
/>

<Route
    path="/ai"
    element={
        <ProtectedRoute>
            <AI />
        </ProtectedRoute>
    }
/>

            </Routes>
        </BrowserRouter>
    );
}