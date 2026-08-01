import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";

import Layout from "../../components/layout/Layout";
import { socket } from "../../socket/socket";

import {
    getTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
    getProjectMembers,
} from "../../services/task.service";

import TaskColumn from "../../components/Task/TaskColumn";
import CreateTaskModal from "../../components/Task/CreateTaskModal";

export default function TaskBoard() {

    const { projectId } = useParams();

    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    // ==========================
    // Load Tasks
    // ==========================

    const loadTasks = async () => {

        try {

            const res = await getTasks(projectId);

            setTasks(res.data.data || []);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // Load Project Members
    // ==========================

    const loadMembers = async () => {

        try {

            const res = await getProjectMembers(projectId);

            setMembers(res.data.data || []);

        } catch (err) {

            console.error(err);

        }

    };

    useEffect(() => {

        loadTasks();
        loadMembers();

    }, [projectId]);

    // ==========================
    // Socket Connection
    // ==========================

    useEffect(() => {

        socket.connect();

        socket.emit("joinProject", projectId);

        return () => {

            socket.emit("leaveProject", projectId);

            socket.disconnect();

        };

    }, [projectId]);

    // ==========================
    // Socket Events
    // ==========================

    useEffect(() => {

        const handleTaskCreated = (task) => {

            setTasks((prev) => {

                if (prev.some((t) => t._id === task._id)) {
                    return prev;
                }

                return [task, ...prev];

            });

        };

        socket.on("taskCreated", handleTaskCreated);

        return () => {

            socket.off("taskCreated", handleTaskCreated);

        };

    }, []);

    useEffect(() => {

        const handleTaskUpdated = (updatedTask) => {

            setTasks((prev) =>
                prev.map((task) =>
                    task._id === updatedTask._id
                        ? updatedTask
                        : task
                )
            );

        };

        socket.on("taskUpdated", handleTaskUpdated);

        return () => {

            socket.off("taskUpdated", handleTaskUpdated);

        };

    }, []);

    useEffect(() => {

        const handleTaskDeleted = (taskId) => {

            setTasks((prev) =>
                prev.filter((task) => task._id !== taskId)
            );

        };

        socket.on("taskDeleted", handleTaskDeleted);

        return () => {

            socket.off("taskDeleted", handleTaskDeleted);

        };

    }, []);

    // ==========================
    // Create Task
    // ==========================

    const handleCreateTask = async (formData) => {

        try {

            await createTask(projectId, formData);

            setOpenModal(false);

            // Backup refresh
            await loadTasks();

        } catch (err) {

            console.error(err);

        }

    };

    // ==========================
    // Delete Task
    // ==========================

    const handleDeleteTask = async (taskId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;

        try {

            await deleteTask(taskId);

            setTasks((prev) =>
                prev.filter((task) => task._id !== taskId)
            );

        } catch (err) {

            console.error(err);

        }

    };

    // ==========================
    // Drag & Drop
    // ==========================

    const handleDragEnd = async (result) => {

        const { source, destination, draggableId } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const previousTasks = [...tasks];

        const updatedTasks = tasks.map((task) =>
            task._id === draggableId
                ? {
                      ...task,
                      status: destination.droppableId,
                  }
                : task
        );

        setTasks(updatedTasks);

        try {

            await updateTaskStatus(
                draggableId,
                destination.droppableId
            );

        } catch (err) {

            console.error(err);

            setTasks(previousTasks);

        }

    };

    // ==========================
    // Filter Tasks
    // ==========================

    const todoTasks = tasks.filter(
        (task) => task.status === "todo"
    );

    const progressTasks = tasks.filter(
        (task) => task.status === "in-progress"
    );

    const completedTasks = tasks.filter(
        (task) => task.status === "completed"
    );

    if (loading) {

        return (

            <Layout>

                <div className="text-center mt-20 text-xl">

                    Loading Tasks...

                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="max-w-7xl mx-auto p-6">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-3xl font-bold">

                        Project Task Board

                    </h1>

                    <button
                        onClick={() => setOpenModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                    >

                        + New Task

                    </button>

                </div>

                {/* Task Board */}

                <DragDropContext onDragEnd={handleDragEnd}>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <TaskColumn
                            title="📋 Todo"
                            tasks={todoTasks}
                            droppableId="todo"
                            onDelete={handleDeleteTask}
                        />

                        <TaskColumn
                            title="🚀 In Progress"
                            tasks={progressTasks}
                            droppableId="in-progress"
                            onDelete={handleDeleteTask}
                        />

                        <TaskColumn
                            title="✅ Completed"
                            tasks={completedTasks}
                            droppableId="completed"
                            onDelete={handleDeleteTask}
                        />

                    </div>

                </DragDropContext>

                {/* Create Task Modal */}

                <CreateTaskModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    onCreate={handleCreateTask}
                    members={members}
                />

            </div>

        </Layout>

    );

}