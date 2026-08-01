import { Draggable } from "@hello-pangea/dnd";
import { FaTrash } from "react-icons/fa";

export default function TaskCard({
    task,
    index,
    onDelete,
}) {

    const priorityColors = {
        low: "bg-green-100 text-green-700",
        medium: "bg-yellow-100 text-yellow-700",
        high: "bg-red-100 text-red-700",
    };

    return (

        <Draggable
            draggableId={task._id}
            index={index}
        >

            {(provided, snapshot) => (

                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-grab ${
                        snapshot.isDragging
                            ? "rotate-2 shadow-2xl"
                            : ""
                    }`}
                >

                    {/* Header */}

                    <div className="flex justify-between items-start">

                        <h3 className="text-lg font-bold break-words">

                            {task.title}

                        </h3>

                        <button
                            onClick={() => onDelete(task._id)}
                            className="text-red-500 hover:text-red-700 transition ml-3"
                            title="Delete Task"
                        >

                            <FaTrash size={16} />

                        </button>

                    </div>

                    {/* Description */}

                    {task.description && (

                        <p className="text-gray-600 text-sm mt-2 break-words">

                            {task.description}

                        </p>

                    )}

                    {/* Priority & Due Date */}

                    <div className="mt-4 flex items-center justify-between">

                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                priorityColors[task.priority] ||
                                "bg-gray-100 text-gray-700"
                            }`}
                        >

                            {task.priority
                                ? task.priority.toUpperCase()
                                : "NO PRIORITY"}

                        </span>

                        {task.dueDate && (

                            <span className="text-xs text-gray-500">

                                📅{" "}
                                {new Date(
                                    task.dueDate
                                ).toLocaleDateString()}

                            </span>

                        )}

                    </div>

                    {/* Assigned Member */}

{/* Assignee */}

{task.assignee ? (

    <div className="mt-4 flex items-center gap-3 border-t pt-3">

        {task.assignee.avatar ? (

            <img
                src={task.assignee.avatar}
                alt={task.assignee.fullName}
                className="w-10 h-10 rounded-full object-cover"
            />

        ) : (

            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                {task.assignee.fullName
                    ?.charAt(0)
                    .toUpperCase()}

            </div>

        )}

        <div>

            <p className="text-sm font-semibold">

                {task.assignee.fullName}

            </p>

            <p className="text-xs text-gray-500">

                @{task.assignee.username}

            </p>

        </div>

    </div>

) : (

    <div className="mt-4 border-t pt-3 text-sm text-gray-500">

        👤 Unassigned

    </div>

)}

                </div>

            )}

        </Draggable>

    );

}