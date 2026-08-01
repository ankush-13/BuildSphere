import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

export default function TaskColumn({
    title,
    tasks,
    droppableId,
    onDelete,
}) {
    return (
        <div className="bg-gray-100 rounded-xl p-4 min-h-[600px]">

            {/* Header */}

            <div className="flex justify-between items-center mb-4">

                <h2 className="text-xl font-bold">
                    {title}
                </h2>

                <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold">
                    {tasks.length}
                </span>

            </div>

            {/* Drop Area */}

            <Droppable droppableId={droppableId}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="space-y-4 min-h-[500px]"
                    >
                        {tasks.length === 0 ? (
                            <div className="text-center text-gray-500 py-10">
                                No Tasks
                            </div>
                        ) : (
                            tasks.map((task, index) => (
                                <TaskCard
                                    key={task._id}
                                    task={task}
                                    index={index}
                                    onDelete={onDelete}
                                />
                            ))
                        )}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

        </div>
    );
}