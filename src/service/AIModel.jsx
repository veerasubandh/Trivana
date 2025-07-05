import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateTripPlan = async (prompt) => {
  try {
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("📝 Raw Gemini Output:", text); // For debugging

    // 👇 Remove triple backticks and optional "json" marker
    const cleanedText = text
      .replace(/^```json\s*/i, '')  // remove starting ```json
      .replace(/^```\s*/i, '')      // remove starting ``` (if not labeled)
      .replace(/```$/, '')          // remove ending ```

    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (err) {
      console.error("❌ JSON parse failed", err);
      parsed = { rawText: text }; // fallback
    }

    return {
      success: true,
      data: parsed,
    };
  } catch (error) {
    console.error("🔴 Gemini API error:", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};