// hooks/useJobDescription.js
import { useState } from "react";

export const useJobDescription = () => {
  const [generatedDesc, setGeneratedDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateJD = async (formData) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs/generate-jd/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate job description.");
      }

      const data = await response.json();
      setGeneratedDesc(data.generated_jd || "");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const resetJD = () => setGeneratedDesc(""); // ✅ clears on post

  return {
    generatedDesc,
    loading,
    error,
    generateJD,
    resetJD,
  };
};
