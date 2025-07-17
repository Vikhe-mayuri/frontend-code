// src/hooks/useSubvendors.js
import { useState } from "react";
import { getSubvendors } from "../services/subvendorService";

export const useSubvendors = () => {
  const [subvendors, setSubvendors] = useState([]);

  const fetchSubvendors = async (token) => {
    try {
      const data = await getSubvendors(token);
      setSubvendors(data);
    } catch (error) {
      console.error("Failed to fetch subvendors", error);
    }
  };

  return { subvendors, fetchSubvendors };
};
