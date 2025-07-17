// src/services/assignmentService.js
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export const assignJobToSubvendor = async (subVendorId, jdId, token) => {
  const response = await axios.post(
    `${BASE_URL}/jobs/assign-jd-subvendor/`,
    { sub_vendor: subVendorId, jd: jdId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getAssignedJobsForSubvendor = async (token) => {
  const response = await axios.get(`${BASE_URL}/jobs/subvendor/jds/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
