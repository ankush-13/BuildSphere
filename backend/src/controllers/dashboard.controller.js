import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import Project from "../models/Project.model.js";

const getDashboardData = AsyncHandler(async (req, res) => {

    const userId = req.user._id;

    const myProjects = await Project.countDocuments({
        owner: userId
    });

    const joinedProjects = await Project.countDocuments({
        members: userId,
        owner: { $ne: userId }
    });

    const pendingJoinRequests = await Project.countDocuments({
        owner: userId,
        "joinRequests.0": { $exists: true }
    });

    const totalProjects = await Project.countDocuments();

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                myProjects,
                joinedProjects,
                pendingJoinRequests,
                totalProjects
            },
            "Dashboard data fetched successfully"
        )
    );

});

export { getDashboardData };