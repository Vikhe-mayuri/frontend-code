// src/services/subvendorService.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const uploadSubvendor = async ({ name, email, password }, token) => {
  const response = await axios.post(
    `${BASE_URL}/api/subvendor/add/`,
    {
      username: name,
      email,
      password,
      role: "subvendor", // required by backend
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getSubvendors = async (token) => {
  const response = await axios.get(`${BASE_URL}/api/subvendors/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
