import { useEffect, useState } from "react";

export default function CreateTaskModal({

    open,

    onClose,

    onCreate,

    members = [],

}) {

    const [form, setForm] = useState({

        title: "",

        description: "",

        priority: "medium",

        dueDate: "",

        assignee: "",

    });

    useEffect(() => {

        if (open) {

            setForm({

                title: "",

                description: "",

                priority: "medium",

                dueDate: "",

                assignee: "",

            });

        }

    }, [open]);

    if (!open) return null;

    const handleSubmit = (e) => {

        e.preventDefault();

        onCreate(form);

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl p-6 w-full max-w-lg">

                <h2 className="text-2xl font-bold mb-6">

                    Create Task

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {/* Task Title */}

                    <input
                        type="text"
                        placeholder="Task Title"
                        required
                        value={form.title}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                title: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg p-3"
                    />

                    {/* Description */}

                    <textarea
                        placeholder="Description"
                        rows={4}
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg p-3"
                    />

                    {/* Priority */}

                    <select
                        value={form.priority}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                priority: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg p-3"
                    >

                        <option value="low">
                            Low
                        </option>

                        <option value="medium">
                            Medium
                        </option>

                        <option value="high">
                            High
                        </option>

                    </select>

                    {/* Assign To */}

                    <select
                        value={form.assignee}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                assignee: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg p-3"
                    >

                        <option value="">
                            Assign Member
                        </option>

                        {members.map((member) => (

                            <option
                                key={member._id}
                                value={member._id}
                            >
                                {member.fullName} (@{member.username})
                            </option>

                        ))}

                    </select>

                    {/* Due Date */}

                    <input
                        type="date"
                        value={form.dueDate}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                dueDate: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg p-3"
                    />

                    {/* Buttons */}

                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >

                            Create Task

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}