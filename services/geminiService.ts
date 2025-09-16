// Fix: This file was previously malformed or empty, causing build errors.
// It has been implemented to correctly call the Gemini API and provide AI-driven analysis.
import { GoogleGenAI, Type } from "@google/genai";
import { FormData } from '../types';

// The API key is sourced from environment variables as per the guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Defines the expected JSON structure for the AI's response.
const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    strengths: {
      type: Type.ARRAY,
      description: "List of 3 key strengths of the startup.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A short, impactful title for the strength." },
          description: { type: Type.STRING, description: "A concise explanation of why this is a strength, using data from the pitch." },
        },
        required: ["title", "description"],
      },
    },
    improvements: {
      type: Type.ARRAY,
      description: "List of the top 3 most critical areas for improvement.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A short, clear title for the area of improvement." },
          why: { type: Type.STRING, description: "Explain why this is a critical weakness from an investor's perspective." },
          how: {
            type: Type.ARRAY,
            description: "Provide 2-3 concrete, actionable steps the founder should take to fix this weakness.",
            items: {
              type: Type.STRING,
            },
          },
          resource: {
            type: Type.OBJECT,
            description: "Optional: A helpful online resource (e.g., article, tool) related to the improvement.",
            properties: {
              text: { type: Type.STRING, description: "The display text for the resource link." },
              url: { type: Type.STRING, description: "The URL of the resource." },
            },
          },
        },
        required: ["title", "why", "how"],
      },
    },
  },
  required: ["strengths", "improvements"],
};


/**
 * Generates a detailed prompt for the Gemini model based on the startup's form data.
 * @param data The form data collected from the user.
 * @returns A string prompt for the AI.
 */
const generatePrompt = (data: FormData): string => {
    return `
    You are a seasoned Venture Capital (VC) analyst. Your task is to provide a concise, brutally honest, and actionable analysis of the following startup pitch data. Your audience is the startup founder, so your tone should be direct, insightful, and helpful, not just critical. Focus on what a real investor would care about most.

    Based on the data provided below, generate a JSON object containing the top 3 strengths and the top 3 most critical areas for improvement.

    **Startup Data:**
    - **Startup Name:** ${data.startupName}
    - **Sector:** ${data.sector}
    - **Stage:** ${data.stage}
    - **Founding Date:** ${data.foundingDate}
    - **Problem:** ${data.problem}
    - **Solution:** ${data.solution}
    - **Unique Value Proposition (UVP):** ${data.uvp}
    - **Competitors:** ${data.competitors}
    - **Total Addressable Market (TAM):** $${data.tam.toLocaleString()}
    - **Serviceable Addressable Market (SAM):** $${data.sam.toLocaleString()}
    - **Business Model:** ${data.businessModel}
    - **Pricing Strategy:** ${data.pricingStrategy}
    - **Monthly Recurring Revenue (MRR):** ${data.mrr ? `$${data.mrr.toLocaleString()}` : 'Not provided'}
    - **Customer Count:** ${data.customerCount}
    - **3-Month Growth Rate (%):** ${data.growthRate}%
    - **Customer Acquisition Cost (CAC):** ${data.cac ? `$${data.cac.toLocaleString()}` : 'Not provided'}
    - **Lifetime Value (LTV):** ${data.ltv ? `$${data.ltv.toLocaleString()}` : 'Not provided'}
    - **Founder Count:** ${data.founderCount}
    - **Full-Time Employees:** ${data.fullTimeEmployees}
    - **Has Prior Funding:** ${data.hasPriorFunding ? 'Yes' : 'No'}
    - **Current Funding Ask:** $${data.fundingAsk.toLocaleString()}

    Provide your analysis strictly in the following JSON format. Do not add any text before or after the JSON object.
    `;
};

/**
 * Calls the Gemini API to get an AI-powered analysis of the startup data.
 * @param formData The startup data from the form.
 * @returns A promise that resolves to an object with strengths and improvements.
 */
export const getAIAnalysis = async (formData: FormData): Promise<{ strengths: any[], improvements: any[] }> => {
    try {
        const prompt = generatePrompt(formData);

        // Fix: Use the 'gemini-2.5-flash' model as required by the guidelines.
        // Fix: Call generateContent with the model, contents, and JSON config.
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
            },
        });

        // Fix: Correctly extract the text response.
        const text = response.text;
        if (!text) {
            throw new Error("API returned an empty response.");
        }
        
        const result = JSON.parse(text);

        if (!result.strengths || !result.improvements) {
            throw new Error("Invalid JSON structure from API.");
        }

        return result;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get AI analysis. Please try again.");
    }
};
