import { Router } from "express";

import {

    getMessages,

    sendMessage,

    uploadFileMessage,

} from "../controllers/chat.controller.js";

import {

    verifyJWT,

} from "../middlewares/auth.middleware.js";

import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/:projectId")

    .get(
        verifyJWT,
        getMessages
    )

    .post(
        verifyJWT,
        sendMessage
    );

router.post(
    "/:projectId/file",
    verifyJWT,
    upload.single("file"),
    uploadFileMessage
);

export default router;