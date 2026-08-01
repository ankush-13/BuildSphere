import { io, onlineUsers } from "../server.js";

import Project from "../models/Project.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Notification from "../models/Notification.model.js";

const createProject = AsyncHandler(async (req, res) => {

    const {
        title,
        description,
        category,
        techStack,
        githubLink
    } = req.body;


    // Validation
    if (
        !title ||
        !description ||
        !category
    ) {
        throw new ApiError(
            400,
            "Title, description and category are required"
        );
    }


    // Create project
    const project = await Project.create({

        title,
        description,
        category,
        techStack,
        githubLink,

        // Logged-in user becomes owner
        owner: req.user._id,

        // Owner automatically becomes first member
        members: [
            req.user._id
        ]

    });


    const createdProject = await Project.findById(
        project._id
    )
    .populate(
        "owner",
        "fullName username email"
    );


    return res.status(201).json(

        new ApiResponse(
            201,
            createdProject,
            "Project created successfully"
        )

    );

});

const getAllProjects = AsyncHandler(async (req, res) => {

    const projects = await Project.find()
        .populate(
            "owner",
            "fullName username email"
        )
        .populate(
            "members",
            "fullName username"
        )
        .sort({
            createdAt: -1
        });


    return res.status(200).json(

        new ApiResponse(
            200,
            projects,
            "Projects fetched successfully"
        )

    );

});


const getMyProjects = AsyncHandler(async (req, res) => {

    const projects = await Project.find({
        owner: req.user._id
    })
    .populate(
        "owner",
        "fullName username email avatar"
    )
    .populate(
        "members",
        "fullName username avatar"
    )
    .sort({
        createdAt: -1
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            projects,
            "Projects fetched successfully"
        )
    );

});

const getProjectById = AsyncHandler(async (req, res) => {

    const { projectId } = req.params;

    const project = await Project.findById(projectId)
        .populate("owner", "fullName username email avatar")
        .populate("members", "fullName username email avatar");

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            project,
            "Project fetched successfully"
        )
    );
});

const updateProject = AsyncHandler(async (req, res) => {

    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    // Only owner can update
    if (project.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(
            403,
            "You are not authorized to update this project"
        );
    }

    const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        {
            $set: req.body
        },
        {
            new: true,
            runValidators: true
        }
    )
        .populate("owner", "fullName username email")
        .populate("members", "fullName username");

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedProject,
            "Project updated successfully"
        )
    );
});

const deleteProject = AsyncHandler(async (req, res) => {

    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    if (project.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(
            403,
            "You are not authorized to delete this project"
        );
    }

    await Project.findByIdAndDelete(projectId);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Project deleted successfully"
        )
    );

});

const sendJoinRequest = AsyncHandler(async (req, res) => {

    const { projectId } = req.params;
    const { message = "" } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    // Owner cannot send request
    if (project.owner.toString() === req.user._id.toString()) {
        throw new ApiError(
            400,
            "Project owner is already a member"
        );
    }

    // Already a member
    const isMember = project.members.some(
        member => member.toString() === req.user._id.toString()
    );

    if (isMember) {
        throw new ApiError(
            400,
            "You are already a member of this project"
        );
    }

    // Already requested
    const alreadyRequested = project.joinRequests.some(
        request => request.user.toString() === req.user._id.toString()
    );

    if (alreadyRequested) {
        throw new ApiError(
            400,
            "Join request already sent"
        );
    }

    project.joinRequests.push({
        user: req.user._id,
        message
    });

    await project.save();

    await Notification.create({
    recipient: project.owner,
    sender: req.user._id,
    project: project._id,
    type: "join_request",
    message: `${req.user.fullName} requested to join your project "${project.title}".`
});

const ownerSocketId = onlineUsers.get(
    project.owner.toString()
);

if (ownerSocketId) {
    io.to(ownerSocketId).emit("newNotification", {
        type: "join_request",
        sender: {
            _id: req.user._id,
            fullName: req.user.fullName,
        },
        project: {
            _id: project._id,
            title: project.title,
        },
        message: `${req.user.fullName} requested to join your project.`,
    });
}

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Join request sent successfully"
        )
    );

});


const getJoinRequests = AsyncHandler(async (req, res) => {

    const { projectId } = req.params;

    console.log("Project ID:", projectId);

    const project = await Project.findById(projectId)
        .populate(
            "joinRequests.user",
            "fullName username email avatar"
        );

    console.log("Project:", project);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    console.log("Owner:", project.owner.toString());
    console.log("Current User:", req.user._id.toString());

    if (project.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(
            403,
            "Only the project owner can view join requests"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            project.joinRequests,
            "Join requests fetched successfully"
        )
    );
});

const acceptJoinRequest = AsyncHandler(async (req, res) => {

    const { projectId, userId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    // Only owner can accept requests
    if (project.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(
            403,
            "Only the project owner can accept requests"
        );
    }

    // Check request exists
    const requestExists = project.joinRequests.some(
        request => request.user.toString() === userId
    );

    if (!requestExists) {
        throw new ApiError(
            404,
            "Join request not found"
        );
    }

    // Prevent duplicate members
    const alreadyMember = project.members.some(
        member => member.toString() === userId
    );

    if (!alreadyMember) {
        project.members.push(userId);
    }

    // Remove request
    project.joinRequests = project.joinRequests.filter(
        request => request.user.toString() !== userId
    );

    await project.save();

    await project.populate(
    "members",
    "fullName username email avatar"
    );

    await Notification.create({
    recipient: userId,
    sender: req.user._id,
    project: project._id,
    type: "request_accepted",
    message: `Your request to join "${project.title}" has been accepted.`
});

    const updatedProject = await Project.findById(projectId)
    .populate("owner", "fullName username email")
    .populate("members", "fullName username email");

return res.status(200).json(
    new ApiResponse(
        200,
        updatedProject,
        "Join request accepted successfully"
    )
);

});

const rejectJoinRequest = AsyncHandler(async (req, res) => {

    const { projectId, userId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    // Only owner can reject requests
    if (project.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(
            403,
            "Only the project owner can reject requests"
        );
    }

    // Check if request exists
    const requestExists = project.joinRequests.some(
        request => request.user.toString() === userId
    );

    if (!requestExists) {
        throw new ApiError(
            404,
            "Join request not found"
        );
    }

    // Remove the join request
    project.joinRequests = project.joinRequests.filter(
        request => request.user.toString() !== userId
    );

    await project.save();

    await Notification.create({
    recipient: userId,
    sender: req.user._id,
    project: project._id,
    type: "request_rejected",
    message: `Your request to join "${project.title}" has been rejected.`
});

    const updatedProject = await Project.findById(projectId)
        .populate("owner", "fullName username email")
        .populate("members", "fullName username email")
        .populate("joinRequests.user", "fullName username email");

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedProject,
            "Join request rejected successfully"
        )
    );

});

const leaveProject = AsyncHandler(async (req, res) => {

    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    // Owner cannot leave
    if (project.owner.toString() === req.user._id.toString()) {
        throw new ApiError(
            400,
            "Project owner cannot leave the project"
        );
    }

    // Check membership
    const isMember = project.members.some(
        member => member.toString() === req.user._id.toString()
    );

    if (!isMember) {
        throw new ApiError(
            400,
            "You are not a member of this project"
        );
    }

    // Remove member
    project.members = project.members.filter(
        member => member.toString() !== req.user._id.toString()
    );

    await project.save();

    await Notification.create({
    recipient: project.owner,
    sender: req.user._id,
    project: project._id,
    type: "member_left",
    message: `${req.user.fullName} left your project "${project.title}".`
});

    const updatedProject = await Project.findById(projectId)
        .populate("owner", "fullName username email")
        .populate("members", "fullName username email");

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedProject,
            "You left the project successfully"
        )
    );

});

const removeMember = AsyncHandler(async (req, res) => {

    const { projectId, userId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    // Only owner can remove members
    if (project.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(
            403,
            "Only the project owner can remove members"
        );
    }

    // Owner cannot remove themselves
    if (project.owner.toString() === userId) {
        throw new ApiError(
            400,
            "Project owner cannot be removed"
        );
    }

    // Check membership
    const isMember = project.members.some(
        member => member.toString() === userId
    );

    if (!isMember) {
        throw new ApiError(
            404,
            "Member not found"
        );
    }

    // Remove member
    project.members = project.members.filter(
        member => member.toString() !== userId
    );

    await project.save();

    await Notification.create({
    recipient: userId,
    sender: req.user._id,
    project: project._id,
    type: "member_removed",
    message: `You have been removed from "${project.title}".`
});

const updatedProject = await Project.findById(projectId)
        .populate("owner", "fullName username email")
        .populate("members", "fullName username email");

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedProject,
            "Member removed successfully"
        )
    );

});

const searchProjects = AsyncHandler(async (req, res) => {

    const {
        query = "",
        category = "All",
    } = req.query;

    const filter = {};

    // Search by title, description, category or tech stack
    if (query.trim()) {

        filter.$or = [

            {
                title: {
                    $regex: query,
                    $options: "i",
                },
            },

            {
                description: {
                    $regex: query,
                    $options: "i",
                },
            },

            {
                category: {
                    $regex: query,
                    $options: "i",
                },
            },

            {
                techStack: {
                    $in: [new RegExp(query, "i")],
                },
            },

        ];

    }

    // Category filter
    if (category !== "All") {

        filter.category = category;

    }

    const projects = await Project.find(filter)
        .populate("owner", "fullName username")
        .populate("members", "fullName username");

    return res.status(200).json(

        new ApiResponse(

            200,
            projects,
            "Projects fetched successfully"

        )

    );

});


export {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    sendJoinRequest,
    getJoinRequests,
    acceptJoinRequest,
    rejectJoinRequest,
    leaveProject,
    removeMember,
    searchProjects,
    getMyProjects
};