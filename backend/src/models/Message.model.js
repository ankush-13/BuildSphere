import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Text Message
        text: {
            type: String,
            trim: true,
            maxlength: 1000,
            default: "",
        },

        // File URL
        attachment: {
            type: String,
            default: "",
        },

        // Original File Name
        attachmentName: {
            type: String,
            default: "",
        },

        // MIME Type
        attachmentType: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

// A message must contain either text OR a file
messageSchema.pre("validate", function (next) {

    if (
        !this.text &&
        !this.attachment
    ) {
        this.invalidate(
            "text",
            "Message must contain text or a file."
        );
    }

    next();

});

const Message = mongoose.model(
    "Message",
    messageSchema
);

export default Message;