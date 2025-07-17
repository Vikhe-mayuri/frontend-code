import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserRound, ChevronDown } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "react-toastify"; // ✅ toast import

const SubVendorDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // ✅ state for upload status

  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const token = auth?.token;
  const hasFetched = useRef(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    if (!token || hasFetched.current) return;

    const fetchAssignedJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/jobs/subvendor/jds/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const extractedJobs = response.data.map((item) => {
          const { id, job_title, posted_at, generated_jd } = item.jd_details;

          return {
            id,
            job_title,
            posted_at,
            generated_jd,
            assignment_id: item.id,
          };
        });

        setJobs(extractedJobs);
        setSelectedJob(extractedJobs[0] || null);
      } catch (error) {
        console.error("Error fetching subvendor jobs", error);
      }
    };

    hasFetched.current = true;
    fetchAssignedJobs();
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResumeUpload = async (e) => {
    const files = e.target.files;
    if (!files.length || !selectedJob) return;

    const formData = new FormData();
    formData.append("jobId", selectedJob.id);

    for (let i = 0; i < files.length; i++) {
      formData.append("resumes", files[i]);
    }

    try {
      setIsUploading(true); // ✅ start uploading

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/jobs/subvendor/upload-resumes/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Upload failed");
      }

      toast.success("✅ Resumes uploaded successfully");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(`❌ Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false); // ✅ reset uploading
    }
  };

  const handleViewCandidates = () => {
    if (selectedJob?.id) {
      navigate("/sub-students", { state: { jobId: selectedJob.id } });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#1e222a] text-[#DFD0B8]">
      {/* Navbar/Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 lg:px-10 border-b border-[#393e46]">
        <div className="flex items-center gap-3">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src="/assets/botImage.png"
            alt="logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl font-bold text-[#DFD0B8]"
          >
            NEX.AI
          </motion.span>
        </div>

        <div ref={dropdownRef} className="relative z-50 mt-4 sm:mt-0">
          <div
            className="flex items-center gap-2 font-semibold cursor-pointer select-none"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            Hi, Subvendor
            <UserRound className="w-5 h-5" />
            <ChevronDown size={16} />
          </div>

          <div
            className={`absolute right-0 mt-2 w-32 bg-[#2c2f36] text-[#DFD0B8] border border-[#DFD0B8] rounded-md shadow-md transition-all duration-200 ${
              dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <div
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-[#3c4049] cursor-pointer text-sm"
            >
              Logout
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Body */}
      <div className="flex">
        {/* Sidebar: Job List */}
        <aside className="w-1/4 bg-[#393e46] p-5 min-h-screen overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Assigned Jobs</h2>
          {jobs.length === 0 ? (
            <p className="text-sm text-gray-400">No jobs assigned yet.</p>
          ) : (
            jobs.map((job, index) => (
              <button
                key={index}
                onClick={() => setSelectedJob(job)}
                className={`block w-full text-left p-2 rounded mb-2 text-sm ${
                  selectedJob?.id === job.id
                    ? "bg-[#dfd0b8] text-[#1e222a] font-semibold"
                    : "bg-gray-700 text-white"
                }`}
              >
                Job {index + 1}
              </button>
            ))
          )}
        </aside>

        {/* Main Job Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {selectedJob ? (
            <div className="bg-[#2c303a] text-[#DFD0B8] p-6 rounded shadow-md border border-[#DFD0B8]">
              <h2 className="text-xl font-bold">{selectedJob.job_title}</h2>

              <p className="mt-2 text-sm">
                📅 Posted At: {new Date(selectedJob.posted_at).toLocaleString()}
              </p>

              {/* Structured Description */}
              <p className="mt-4 text-sm font-semibold mb-2">📄 Description:</p>
              <div className="ml-3 text-sm space-y-1">
                {selectedJob.generated_jd
  .split("\n")
  .filter(
    (line) =>
      line.trim() !== "" &&
      !/email|e-mail|mail|@/i.test(line) && // remove lines with email
      !/company|organization|employer|hiring/i.test(line) // remove company references
  )
  .map((line, idx) => (
    <p key={idx} className="leading-relaxed text-[#dfd0b8]">
      • {line.trim()}
    </p>
  ))}

              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6 flex-wrap">
                <label
                  className={`${
                    isUploading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-[#00ADB5] hover:bg-[#008891]"
                  } text-white px-4 py-2 rounded cursor-pointer transition`}
                >
                  {isUploading ? "Uploading..." : "Upload Resumes"}
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleResumeUpload}
                    disabled={isUploading}
                  />
                </label>

                <button
                  onClick={handleViewCandidates}
                  className="bg-[#DFD0B8] text-[#1e222a] px-4 py-2 rounded hover:bg-[#c0ae92]"
                >
                  View Candidates
                </button>
              </div>

              <p className="text-sm text-yellow-200 mt-2">
                🔔 Upload resumes to view shortlisted candidates.
              </p>
            </div>
          ) : (
            <p className="text-gray-400">No job selected.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default SubVendorDashboard;
