// import React from "react";

// function Footer() {
//   return (
//     <div className="flex flex-col md:flex-row justify-between items-center bg-[#222831] text-[#DFD0B8] px-4 sm:px-8 py-6 gap-6 sm:gap-0">
//       {/* Left Section: Logo and Title */}
//       <div className="flex items-center gap-4">
//         <img
//           src="/assets/botImage.png"
//           alt="logo"
//           className="w-14 sm:w-16 h-20 sm:h-24 object-contain"
//         />

//         <div className="flex flex-col">
//           <span className="text-2xl sm:text-3xl font-bold">NEX.AI</span>
//           <span className="text-base sm:text-lg mt-1">
//             Smarter hiring with AI.
//           </span>
//         </div>
//       </div>

//       {/* Right Section: Contact */}
//       <div className="text-center md:text-right text-sm sm:text-base">
//         <p>✉️ support@NEXAI.com</p>
//         <p>📞 +91-XXXXXXXXXX</p>
//       </div>
//     </div>
//   );
// }

// export default Footer;

// src/components/Footer.jsx
import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#222831] text-[#DFD0B8] px-4 sm:px-8 py-8 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left: Logo & Tagline */}
        <div className="flex items-center gap-4">
          <img
            src="/assets/botImage.png"
            alt="NEX.AI Logo"
            className="w-14 sm:w-16 h-20 sm:h-24 object-contain"
          />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">NEX.AI</h2>
            <p className="text-base sm:text-lg mt-1 opacity-80">
              Smarter hiring with AI.
            </p>
          </div>
        </div>

        {/* Right: Contact Info */}
        <div className="flex flex-col items-center md:items-end text-sm sm:text-base gap-2">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-[#948979]" />
            <span>support@NEXAI.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-[#948979]" />
            <span>+91-XXXXXXXXXX</span>
          </div>
        </div>
      </div>

      {/* Bottom Line (Optional copyright) */}
      <div className="text-center text-xs text-[#948979] mt-6">
        © {new Date().getFullYear()} NEX.AI. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
