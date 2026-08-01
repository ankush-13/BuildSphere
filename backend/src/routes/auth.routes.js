import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    refreshAccessToken
} from "../controllers/auth.controller.js";

const router = Router();

router.route("/register").post(registerUser);

router.post("/test", (req, res) => {
    console.log("✅ TEST ROUTE HIT");
    res.json({
        success: true,
        body: req.body,
    });
});

router.route("/login").post(loginUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/logout").post(
    verifyJWT,
    logoutUser
);
router.route("/refresh-token")
.post(refreshAccessToken);

export default router;