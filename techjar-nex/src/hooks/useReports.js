// import { useEffect, useState } from "react";
// import { fetchReports } from "../services/reportService";

// export const useReports = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadReports = async () => {
//       try {
//         const data = await fetchReports();
//         setReports(data);
//       } catch {
//         setError("Failed to load reports");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadReports();
//   }, []);

//   return { reports, loading, error };
// };



// useReports.js
import { useEffect, useState } from "react";
import { fetchReports } from "../services/reportService";

export const useReports = () => {
  const [groupedReports, setGroupedReports] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await fetchReports();

        const grouped = data.reduce((acc, report) => {
          const org = report.organization_name;
          if (!acc[org]) acc[org] = [];
          acc[org].push(report);
          return acc;
        }, {});
        setGroupedReports(grouped);
      } catch {
        setError("Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  return { groupedReports, loading, error };
};
