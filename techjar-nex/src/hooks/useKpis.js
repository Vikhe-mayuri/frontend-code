import { useState, useEffect } from "react";
import { fetchKPIs } from "../services/kpiService";
import { useAuth } from "../context/AuthContext"; // ✅ import

const useKpis = () => {
  const { token } = useAuth(); // ✅ get token from AuthContext

  const [kpis, setKpis] = useState({
    activeListings: 0,
    totalJobsPosted: 0,
    candidatesInPipeline: 0,
    applicationsProcessed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadKPIs = async () => {
      try {
        if (!token) return; // ⛔ don't call if token is missing
        const data = await fetchKPIs(token); // ✅ pass token
        setKpis(data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadKPIs();
  }, [token]); // ✅ watch for token availability

  return { kpis, loading, error };
};

export default useKpis;
