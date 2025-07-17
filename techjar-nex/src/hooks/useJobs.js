// src/hooks/useJobs.js
import { useState, useEffect } from "react";
import { getJobsForVendor } from "../services/jobService";
import { useAuth } from "../context/AuthContext";

export const useJobs = () => {
  const { auth } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (!auth?.token) {
          throw new Error("Token not available");
        }

        const data = await getJobsForVendor(auth.token);
        setJobs(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [auth]);

  return { jobs, loading, error };
};
