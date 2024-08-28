import { env } from "../env";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const genAi = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
