import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { askGemini } from "../services/gemini.service.js";

const askAI = AsyncHandler(async (req, res) => {

    const { prompt } = req.body;

    if (!prompt) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "Prompt is required"));
    }

    const reply = await askGemini(prompt);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                reply,
            },
            "AI response generated successfully"
        )
    );
});

export { askAI };