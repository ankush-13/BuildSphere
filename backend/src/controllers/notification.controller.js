import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import Notification from "../models/Notification.model.js";
import ApiError from "../utils/ApiError.js";

const getNotifications = AsyncHandler(async (req, res) => {

    const notifications = await Notification.find({
        recipient: req.user._id
    })
    .populate("sender", "fullName username")
    .populate("project", "title")
    .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            notifications,
            "Notifications fetched successfully"
        )
    );
});

const markNotificationAsRead = AsyncHandler(async (req, res) => {

    const { notificationId } = req.params;

    const notification = await Notification.findOneAndUpdate(
        {
            _id: notificationId,
            recipient: req.user._id
        },
        {
            isRead: true
        },
        {
            new: true
        }
    );

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            notification,
            "Notification marked as read"
        )
    );

});

const markAllNotificationsAsRead = AsyncHandler(async (req, res) => {

    await Notification.updateMany(
        {
            recipient: req.user._id,
            isRead: false
        },
        {
            isRead: true
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "All notifications marked as read"
        )
    );

});

const deleteNotification = AsyncHandler(async (req, res) => {

    const { notificationId } = req.params;

    const notification = await Notification.findOneAndDelete({
        _id: notificationId,
        recipient: req.user._id
    });

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Notification deleted successfully"
        )
    );

});

export {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification
};