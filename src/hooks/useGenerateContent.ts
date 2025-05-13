import { useState } from "react";
import { generateContent as generateContentApi } from "../services/api"; // assuming your api file path
import { TContent } from "../types/types";
export const useGenerateContent = () => {
  const [data, setData] = useState<TContent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = async (prompt: string) => {
    setLoading(true);
    setError(null);
    setData([]);
    try {
      await generateContentApi(prompt, (contentArray: TContent[]) => {
        setData(contentArray);
      });
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, generateContent };
};
