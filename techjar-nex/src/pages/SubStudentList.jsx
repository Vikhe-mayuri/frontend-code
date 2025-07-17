import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SubStudentList = () => {
  const location = useLocation();
  const jobId = location.state?.jobId;
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchShortlistedStudents = async () => {
      if (!jobId) return;
      try {
        const response = await axios.get(
          `${API_URL}/jobs/subvendor/shortlisted/${jobId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formatted = response.data.map((item) => ({
          id: item.id,
          name: item.user_name,
          email: item.email,
          contact: item.phone_number,
          interview_link: item.interview_link || "Not available",
          match_score: item.match_score || "N/A",
          status: item.status || "N/A",
        }));

        setStudents(formatted);
        setError("");
      } catch (err) {
        console.error("Failed to fetch shortlisted students", err);
        setError("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchShortlistedStudents();
  }, [jobId, API_URL, token]);

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    toast.success("Interview link copied to clipboard!");
  };

  if (loading)
    return <div className="text-white p-6">Loading students...</div>;

  if (error)
    return <div className="text-red-400 p-6">{error}</div>;

  return (
    <div className="min-h-screen p-6 bg-[#222831] text-[#DFD0B8]">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2">
          <img src="/assets/botImage.png" alt="logo" className="w-10 h-10" />
          <span className="text-2xl font-bold">NEX.AI</span>
        </div>
        <div className="text-sm text-gray-400">
          Job ID:{" "}
          <span className="text-[#DFD0B8] font-semibold">{jobId}</span>
        </div>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student, idx) => (
          <div
            key={idx}
            className="bg-[#2c2f36] border border-[#DFD0B8]/30 p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
          >
            <p className="text-lg font-semibold mb-1">{student.name}</p>
            <p className="text-sm text-gray-300">📧 {student.email}</p>
            <p className="text-sm text-gray-300">📞 {student.contact}</p>
            <p className="text-sm text-gray-300">
              🔍 Match Score: <span className="text-[#00ADB5]">{student.match_score}</span>
            </p>
            <p className="text-sm text-gray-300 mb-2">
              📝 Status: <span className="text-yellow-400">{student.status}</span>
            </p>

            {/* Interview Link */}
            {student.interview_link !== "Not available" ? (
              <div className="mt-3 text-sm">
                <p className="font-semibold mb-1 text-[#DFD0B8]">Interview Link</p>
                <div className="bg-[#393e46] px-3 py-2 rounded relative overflow-x-auto">
                  <span className="text-xs break-words">{student.interview_link}</span>
                  <button
                    className="absolute top-2 right-2 bg-[#948979] hover:bg-[#9d8158] text-white text-xs px-2 py-1 rounded"
                    onClick={() => handleCopy(student.interview_link)}
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-yellow-400 mt-2 text-sm">
                No interview link available.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubStudentList;
