import axios from "axios";
import { formatContent } from "../utils";

export const generateContent = async (prompt: string) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.3-70b-instruct:free",
        messages: [
          {
            role: "user",
            content: `Format this text into a clean audio script.
                        Keep the original writing style and point of view (first-person or third-person) exactly the same.
                        Do not invent new content, characters, or narrators.
                        Just make the text flow naturally for an audio recording, adding light formatting for better speaking if needed.
                        Do not comments or any other instructions.
              ${prompt}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OR_TEXT_TO_TEXT_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const formattedContent = formatContent(
      response.data.choices[0].message.content
    );

    // console.log(response.data.choices[0].message.content);
    return formattedContent;
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
};
