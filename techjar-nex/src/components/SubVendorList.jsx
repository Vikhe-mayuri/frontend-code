// import React from "react";

// const subVendors = [
//   {
//     name: "Alpha Recruiters",
//     email: "alpha@recruit.com",
//     contact: "9012345678",
//   },
//   {
//     name: "TalentBridge",
//     email: "bridge@talent.com",
//     contact: "9123456789",
//   },
//   {
//     name: "CareerHub",
//     email: "career@hub.com",
//     contact: "9234567890",
//   },
// ];

// const handleAssignJob = (email) => {
//   alert(`Job assigned to ${email}`);
// };

// const handleAssignToAll = () => {
//   const allEmails = subVendors.map((vendor) => vendor.email).join(", ");
//   alert(`Job assigned to all: ${allEmails}`);
// };

// function SubVendorList() {
//   return (
//     <div className="p-6 bg-[#222831]">
//       <div className="flex items-center gap-2 mb-10">
//         <img src="/assets/botImage.png" alt="logo" className="w-10 h-10" />
//         <span className="text-2xl font-bold text-[#DFD0B8]">NEX.AI</span>
//       </div>
//       <h1 className="text-2xl font-bold mb-4 text-[#dfd0b8]">Sub Vendors</h1>
//       <div className="grid gap-4">
//         {subVendors.map((vendor, index) => (
//           <div
//             key={index}
//             className="bg-[#393e46] shadow-md rounded-lg p-4 border border-[#948979] text-[#dfd0b8]"
//           >
//             <p>
//               <strong>Name:</strong> {vendor.name}
//             </p>
//             <p>
//               <strong>Email:</strong> {vendor.email}
//             </p>
//             <p>
//               <strong>Contact:</strong> {vendor.contact}
//             </p>
//             <div className="mt-2">
//               <button
//                 onClick={() => handleAssignJob(vendor.email)}
//                 className="bg-[#222831] text-white px-4 py-2 rounded hover:bg-[#948979] hover:text-[#222831] transition"
//               >
//                 Assign Job
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="mt-6">
//         <button
//           onClick={handleAssignToAll}
//           className="border border-[#948979] text-white px-4 py-2 rounded-xl hover:bg-[#948979] hover:text-[#222831] transition"
//         >
//           Assign Job To All
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SubVendorList;

import React, { useEffect, useState } from "react";
import { getSubvendors } from "../services/subvendorService";
import { getAllJobs } from "../services/jobService"; // Ensure this exists
import { assignJobToSubvendor } from "../services/assignmentService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function SubVendorList() {
  const [subVendors, setSubVendors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { auth } = useAuth();
  const token = auth?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subs, jobList] = await Promise.all([
          getSubvendors(token),
          getAllJobs(token),
        ]);
        setSubVendors(subs);
        setJobs(jobList);
      } catch  {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleAssignJob = async (subvendorId) => {
    if (!jobs.length) return toast.error("No jobs to assign.");
    const job = jobs[0]; // Replace with selected if needed
    try {
      await assignJobToSubvendor(subvendorId, job.id, token);
      const localKey = `subVendorJobs_${subvendorId}`;
      const existing = JSON.parse(localStorage.getItem(localKey)) || [];
      localStorage.setItem(localKey, JSON.stringify([...existing, job]));
      toast.success(`Assigned job "${job.job_title}" to subvendor.`);
    } catch  {
      toast.error("Failed to assign job.");
    }
  };

  const handleAssignToAll = async () => {
    if (!jobs.length) return toast.error("No jobs to assign.");
    const job = jobs[0];
    try {
      await Promise.all(
        subVendors.map((vendor) =>
          assignJobToSubvendor(vendor.id, job.id, token)
        )
      );
      subVendors.forEach((vendor) => {
        const key = `subVendorJobs_${vendor.id}`;
        const prev = JSON.parse(localStorage.getItem(key)) || [];
        localStorage.setItem(key, JSON.stringify([...prev, job]));
      });
     toast.success(`Assigned job "${job.job_title}" to all subvendors.`);
    } catch  {
      toast.error("Assignment to all failed.");
    }
  };

  return (
    <div className="p-6 bg-[#222831] min-h-screen text-[#DFD0B8]">
      <h1 className="text-2xl font-bold mb-6">Sub Vendors</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subVendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-[#393e46] p-4 rounded-lg border border-[#948979]"
          >
            <p><strong>Email:</strong> {vendor.email}</p>
            <p><strong>Role:</strong> {vendor.role}</p>
            <button
              onClick={() => handleAssignJob(vendor.id)}
              className="mt-3 bg-[#948979] text-[#222831] px-4 py-2 rounded hover:opacity-90"
            >
              Assign Job
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={handleAssignToAll}
          className="border border-[#948979] px-6 py-2 rounded text-white hover:bg-[#948979] hover:text-[#222831]"
        >
          Assign Job To All
        </button>
      </div>
    </div>
  );
}

export default SubVendorList;
