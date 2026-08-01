import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { askAI } from "../controllers/ai.controller.js";

const router = Router();

router.post("/chat", verifyJWT, askAI);

export default router;