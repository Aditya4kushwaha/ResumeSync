import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

export async function analyzeResume(resume: string, jobDescription: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing.");

  const genAI = new GoogleGenerativeAI(apiKey);

  // 1. Update to a current model (e.g., 2.0 or 2.5 Flash)
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", 
    generationConfig: {
      responseMimeType: "application/json", // Forces JSON output
    }
  });

  const prompt = `
    You are an expert ATS optimizer. 
    Analyze the following Resume against the Job Description.
    
    Resume: ${resume}
    Job Description: ${jobDescription}

    Return JSON strictly matching this structure. IMPORTANT: All values MUST be plain strings (use \\n for line breaks). Do NOT use nested objects or arrays.
    {
      "skillGapAnalysis": "Detailed missing skills analysis (string)",
      "improvedResume": "Optimized resume content (string)",
      "interviewTips": "3-5 interview questions and tips (string)"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // No regex cleaning needed if responseMimeType is set!
    return JSON.parse(responseText);

  } catch (error: any) {
    console.error("Gemini API Error:", error.message);
    throw new Error(`AI Analysis Failed: ${error.message}`);
  }
}