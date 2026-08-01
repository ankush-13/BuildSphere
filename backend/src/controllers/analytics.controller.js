import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import Project from "../models/Project.model.js";
import Task from "../models/Task.model.js";

const getAnalytics = AsyncHandler(async (req, res) => {

    const userId = req.user._id;

    // Projects where user is a member
    const projects = await Project.find({
        members: userId,
    }).select("_id members");

    const projectIds = projects.map((p) => p._id);

    const tasks = await Task.find({
        project: {
            $in: projectIds,
        },
    });

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.status === "completed"
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === "in-progress"
    ).length;

    const todoTasks = tasks.filter(
        (task) => task.status === "todo"
    ).length;

    // Count unique members
    const memberSet = new Set();

    projects.forEach((project) => {
        project.members.forEach((member) =>
            memberSet.add(member.toString())
        );
    });

    const totalMembers = memberSet.size;

    const completionPercentage =
        totalTasks === 0
            ? 0
            : Math.round(
                  (completedTasks / totalTasks) * 100
              );

    return res.status(200).json(

        new ApiResponse(
            200,
            {
                totalProjects: projects.length,
                totalTasks,
                completedTasks,
                inProgressTasks,
                todoTasks,
                totalMembers,
                completionPercentage,
            },
            "Analytics fetched successfully"
        )

    );

});

export {
    getAnalytics,
};