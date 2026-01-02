
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export const analyzeProductImage = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Use the recommended structure for multimodal content
  const imagePart = {
    inlineData: {
      mimeType: mimeType,
      data: base64Image,
    },
  };
  
  const textPart = {
    text: `Act as a master textile colorist for A. Ross & Sons (ARS).

AVAILABLE PRODUCT CATALOG:
1. ARS 320 Viscose (High sheen)
2. ARS 600S Wool (Matte)
3. ARS 600R Wool (Resilient matte)
4. ARS 700 Viscose (Premium lustre)
5. ARS 1000 Viscose (High-density)
6. ARS 1200 Wool (Luxury contract)
7. ARS 1400 Wool (Ultra-premium)

TASKS:
1. Analyze the uploaded image.
2. Identify primary colors.
3. Provide a Proper Color Name (e.g., 'Tuscan Sun', 'Midnight Indigo').
4. Match to the most accurate ARS product range and code.

OUTPUT REQUIREMENTS (JSON):
- productType: Item category.
- primaryRecommendedProduct: Best material range.
- summary: Evaluation of the palette.
- colors: Array of objects with hex, name, arsProduct, arsCode, percentage, and description.`,
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { 
      parts: [imagePart, textPart] 
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          productType: { type: Type.STRING },
          primaryRecommendedProduct: { type: Type.STRING },
          summary: { type: Type.STRING },
          colors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                hex: { type: Type.STRING },
                name: { type: Type.STRING },
                arsProduct: { type: Type.STRING },
                arsCode: { type: Type.STRING },
                percentage: { type: Type.NUMBER },
                description: { type: Type.STRING },
              },
              required: ["hex", "name", "arsProduct", "arsCode", "percentage", "description"],
            },
          },
        },
        required: ["productType", "primaryRecommendedProduct", "colors", "summary"],
      },
    },
  });

  try {
    const text = response.text;
    if (!text) throw new Error("No response from AI service.");
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Gemini Parse Error:", error);
    throw new Error("Failed to process the image palette. Please try a different or smaller image.");
  }
};
