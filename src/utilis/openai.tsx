// import Groq from "groq-sdk";
// import { GROQ_KEY } from "../utilis/constants";

// const groq = new Groq({ apiKey: GROQ_KEY, dangerouslyAllowBrowser: true});
// export default groq;
import { GoogleGenAI } from "@google/genai";
import { GEMINI_KEY } from "./constants";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey :GEMINI_KEY});

export default ai;