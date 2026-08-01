import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification
} from "../controllers/notification.controller.js";

const router = Router();

router.route("/")
    .get(
        verifyJWT,
        getNotifications
    );

router.route("/read-all")
    .patch(verifyJWT, markAllNotificationsAsRead);

router.route("/:notificationId/read")
    .patch(verifyJWT, markNotificationAsRead);

router.route("/:notificationId")
    .delete(verifyJWT, deleteNotification);

export default router;