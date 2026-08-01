import cloudinary from "../utils/cloudinary.js";

import { io } from "../server.js";

import Message from "../models/Message.model.js";
import Project from "../models/Project.model.js";


import upload from "../middlewares/multer.middleware.js";

import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// ================================
// Get Chat History
// ================================

const getMessages = AsyncHandler(async (req, res) => {

    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    // Only project members can view chat

const isMember = project.members.some(
    member => member.toString() === req.user._id.toString()
);

if (!isMember) {
    throw new ApiError(
        403,
        "Only project members can access chat"
    );
}

    const messages = await Message.find({
        project: projectId,
    })
        .populate(
            "sender",
            "fullName username avatar"
        )
        .sort({
            createdAt: 1,
        });

    return res.status(200).json(

        new ApiResponse(
            200,
            messages,
            "Messages fetched successfully"
        )

    );

});

// ================================
// Send Message
// ================================

const sendMessage = AsyncHandler(async (req, res) => {

    const { projectId } = req.params;

    const { text } = req.body;

    if (!text) {
        throw new ApiError(
            400,
            "Message cannot be empty"
        );
    }

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(
            404,
            "Project not found"
        );
    }

    // Only project members can send messages

const isMember = project.members.some(
    member => member.toString() === req.user._id.toString()
);

if (!isMember) {
    throw new ApiError(
        403,
        "Only project members can send messages"
    );
}

    const message = await Message.create({

        project: projectId,

        sender: req.user._id,

        text,

    });

    const populatedMessage =
        await Message.findById(message._id)
            .populate(
                "sender",
                "fullName username avatar"
            );

        // Broadcast message to everyone in the project

            io.to(projectId).emit(
              "receiveMessage",
            populatedMessage
            );

    return res.status(201).json(

        new ApiResponse(
            201,
            populatedMessage,
            "Message sent successfully"
        )

    );

});

const uploadFileMessage = AsyncHandler(async (req, res) => {

    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    // Only members can upload files
    const isMember = project.members.some(
        member => member.toString() === req.user._id.toString()
    );

    if (!isMember) {
        throw new ApiError(
            403,
            "Only project members can upload files"
        );
    }

    if (!req.file) {
        throw new ApiError(
            400,
            "Please select a file"
        );
    }


    console.log("Cloudinary Config:", cloudinary.config());
    // Upload to Cloudinary
    const uploadedFile = await cloudinary.uploader.upload(
        req.file.path,
        {
            folder: "BuildSphere/ChatFiles",
            resource_type: "auto",
        }
    );

    // Save message
    const message = await Message.create({

        project: projectId,

        sender: req.user._id,

        text: req.body.text || "",

        attachment: uploadedFile.secure_url,

        attachmentName: req.file.originalname,

        attachmentType: req.file.mimetype,

    });

    const populatedMessage =
        await Message.findById(message._id)
            .populate(
                "sender",
                "fullName username avatar"
            );

    io.to(projectId).emit(
        "receiveMessage",
        populatedMessage
    );

    return res.status(201).json(

        new ApiResponse(
            201,
            populatedMessage,
            "File uploaded successfully"
        )

    );

});

export {

    getMessages,

    sendMessage,

    uploadFileMessage,

};