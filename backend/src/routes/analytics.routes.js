import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../controllers/analytics.controller.js";

const router = Router();

// ==============================
// Get Analytics
// ==============================

router.get("/", verifyJWT, getAnalytics);

export default router;