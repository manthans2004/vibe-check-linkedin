
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratorInputs, Tone } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateLinkedInUpdates = async (inputs: GeneratorInputs): Promise<string[]> => {
  const { project, tools, role, company, tone } = inputs;

  const systemInstruction = `
    You are an expert career coach and social media manager specializing in helping interns craft authentic, high-impact LinkedIn posts.
    Your goal is to take a simple task description and turn it into a professional post that avoids common "LinkedIn cringe" (e.g., over-dramatization, excessive emojis like '🚀✨', or fake humility).
    
    Guidelines:
    - Avoid "I'm beyond excited to announce..." or "Humbled to share...".
    - Focus on 'what was done', 'how it was done', and 'the value/learning'.
    - Use active verbs.
    - Mention the tech stack naturally.
    - Sound like a real person who is learning and contributing.
    - Target Tone: ${tone}.
  `;

  const prompt = `
    Intern Role: ${role}
    Company: ${company}
    Task/Project: ${project}
    Tools/Tech used: ${tools}
    
    Please provide 3 distinct variations of a LinkedIn post based on these details.
    Each variation should be unique but adhere to the "${tone}" style.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            variations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of 3 professional LinkedIn post variations."
            }
          },
          required: ["variations"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result.variations || [];
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to generate updates. Please check your inputs or try again.");
  }
};
