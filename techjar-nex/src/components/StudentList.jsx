import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const StudentList = () => {
  const location = useLocation();
  const jobId = location.state?.jobId;
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${API_URL}/jobs/match-results/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filtered = jobId
          ? response.data.filter((student) => student.job_id === String(jobId))
          : response.data;

        const formatted = filtered.map((item) => ({
          id: item.id,
          name: item.user_name,
          email: item.email,
          contact: item.phone_number,
          resume: item.interview_link || "#",
          organization_name: item.organization_name,
          match_score: item.match_score || "N/A",
          status: item.status || "N/A",
        }));

        setStudents(formatted);
        setError("");
      } catch (err) {
        console.error("Failed to fetch students", err);
        setError("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [jobId, API_URL, token]);

  const handleSendMail = async (matchResultId, email) => {
    try {
      const response = await axios.post(
        `${API_URL}/jobs/send-email/?id=${matchResultId}`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const message = response.data?.message || response.data?.detail || "";

      if (message.toLowerCase().includes("already sent")) {
        toast.info(`Mail already sent to ${email}`, toastStyle());
      } else {
        toast.success(`Mail sent to ${email}`, toastStyle());
      }
    } catch (error) {
      const message =
        error.response?.data?.error || error.response?.data?.detail || "Failed to send email";

      if (message.toLowerCase().includes("already sent")) {
        toast.info(`Mail already sent to ${email}`, toastStyle());
      } else {
        toast.error(`Failed to send email to ${email}`, toastStyle());
      }
      console.error("Failed to send email", error);
    }
  };

  const handleSendMailToAll = async () => {
    const shortlistedStudents = students.filter((s) =>
      ["shortlisted", "strong Match"].includes(s.status)
    );

    if (shortlistedStudents.length === 0) {
      toast.info("No eligible students to send email.", toastStyle());
      return;
    }

    const results = await Promise.allSettled(
      shortlistedStudents.map((student) =>
        axios.post(
          `${API_URL}/jobs/send-email/?id=${student.id}`,
          { email: student.email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      )
    );

    results.forEach((result, index) => {
      const student = shortlistedStudents[index];
      if (result.status === "fulfilled") {
        const msg =
          result.value?.data?.message || result.value?.data?.detail || "";
        if (msg.toLowerCase().includes("already sent")) {
          toast.info(`Mail already sent to ${student.email}`, toastStyle());
        } else {
          toast.success(`Mail sent to ${student.email}`, toastStyle());
        }
      } else {
        const errorMessage =
          result.reason?.response?.data?.error ||
          result.reason?.response?.data?.detail ||
          "Failed to send email";

        if (errorMessage.toLowerCase().includes("already sent")) {
          toast.info(`Mail already sent to ${student.email}`, toastStyle());
        } else {
          toast.error(`Failed to send mail to ${student.email}`, toastStyle());
        }
      }
    });
  };

  const toastStyle = () => ({
    position: "top-center",
    autoClose: 2000,
    style: {
      background: "#222831",
      color: "#dfd0b8",
      border: "1px solid #dfd0b8",
    },
  });

  if (loading) return <div className="text-white p-6">Loading students...</div>;
  if (error) return <div className="text-red-400 p-6">{error}</div>;

  return (
    <div className="min-h-screen p-6 bg-[#222831] text-[#DFD0B8]">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2">
          <img src="/assets/botImage.png" alt="logo" className="w-10 h-10" />
          <span className="text-2xl font-bold">NEX.AI</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleSendMailToAll}
            className="bg-[#1e222a] text-[#DFD0B8] px-4 py-2 rounded-md hover:bg-black transition"
          >
            Send All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {students.map((student, idx) => (
          <div
            key={idx}
            className="bg-[#2c2f36] p-4 rounded shadow-md overflow-auto"
          >
            <p className="font-bold text-lg">{student.name}</p>
            <p className="text-sm">Email: {student.email}</p>
            <p className="text-sm">Contact: {student.contact}</p>
            <p className="text-sm">
              Organization Name: {student.organization_name}
            </p>
            <p className="text-sm">Match Score: {student.match_score}</p>
            <p className="text-sm">Match Status: {student.status}</p>
            <div className="flex gap-2 mt-3">
              {["shortlisted", "strong Match"].includes(student.status) ? (
                <button
                  onClick={() => handleSendMail(student.id, student.email)}
                  className="bg-[#1e222a] text-[#DFD0B8] px-3 py-1 rounded hover:bg-black transition"
                >
                  Send Mail
                </button>
              ) : (
                <p className="text-red-400 mt-2 text-sm">
                  Not eligible for mailing
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
