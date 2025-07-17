import React, { useState, useEffect } from "react";
import { useJobs } from "../hooks/useJobs";
import { useNavigate, useLocation } from "react-router-dom";

const VendorJobInbox = () => {
  const { jobs, loading, error } = useJobs();
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSendToSubvendor = (id) => {
    navigate("/subvendor-list", { state: { jobId: id } });
  };

  const handleViewCandidates = (id) => {
    navigate("/students", { state: { jobId: id } });
  };
  const handleUpload = (id) => {
    navigate("/upload", { state: { jobId: id, jobData: selectedJob } });
  };

  useEffect(() => {
    const returnedJobData = location.state?.jobData;
    if (returnedJobData) {
      setSelectedJob(returnedJobData);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-[#1e222a] text-[#DFD0B8] p-4 flex flex-col md:grid md:grid-cols-3 gap-4">
      {/* Sidebar */}
      <div className="bg-[#2c2f36] p-4 rounded-lg shadow-md md:col-span-1 max-h-[40vh] md:max-h-[100vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 border-b border-[#393e46] pb-2">
          Jobs
        </h2>

        {loading && <p className="text-gray-400">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && jobs.length === 0 && (
          <p className="text-gray-400">No jobs found.</p>
        )}

        <ul className="space-y-3">
          {jobs.map((job) => (
            <li
              key={job._id}
              onClick={() => setSelectedJob(job)}
              className={`p-3 rounded cursor-pointer hover:bg-[#393e46] ${
                selectedJob?._id === job._id ? "bg-[#393e46]" : ""
              }`}
            >
              <p className="font-semibold">{job.job_title}</p>
              <p className="text-sm text-gray-400">{job.organization_name}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Job Details */}
      <div className="bg-[#2c2f36] p-4 rounded-lg shadow-md  max-h-[40vh] md:max-h-[100vh] overflow-y-auto w-[70%] md:w-full md:col-span-2">
        {selectedJob ? (
          <>
            {/* {console.log(
              "Selected job before upload:",
              selectedJob.organization_name
            )} */}
            {console.log("Selected job before upload:", selectedJob.id)}
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {selectedJob.job_title}
            </h2>
            <p className="mb-1">
              <strong>Organization:</strong> {selectedJob.organization_name}
            </p>
            <p className="mb-1">
              <strong>Email:</strong> {selectedJob.email}
            </p>
            <p className="mb-1">
              <strong>Posted At:</strong>{" "}
              {new Date(selectedJob.posted_at).toLocaleString()}
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-[#DFD0B8]">
                Description:
              </h3>
              <div className="space-y-2">
                {selectedJob.generated_jd
                  .split(/\.\s*|\n+/)
                  .filter((line) => line.trim() !== "")
                  .map((line, idx) => (
                    <div key={idx}>{line.trim()}</div>
                  ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleUpload(selectedJob.id)}
                className="bg-[#1e222a] hover:bg-black text-[#DFD0B8] px-4 py-2 rounded-md w-full sm:w-auto"
              >
                Upload Resumes
              </button>
              <button
                onClick={() => handleViewCandidates(selectedJob.id)}
                className="bg-[#1e222a] hover:bg-black text-[#DFD0B8] px-4 py-2 rounded-md w-full sm:w-auto"
              >
                Shortlisted Candidates
              </button>
              <button
                onClick={() => handleSendToSubvendor(selectedJob.id)}
                className="bg-[#1e222a] hover:bg-black text-[#DFD0B8] px-4 py-2 rounded-md w-full sm:w-auto"
              >
                Assign Job To Subvendor
              </button>
            </div>
            <p className="text-sm text-yellow-200 mt-2">
              🔔 Upload resumes to view shortlisted candidates.
            </p>
          </>
        ) : (
          <p className="text-gray-400 text-center md:text-left">
            Select a job from the left panel to view details.
          </p>
        )}
      </div>
    </div>
  );
};

export default VendorJobInbox;
