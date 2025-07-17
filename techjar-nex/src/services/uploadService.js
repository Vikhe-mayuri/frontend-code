// src/services/uploadService.js
const API_URL = import.meta.env.VITE_API_URL;
export const uploadResumes = async (files, jd_id) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("resumes", file));
  formData.append("jobId", jd_id);

  const token = localStorage.getItem("authToken");

  const response = await fetch(`${API_URL}/jobs/jdresponse/`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Upload failed");
  }

  return response.json();
};
