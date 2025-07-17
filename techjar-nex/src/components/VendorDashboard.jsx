// import React from "react";
// import { UserRound } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import useKpis from "../hooks/useKpis";

// const VendorDashboard = () => {
//   const navigate = useNavigate();
//   const { kpis, loading, error } = useKpis();

//   return (
//     <div className="min-h-screen bg-[#1e222a] text-[#DFD0B8] p-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-10">
//         <div className="flex items-center gap-3">
//           <img
//             src="/src/assets/botImage.png"
//             alt="logo"
//             className="w-12 h-12 object-contain"
//           />
//           <span className="text-3xl font-bold text-[#DFD0B8]">NEX.AI</span>
//         </div>
//         <div className="flex gap-10">
//           <button
//             className="border px-4 py-1 rounded-md"
//             onClick={() => navigate("/vendor-jobs")}
//           >
//             Jobs
//           </button>
//           <button className="border px-4 py-1 rounded-md">Student-List</button>
//         </div>
//         <div className="flex items-center gap-2 text-lg font-semibold">
//           Hi, Vendor
//           <UserRound className="w-6 h-6" />
//         </div>
//       </div>

//       {/* KPI boxes */}
//       <div className="flex justify-between items-start mt-10">
//         <div className="flex flex-col gap-6 w-72 mx-auto mt-10 ml-30">
//           <div className="border border-[#DFD0B8] p-6 text-center rounded-md">
//             <div className="text-sm mb-2">Active job listings</div>
//             <div className="text-3xl font-bold">
//               {loading ? (
//                 "Loading KPIs..."
//               ) : error ? (
//                 "Error loading KPIs"
//               ) : (
//                 kpis.activeListings
//               )}
//             </div>
//           </div>
//           <div className="border border-[#DFD0B8] p-6 text-center rounded-md">
//             <div className="text-sm mb-2">Total number of job openings posted</div>
//             <div className="text-3xl font-bold">
//               {loading ? (
//                 "Loading KPIs..."
//               ) : error ? (
//                 "Error loading KPIs"
//               ) : (
//                 kpis.totalJobsPosted
//               )}
//             </div>
//           </div>
//           <div className="border border-[#DFD0B8] p-6 text-center rounded-md">
//             <div className="text-sm mb-2">Number of candidates in the pipeline</div>
//             <div className="text-3xl font-bold">
//               {loading ? (
//                 "Loading KPIs..."
//               ) : error ? (
//                 "Error loading KPIs"
//               ) : (
//                 kpis.candidatesInPipeline
//               )}
//             </div>
//           </div>
//           <div className="border border-[#DFD0B8] p-6 text-center rounded-md">
//             <div className="text-sm mb-2">Applications processed</div>
//             <div className="text-3xl font-bold">
//               {loading ? (
//                 "Loading KPIs..."
//               ) : error ? (
//                 "Error loading KPIs"
//               ) : (
//                 kpis.applicationsProcessed
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="mr-5">
//           <img
//             src="/src/assets/1.png"
//             alt="Illustration"
//             className="max-w-md object-contain"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorDashboard;

// src/components/VendorDashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import { fetchKPIs } from "../services/kpiService";
import { uploadSubvendor } from "../services/subvendorService";
import { useSubvendors } from "../hooks/useSubvendors";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { UserRound, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { logout, auth } = useAuth();
  const token = auth?.token;

  const [kpis, setKpis] = useState({
    active_job_listings: 0,
    total_job_openings: 0,
    candidates_in_pipeline: 0,
    applications_processed: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [subvendor, setSubvendor] = useState({
    name: "",
    email: "",
    password: "",
  });

  // eslint-disable-next-line no-unused-vars
  const { subvendors, fetchSubvendors } = useSubvendors();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const loadKPIs = async () => {
      if (!token) return;
      try {
        const data = await fetchKPIs(token);
        setKpis(data);
      } catch (error) {
        console.error("Failed to fetch KPIs:", error);
      }
    };
    loadKPIs();
    // fetchSubvendors(token);
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

  const handleInputChange = (e) => {
    setSubvendor({ ...subvendor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await uploadSubvendor(subvendor, token);
      toast.success("Subvendor added successfully");
      setSubvendor({ name: "", email: "", password: "" });
      setShowModal(false);
    } catch (err) {
      toast.error("Error adding subvendor");
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  return (
    <div className="min-h-screen bg-[#1e222a] text-[#DFD0B8] p-4 sm:p-6 lg:p-8 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        {/* Logo */}
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

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {["/vendor-jobs", "/vendor-reports"].map((route, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(route)}
              className="border px-5 py-2 rounded-md min-w-[120px] text-base font-medium hover:bg-[#DFD0B8] hover:text-[#1e222a] transition"
            >
              {route.includes("jobs") ? "Jobs" : "Reports"}
            </motion.button>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border px-5 py-2 rounded-md min-w-[120px] text-base font-medium hover:bg-[#DFD0B8] hover:text-[#1e222a] transition"
            onClick={() => setShowModal(true)}
          >
            Add Subvendor
          </motion.button>
          {/* Profile Dropdown */}
          <div ref={dropdownRef} className="relative z-50">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-2 font-semibold cursor-pointer select-none"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              Hi, Vendor
              <UserRound className="w-5 h-5" />
              <ChevronDown size={16} />
            </motion.div>

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
      </div>

      {/* KPI Cards and Image */}
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-10 mt-8">
        {/* KPI Cards */}
        <div className="flex flex-col gap-6 w-full max-w-xs sm:max-w-sm lg:ml-32">
          {Object.entries(kpis).map(([label, value], index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="border border-[#DFD0B8] p-5 sm:p-6 text-center rounded-md hover:shadow-xl hover:scale-105 transition-all duration-300 bg-[#2c303a]"
              style={{ boxShadow: "0 0 12px rgba(223, 208, 184, 0.3)" }}
            >
              <div className="text-xs sm:text-sm mb-2 capitalize">
                {label.replaceAll("_", " ")}
              </div>
              <div className="text-2xl sm:text-3xl font-bold">{value}</div>
            </motion.div>
          ))}
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-md"
        >
          <img
            src="/assets/1.png"
            alt="Illustration"
            className="w-full object-contain rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </div>

      {/* Subvendor List */}
      {subvendors.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Subvendors</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subvendors.map((sv, i) => (
              <div
                key={i}
                className="bg-[#2c303a] border border-[#DFD0B8] p-4 rounded"
              >
                <p>
                  <strong>Name:</strong> {sv.name}
                </p>
                <p>
                  <strong>Email:</strong> {sv.email}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#222831] bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#2c2f36] border border-[#DFD0B8] rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-center">
              Add Subvendor
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {["name", "email", "password"].map((field) => (
                <input
                  key={field}
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  value={subvendor[field]}
                  onChange={handleInputChange}
                  placeholder={`Subvendor ${field
                    .charAt(0)
                    .toUpperCase()}${field.slice(1)}`}
                  required
                  className="p-2 rounded bg-[#1e222a] text-[#DFD0B8] border border-[#DFD0B8]"
                />
              ))}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#DFD0B8] text-[#1e222a] hover:bg-[#c0ae92]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
