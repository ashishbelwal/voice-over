import { TContent } from "../types/types";
import { v4 as uuidv4 } from "uuid";

// export const generateContent = async (prompt: string) => {
//   try {
//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "meta-llama/llama-3.3-70b-instruct:free",
//         messages: [
//           {
//             role: "user",
//             content: `Format this text into a clean audio script.
//                         Keep the original writing style and point of view (first-person or third-person) exactly the same.
//                         Do not invent new content, characters, or narrators.
//                         Just make the text flow naturally for an audio recording, adding light formatting for better speaking if needed.
//                         Do not comments or any other instructions.
//               ${prompt}`,
//           },
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_OR_TEXT_TO_TEXT_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const formattedContent = formatContent(
//       response.data.choices[0].message.content
//     );
//     return formattedContent;
//   } catch (error: any) {
//     throw error?.message || "Something went wrong";
//   }
// };

export const generateContent = async (
  prompt: string,
  onStream: (contentArray: TContent[]) => void
) => {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OR_TEXT_TO_TEXT_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct:free",
        stream: true,
        messages: [
          {
            role: "user",
            content: `Format this text into a clean audio script.
                    Keep the original writing style and point of view (first-person or third-person) exactly the same.
                    Do not invent new content, characters, or narrators.
                    Just make the text flow naturally for an audio recording, adding light formatting for better speaking if needed.
                    Do not add comments or any other instructions.
          ${prompt}`,
          },
        ],
      }),
    }
  );

  if (!response.body) throw new Error("No response body from server");

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = "";
  let contentArray: TContent[] = [];

  while (true) {
    const result = await reader.read();
    const { done, value } = result;

    if (done) break;

    const chunk = decoder.decode(value, { stream: true });

    const lines = chunk.split("\n").filter((line) => line.trim() !== "");

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const payload = line.replace("data: ", "");

        if (payload === "[DONE]") {
          break;
        }

        try {
          const json = JSON.parse(payload);
          const token = json.choices?.[0]?.delta?.content;

          if (token) {
            buffer += token;

            const parts = buffer.split("\n\n");
            const completeChunks = parts.slice(0, -1);
            buffer = parts[parts.length - 1];

            completeChunks.forEach((chunk) => {
              if (chunk.trim()) {
                contentArray.push({
                  id: uuidv4(),
                  text: chunk.trim(),
                  waveform: null,
                  audio: "",
                  voice: "",
                });
              }
            });

            onStream([...contentArray]);
          }
        } catch (e) {
          console.warn("Could not parse stream chunk", e);
        }
      }
    }
  }

  if (buffer.trim()) {
    contentArray.push({
      id: uuidv4(),
      text: buffer.trim(),
      waveform: null,
      audio: "",
      voice: "",
    });
    onStream([...contentArray]);
  }

  return contentArray;
};
