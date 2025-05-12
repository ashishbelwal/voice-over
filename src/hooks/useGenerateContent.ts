import { useState } from "react";
import { generateContent as generateContentApi } from "../services/api"; // assuming your api file path

export const useGenerateContent = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = async (prompt: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await generateContentApi(prompt);
      setData(response);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, generateContent };
};
