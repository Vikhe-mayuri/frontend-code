// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import useFileUpload from "../hooks/useFileUpload";

// function FileUpload() {
//   const location = useLocation();
//   const jobId = location.state?.jobId;
//   const navigate = useNavigate();

//   const { handleUpload, status, loading } = useFileUpload();
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const onSubmit = async () => {
//     if (!jobId) {
//       alert("Job ID not found. Please navigate properly.");
//       return;
//     }
//     if (selectedFiles.length === 0) {
//       alert("Please select at least one file.");
//       return;
//     }

//     const success = await handleUpload(selectedFiles, jobId);

//     if (success) {
//       navigate("/vendor-jobs");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[#222831] p-4">
//       <div className="bg-[#dfd0b8] shadow-md rounded-lg p-6 w-full max-w-lg">
//         <h2 className="text-xl font-semibold mb-4 text-center text-[#222831]">
//           Upload Resume
//         </h2>

//         <input
//           type="file"
//           multiple
//           onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
//           className="w-full mb-4 border border-[#948979] p-2 rounded"
//         />

//         <button
//           onClick={onSubmit}
//           disabled={loading}
//           className={`w-full py-2 rounded text-[#222831] font-semibold transition ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-transparent border border-[#948979] hover:bg-[#222831] hover:text-[#dfd0b8]"
//           }`}
//         >
//           {loading ? "Uploading..." : "Upload"}
//         </button>

//         {status && (
//           <p className="mt-4 text-sm text-center text-green-700 font-medium">
//             {status}
//           </p>
//         )}

//         {selectedFiles.length > 0 && (
//           <ul className="mt-4 text-sm text-gray-700 list-disc list-inside">
//             {selectedFiles.map((file, index) => (
//               <li key={index}>{file.name}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// export default FileUpload;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFileUpload from "../hooks/useFileUpload";
import { toast } from "react-toastify";

function FileUpload() {
  const location = useLocation();
  const jobId = location.state?.jobId;
  const jobData = location.state?.jobData;
  const navigate = useNavigate();

  const { handleUpload, status, loading } = useFileUpload();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onSubmit = async () => {
    if (!jobId) {
      alert("Job ID not found. Please navigate properly.");
      return;
    }
    if (selectedFiles.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    const success = await handleUpload(selectedFiles, jobId);

    if (success) {
      toast.success("Resume Uploaded Successfully", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        style: {
          background: "#222831",
          color: "#dfd0b8",
          border: "1px solid #dfd0b8",
        },
      });

      setTimeout(() => {
        navigate("/vendor-jobs", { state: { jobId, jobData } });
      }, 2100);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#222831] p-4">
      <div className="bg-[#dfd0b8] shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-center text-[#222831]">
          Upload Resume
        </h2>

        <input
          type="file"
          multiple
          onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
          className="w-full mb-4 border border-[#948979] p-2 rounded"
        />

        <button
          onClick={onSubmit}
          disabled={loading}
          className={`w-full py-2 rounded text-[#222831] font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-transparent border border-[#948979] hover:bg-[#222831] hover:text-[#dfd0b8]"
          }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {status && (
          <p className="mt-4 text-sm text-center text-green-700 font-medium">
            {status}
          </p>
        )}

        {selectedFiles.length > 0 && (
          <ul className="mt-4 text-sm text-gray-700 list-disc list-inside">
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
