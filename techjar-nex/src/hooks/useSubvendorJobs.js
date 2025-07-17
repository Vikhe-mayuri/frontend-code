// src/hooks/useSubvendorJobs.js
import { useEffect, useState } from "react";
import { getAssignedJobsForSubvendor } from "../services/assignmentService";
import { useAuth } from "../context/AuthContext";

export const useSubvendorJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { auth } = useAuth();
  const token = auth?.token;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAssignedJobsForSubvendor(token);
        setJobs(data);
      } catch (err) {
        setError("Failed to fetch jobs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchJobs();
  }, [token]);

  return { jobs, loading, error };
};
