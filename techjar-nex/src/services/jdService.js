// src/services/jdService.js

export const generateJobDescriptionAPI = async (data) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs/generate-jd/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "JD generation failed.");
    }

    const result = await response.json();
    return result.generated_jd || result.data?.job_description; // ← Extract JD from correct key
  } catch (error) {
    throw new Error(error.message || "Unexpected error during JD generation.");
  }
};



