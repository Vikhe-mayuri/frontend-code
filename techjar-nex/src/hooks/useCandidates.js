import { useState, useEffect } from "react";
import { uploadResume } from "../services/jobService";

export const useCandidates = (jobId) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) return;

    setLoading(true);
    uploadResume(jobId)
      .then(data => {
        setCandidates(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setCandidates([]);
      })
      .finally(() => setLoading(false));
  }, [jobId]);

  return { candidates, loading, error };
};
