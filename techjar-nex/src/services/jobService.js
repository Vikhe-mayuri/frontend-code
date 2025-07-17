// src/services/jobService.js
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const postJob = async (jobData) => {
  const response = await axios.post(`${API_URL}/jobs/post-job-jd/`, jobData);
  return response.data;
};

export const getJobsForVendor = async (token) => {
  const response = await axios.get(`${API_URL}/jobs/jobpostlist/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ✅ Add this line
export const getAllJobs = getJobsForVendor;
