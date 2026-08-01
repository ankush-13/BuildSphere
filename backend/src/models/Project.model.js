import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Project title is required"],
            trim: true,
            minlength: 3,
            maxlength: 100,
        },

        description: {
            type: String,
            required: [true, "Project description is required"],
            trim: true,
            maxlength: 1000,
        },

        category: {
            type: String,
            required: [true, "Project category is required"],
            trim: true,
        },

        techStack: [
            {
                type: String,
                trim: true,
            }
        ],

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],

        status: {
            type: String,
            enum: [
                "planning",
                "development",
                "completed"
            ],
            default: "planning",
        },

        githubLink: {
            type: String,
            default: "",
        },

        image: {
            type: String,
            default: "",
        },

        joinRequests: [
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        message: {
            type: String,
            default: ""
        },
        requestedAt: {
            type: Date,
            default: Date.now
        }
    }
],

    },
    {
        timestamps: true,
    }
);


const Project = mongoose.model(
    "Project",
    projectSchema
);


export default Project;