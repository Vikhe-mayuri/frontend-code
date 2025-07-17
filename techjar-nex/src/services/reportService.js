import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchReports = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/jobs/reports/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};