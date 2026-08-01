import { Router } from "express";

import {
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
} from "../controllers/project.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/")
    .get(getAllProjects)
    .post(verifyJWT, createProject);

router.route("/search")
    .get(searchProjects);

router.route("/my-projects")
    .get(verifyJWT, getMyProjects);



router.route("/:projectId")
    .get(getProjectById)
    .patch(verifyJWT, updateProject)
    .delete(verifyJWT, deleteProject);

router.route("/:projectId/join")
    .post(verifyJWT, sendJoinRequest);

router.route("/:projectId/join-requests")
    .get(verifyJWT, getJoinRequests);

router.route("/:projectId/accept/:userId")
    .post(verifyJWT, acceptJoinRequest);

router.route("/:projectId/reject/:userId")
    .post(verifyJWT, rejectJoinRequest);

router.route("/:projectId/leave")
    .post(verifyJWT, leaveProject);

router.route("/:projectId/remove/:userId")
    .post(verifyJWT, removeMember);

export default router;