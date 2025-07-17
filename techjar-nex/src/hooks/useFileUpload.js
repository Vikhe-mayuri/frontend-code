// // hooks/useFileUpload.js

// import { useState } from "react";
// import { uploadResumes } from "../services/uploadService";

// const useFileUpload = () => {
//   const [status, setStatus] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleUpload = async (files, jobId) => {
//     setLoading(true);
//     setStatus("");

//     try {
//       await uploadResumes(files, jobId);
//       setStatus("Files uploaded successfully!");
//     } catch (error) {
//       console.error("Upload error:", error);
//       setStatus(`Upload failed: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { handleUpload, status, loading };
// };

// export default useFileUpload;


// hooks/useFileUpload.js

// src/hooks/useFileUpload.js
import { useState } from "react";
import { uploadResumes } from "../services/uploadService";

const useFileUpload = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (files, jobId) => {
    setLoading(true);
    setStatus("");

    try {
      await uploadResumes(files, jobId);
      setStatus("Files uploaded successfully!");
      return true;
    } catch (error) {
      console.error("Upload error:", error);
      setStatus(`Upload failed: ${error.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleUpload, status, loading };
};

export default useFileUpload;
