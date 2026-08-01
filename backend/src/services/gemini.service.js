import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const askGemini = async (userPrompt) => {
    try {

        const prompt = `
You are BuildSphere AI Copilot.

Your job is to help software developers.

You should help with:

• MERN Stack
• React
• Node.js
• Express
• MongoDB
• JavaScript
• C++
• Git & GitHub
• Project Ideas
• Resume Building
• Placement Preparation
• DSA
• Debugging
• Code Review

Always answer professionally.

If user asks for code,
provide complete code.

If user asks for project ideas,
give modern and resume-worthy ideas.

User Question:
${userPrompt}
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        return response.text;

    } catch (error) {

        console.error("Gemini Error:", error);

        throw new Error("Failed to generate AI response");
    }
};