
import { GoogleGenAI } from "@google/genai";
import { Category, Transaction } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeBudget(categories: Category[], transactions: Transaction[]) {
  const categoriesStr = categories.map(c => `${c.emoji} ${c.name}: Budget ${c.budget}€, Spent ${c.spent}€`).join('\n');
  const transactionsStr = transactions.slice(-5).map(t => `- ${t.date}: ${t.description} (${t.amount}€)`).join('\n');

  const prompt = `
    Analyze this student budget for "TU BECA":
    
    Categories:
    ${categoriesStr}
    
    Recent Transactions:
    ${transactionsStr}
    
    Total Budget: 1700€
    
    Please provide:
    1. A quick summary of the current financial health.
    2. Specific advice on the categories where the budget is nearly or already exhausted (like 'Juegos').
    3. Suggestions for the high-ticket items like the 'Portátil' or 'Ropa'.
    4. An overall rating out of 10.
    
    Keep the tone professional yet encouraging for a student. Answer in Spanish.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing budget:", error);
    return "Lo siento, no he podido analizar tu presupuesto en este momento. Por favor, inténtalo de nuevo más tarde.";
  }
}
