// import { React, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import SuccessAnimation from "./SuccessAnimation";
// import { useJobDescription } from "../hooks/useJobDescription";
// import { postJob } from "../services/jobService";

// const Jobpost = () => {
//   const [organization_name, setorganization_name] = useState("");
//   const [email, setEmail] = useState("");
//   const [job_industry, setjob_industry] = useState("");
//   const [job_title, setjob_title] = useState("");
//   const [skills, setskills] = useState("");
//   const [job_location, setjob_location] = useState("");
//   const [ctc, setCtc] = useState("");
//   const [eligibility_criteria, seteligibility_criteria] = useState("");
//   const [requirements, setRequirements] = useState("");
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [hasGenerated, setHasGenerated] = useState(false);

//   const { generatedDesc, loading, error, generateJD } = useJobDescription();
//   const [editableDesc, setEditableDesc] = useState("");

//   useEffect(() => {
//     if (generatedDesc) {
//       setEditableDesc(generatedDesc);
//     }
//   }, [generatedDesc]);

//   const handleGenerate = async () => {
//     await generateJD({
//       organization_name,
//       job_industry,
//       job_title,
//       skills,
//       job_location,
//       ctc,
//       eligibility_criteria,
//       requirements,
//       email,
//     });
//     setHasGenerated(true);
//   };

//   const handlePostJob = async (descriptionToPost) => {
//     const newJob = {
//       organization_name,
//       job_title,
//       email,
//       posted_at: new Date().toISOString(),
//       generated_jd: descriptionToPost,
//     };

//     try {
//       await postJob(newJob);
//       setShowSuccess(true);

//       // Reset form
//       setorganization_name("");
//       setEmail("");
//       setjob_industry("");
//       setjob_title("");
//       setskills("");
//       setjob_location("");
//       setCtc("");
//       seteligibility_criteria("");
//       setRequirements("");
//       setHasGenerated(false);
//     } catch (error) {
//       console.error("Error posting job:", error);
//       alert("Failed to post job. Please try again.");
//     }
//   };

//   useEffect(() => {
//     if (showSuccess) {
//       const timer = setTimeout(() => setShowSuccess(false), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [showSuccess]);
//   const formatAsBullets = (text) => {
//     return text
//       .split(/\.\s+|\n+/) // Split by period or newline
//       .filter((line) => line.trim() !== "")
//       .map((line) => `• ${line.trim()}`)
//       .join("\n");
//   };
//   // const formatAsBullets = (text) => {
//   //   if (!text) return "";

//   //   // Extract job_name and company_name with regex
//   //   const jobNameMatch = text.match(/job_name:\s*([^\.]+)\.?/i);
//   //   const companyNameMatch = text.match(/company_name:\s*([^\.]+)\.?/i);

//   //   // Remove job_name and company_name parts from the text
//   //   let remainingText = text
//   //     .replace(/job_name:\s*[^\.]+\./i, "")
//   //     .replace(/company_name:\s*[^\.]+\./i, "")
//   //     .trim();

//   //   // Split remaining text into sentences/lines to bullet
//   //   const bulletLines = remainingText
//   //     .split(/\.\s*|\n+/)
//   //     .filter((line) => line.trim() !== "")
//   //     .map((line) => `• ${line.trim()}`)
//   //     .join("\n");

//   //   // Compose final formatted string
//   //   return [
//   //     jobNameMatch ? `Job Name: ${jobNameMatch[1].trim()}` : "",
//   //     companyNameMatch ? `Company Name: ${companyNameMatch[1].trim()}` : "",
//   //     bulletLines ? `\n${bulletLines}` : "",
//   //   ]
//   //     .filter(Boolean)
//   //     .join("\n");
//   // };

//   return (
//     <div className="min-h-screen bg-[#1e222a] text-[#DFD0B8] relative px-4 sm:px-6 md:px-10">
//       {showSuccess && <SuccessAnimation />}

//       {/* Navbar */}
//       <nav className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-6 border-b border-[#393E46]">
//         <div className="flex items-center gap-2 mb-4 sm:mb-0">
//           <img src="/assets/botImage.png" alt="logo" className="w-10 h-10" />
//           <span className="text-2xl font-bold text-[#DFD0B8]">NEX.AI</span>
//         </div>
//         <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
//           <li>
//             <Link to="/" className="hover:text-[#948979]">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/about" className="hover:text-[#948979]">
//               About us
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" className="hover:text-[#948979]">
//               Contact us
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Main Content */}
//       <div className="flex flex-col lg:flex-row gap-10 py-12">
//         {/* Left: Preview + Post */}
//         <div className="w-full lg:w-1/2 flex flex-col">
//           <div className="bg-[#2b2f38] w-full rounded-lg p-4 sm:p-6 text-sm min-h-[300px]">
//             <strong className="block mb-2 text-[#948979]">
//               Generated Job Description:
//             </strong>

//             {loading ? (
//               <p className="text-yellow-400">Generating job description...</p>
//             ) : error ? (
//               <p className="text-red-400">Error: {error}</p>
//             ) : (
//               <textarea
//                 value={formatAsBullets(editableDesc)}
//                 onChange={(e) => setEditableDesc(e.target.value)}
//                 className="flex-1 bg-transparent border border-[#948979] text-[#DFD0B8] rounded-md p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#DFD0B8] min-h-[400px] w-full"
//                 placeholder="Job description will appear here..."
//               />
//             )}
//           </div>

//           {hasGenerated && (
//             <button
//               onClick={() => handlePostJob(editableDesc)}
//               className="mt-4 w-full bg-transparent border border-[#948979] hover:bg-[#393E46] py-2 rounded-full"
//             >
//               Post A Job
//             </button>
//           )}
//         </div>

//         {/* Right: Form */}
//         <form
//           className="w-full lg:w-1/2 space-y-4"
//           onSubmit={(e) => e.preventDefault()}
//         >
//           <input
//             value={organization_name}
//             onChange={(e) => setorganization_name(e.target.value)}
//             className="w-full px-4 py-2 bg-[#2b2f38] rounded-md"
//             placeholder="Organization Name"
//             required
//           />
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             className="w-full px-4 py-2 bg-[#2b2f38] rounded-md"
//             placeholder="Email Address"
//             required
//           />
//           <input
//             value={job_industry}
//             onChange={(e) => setjob_industry(e.target.value)}
//             className="w-full px-4 py-2 bg-[#2b2f38] rounded-md"
//             placeholder="Industry"
//             required
//           />
//           <input
//             value={job_title}
//             onChange={(e) => setjob_title(e.target.value)}
//             className="w-full px-4 py-2 bg-[#2b2f38] rounded-md"
//             placeholder="Job Title"
//             required
//           />
//           <input
//             value={skills}
//             onChange={(e) => setskills(e.target.value)}
//             className="w-full px-4 py-2 bg-[#2b2f38] rounded-md"
//             placeholder="Skills (comma-separated)"
//             required
//           />
//           <input
//             value={job_location}
//             onChange={(e) => setjob_location(e.target.value)}
//             className="w-full px-4 py-2 bg-[#2b2f38] rounded-md"
//             placeholder="Job Location"
//             required
//           />
//           <input
//             value={ctc}
//             onChange={(e) => setCtc(e.target.value)}
//             className="w-full px-4 py-2 bg-[#2b2f38] rounded-md"
//             placeholder="CTC Offered"
//             required
//           />
//           <textarea
//             value={eligibility_criteria}
//             onChange={(e) => seteligibility_criteria(e.target.value)}
//             rows={3}
//             className="w-full px-4 py-2 bg-[#2b2f38] rounded-md"
//             placeholder="Eligibility Criteria"
//             required
//           />
//           <textarea
//             value={requirements}
//             onChange={(e) => setRequirements(e.target.value)}
//             rows={3}
//             className="w-full px-4 py-2 bg-[#2b2f38] rounded-md"
//             placeholder="Requirements"
//             required
//           />

//           <button
//             type="button"
//             onClick={handleGenerate}
//             disabled={loading}
//             className="w-full bg-transparent border border-[#948979] hover:bg-[#393E46] py-2 rounded-full"
//           >
//             {loading ? "Generating..." : "Generate Job Description"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Jobpost;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SuccessAnimation from "./SuccessAnimation";
import { useJobDescription } from "../hooks/useJobDescription";
import { postJob } from "../services/jobService";

const Jobpost = () => {
  const [organization_name, setorganization_name] = useState("");
  const [email, setEmail] = useState("");
  const [job_industry, setjob_industry] = useState("");
  const [job_title, setjob_title] = useState("");
  const [skills, setskills] = useState("");
  const [job_location, setjob_location] = useState("");
  const [ctc, setCtc] = useState("");
  const [eligibility_criteria, seteligibility_criteria] = useState("");
  const [requirements, setRequirements] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [editableDesc, setEditableDesc] = useState("");

  const {
    generatedDesc,
    loading,
    error,
    generateJD,
    resetJD, // ✅ clears internal state in hook
  } = useJobDescription();

  useEffect(() => {
    if (generatedDesc) {
      setEditableDesc(formatAsBullets(generatedDesc));
    }
  }, [generatedDesc]);

  const handleGenerate = async () => {
    await generateJD({
      organization_name,
      job_industry,
      job_title,
      skills,
      job_location,
      ctc,
      eligibility_criteria,
      requirements,
      email,
    });
    setHasGenerated(true);
  };

  const handlePostJob = async (descriptionToPost) => {
    const newJob = {
      organization_name,
      job_title,
      email,
      posted_at: new Date().toISOString(),
      generated_jd: descriptionToPost,
    };

    try {
      await postJob(newJob);
      setShowSuccess(true);

      // ✅ Reset form fields
      setorganization_name("");
      setEmail("");
      setjob_industry("");
      setjob_title("");
      setskills("");
      setjob_location("");
      setCtc("");
      seteligibility_criteria("");
      setRequirements("");

      // ✅ Clear JD area and hook
      setEditableDesc("");
      setHasGenerated(false);
      resetJD(); // clear the hook's generatedDesc
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please try again.");
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const formatAsBullets = (text) => {
    return text
      .split(/\r?\n|(?<=[.?!])\s+/)
      .filter((line) => line.trim() !== "")
      .map((line) => `• ${line.trim()}`)
      .join("\n");
  };

  return (
    <div className="min-h-screen bg-[#1e222a] text-[#DFD0B8] relative px-4 sm:px-6 md:px-10">
      {showSuccess && <SuccessAnimation />}

      {/* Navbar */}
      <nav className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-6 border-b border-[#393E46]">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <img src="/assets/botImage.png" alt="logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-[#DFD0B8]">NEX.AI</span>
        </div>
        <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <li><Link to="/" className="hover:text-[#948979]">Home</Link></li>
          <li><Link to="/about" className="hover:text-[#948979]">About us</Link></li>
          <li><Link to="/contact" className="hover:text-[#948979]">Contact us</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-10 py-12">
        {/* Left: Preview + Post */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="bg-[#2b2f38] w-full rounded-lg p-4 sm:p-6 text-sm min-h-[300px]">
            <strong className="block mb-2 text-[#948979]">
              Generated Job Description:
            </strong>

            {loading ? (
              <p className="text-yellow-400">Generating job description...</p>
            ) : error ? (
              <p className="text-red-400">Error: {error}</p>
            ) : (
              <textarea
                value={editableDesc}
                onChange={(e) => setEditableDesc(e.target.value)}
                className="flex-1 bg-transparent border border-[#948979] text-[#DFD0B8] rounded-md p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#DFD0B8] min-h-[400px] w-full"
                placeholder="Job description will appear here..."
              />
            )}
          </div>

          {hasGenerated && (
            <button
              onClick={() => handlePostJob(editableDesc)}
              className="mt-4 w-full bg-transparent border border-[#948979] hover:bg-[#393E46] py-2 rounded-full"
            >
              Post A Job
            </button>
          )}
        </div>

        {/* Right: Form */}
        <form
          className="w-full lg:w-1/2 space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input value={organization_name} onChange={(e) => setorganization_name(e.target.value)} className="w-full px-4 py-2 bg-[#2b2f38] rounded-md" placeholder="Organization Name" required />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full px-4 py-2 bg-[#2b2f38] rounded-md" placeholder="Email Address" required />
          <input value={job_industry} onChange={(e) => setjob_industry(e.target.value)} className="w-full px-4 py-2 bg-[#2b2f38] rounded-md" placeholder="Industry" required />
          <input value={job_title} onChange={(e) => setjob_title(e.target.value)} className="w-full px-4 py-2 bg-[#2b2f38] rounded-md" placeholder="Job Title" required />
          <input value={skills} onChange={(e) => setskills(e.target.value)} className="w-full px-4 py-2 bg-[#2b2f38] rounded-md" placeholder="Skills (comma-separated)" required />
          <input value={job_location} onChange={(e) => setjob_location(e.target.value)} className="w-full px-4 py-2 bg-[#2b2f38] rounded-md" placeholder="Job Location" required />
          <input value={ctc} onChange={(e) => setCtc(e.target.value)} className="w-full px-4 py-2 bg-[#2b2f38] rounded-md" placeholder="CTC Offered" required />
          <textarea value={eligibility_criteria} onChange={(e) => seteligibility_criteria(e.target.value)} rows={3} className="w-full px-4 py-2 bg-[#2b2f38] rounded-md" placeholder="Eligibility Criteria" required />
          <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} rows={3} className="w-full px-4 py-2 bg-[#2b2f38] rounded-md" placeholder="Requirements" required />

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-transparent border border-[#948979] hover:bg-[#393E46] py-2 rounded-full"
          >
            {loading ? "Generating..." : "Generate Job Description"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Jobpost;
