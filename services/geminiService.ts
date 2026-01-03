import { GoogleGenAI, Type } from "@google/genai";
import { CareerRoadmap } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using gemini-3-flash-preview for speed and structured output capabilities
const MODEL_NAME = "gemini-3-flash-preview";

export const generateRoadmap = async (goal: string, context: string = ""): Promise<CareerRoadmap> => {
  const prompt = `
    Create a comprehensive, professional career roadmap and syllabus for: "${goal}".
    Context/User Background: "${context}".

    The output must be a structured plan including:
    1. A detailed Syllabus breakdown.
    2. A step-by-step Roadmap divided into Phases (e.g., Foundation, Intermediate, Advanced, Revision).
    3. For each step, include an "aiStrategy" which specifically explains how to use AI tools (like Gemini/ChatGPT) to accelerate learning for that specific topic (e.g., "Ask AI to generate quiz questions", "Use AI to simplify this complex theory").
    4. Suggested resources (books, standard websites).

    Return strictly JSON matching the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            goal: { type: Type.STRING },
            overview: { type: Type.STRING },
            estimatedTotalDuration: { type: Type.STRING },
            syllabus: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  importance: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                  subtopics: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                }
              }
            },
            phases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  steps: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        title: { type: Type.STRING },
                        duration: { type: Type.STRING },
                        description: { type: Type.STRING },
                        topics: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING }
                        },
                        aiStrategy: { type: Type.STRING },
                        resources: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              title: { type: Type.STRING },
                              type: { type: Type.STRING, enum: ["book", "video", "course", "article", "tool"] },
                              url: { type: Type.STRING }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          required: ["goal", "overview", "phases", "syllabus", "estimatedTotalDuration"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response content generated.");
    
    return JSON.parse(text) as CareerRoadmap;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    let message = "An unexpected error occurred while generating your roadmap. Please try again.";

    // Check for common error patterns
    const errorString = error.toString().toLowerCase();
    
    if (errorString.includes("429") || errorString.includes("quota")) {
      message = "We've hit the usage limit for the AI service. Please wait a moment and try again.";
    } else if (errorString.includes("503") || errorString.includes("overloaded")) {
      message = "The AI service is currently experiencing high traffic. Please try again in a minute.";
    } else if (errorString.includes("blocked") || errorString.includes("safety")) {
      message = "The request was blocked by safety filters. Please try rephrasing your goal.";
    } else if (errorString.includes("fetch failed") || !window.navigator.onLine) {
      message = "Network error. Please check your internet connection and try again.";
    } else if (error instanceof SyntaxError) {
        message = "Failed to parse the roadmap data. Please try again.";
    }

    throw new Error(message);
  }
};