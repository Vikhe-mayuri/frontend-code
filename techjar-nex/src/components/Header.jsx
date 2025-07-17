/* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// function Header() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentPath = location.pathname;

//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLoginClick = () => navigate("/login");
//   const handleJobpostClick = () => navigate("/jobpost");

//   return (
//     <header className="bg-[#222831] text-[#DFD0B8] px-6 py-4">
//       <nav className="max-w-[1200px] mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center gap-3">
//           <img
//             src="/assets/botImage.png"
//             alt="logo"
//             className="w-12 h-12 object-contain"
//           />
//           <span className="text-2xl sm:text-3xl font-bold">NEX.AI</span>
//         </div>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
//           <li>
//             <a href="#home" className="hover:text-[#948979] transition">
//               Home
//             </a>
//           </li>
//           <li>
//             <a href="#about" className="hover:text-[#948979] transition">
//               About us
//             </a>
//           </li>
//           <li>
//             <a href="#contact" className="hover:text-[#948979] transition">
//               Contact us
//             </a>
//           </li>
//         </ul>

//         {/* Buttons */}
//         {currentPath !== "/jobpost" && (
//           <div className="hidden md:flex gap-4">
//             <button
//               onClick={handleJobpostClick}
//               className="border border-[#948979] px-4 py-2 rounded-md hover:bg-[#948979] hover:text-[#393e46] transition"
//             >
//               Post a Job
//             </button>
//             <button
//               onClick={handleLoginClick}
//               className="border border-[#948979] px-4 py-2 rounded-md hover:bg-[#948979] hover:text-[#393e46] transition"
//             >
//               Login
//             </button>
//           </div>
//         )}

//         {/* Mobile Menu Toggle */}
//         <button
//           className="md:hidden text-[#DFD0B8] focus:outline-none"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             {isMenuOpen ? (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             ) : (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             )}
//           </svg>
//         </button>
//       </nav>

//       {/* Mobile Menu Content */}
//       {isMenuOpen && (
//         <div className="md:hidden mt-4 space-y-4 text-center text-sm">
//           <a href="#home" className="block hover:text-[#948979]">
//             Home
//           </a>
//           <a href="#about" className="block hover:text-[#948979]">
//             About us
//           </a>
//           <a href="#contact" className="block hover:text-[#948979]">
//             Contact us
//           </a>

//           {currentPath !== "/jobpost" && (
//             <div className="flex flex-col gap-2 items-center mt-4">
//               <button
//                 onClick={handleJobpostClick}
//                 className="w-3/4 border border-[#948979] px-4 py-2 rounded-md hover:bg-[#948979] hover:text-[#393e46]"
//               >
//                 Post a Job
//               </button>
//               <button
//                 onClick={handleLoginClick}
//                 className="w-3/4 border border-[#948979] px-4 py-2 rounded-md hover:bg-[#948979] hover:text-[#393e46]"
//               >
//                 Login
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;

// src/components/Header.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginClick = () => navigate("/login");
  const handleJobpostClick = () => navigate("/jobpost");

  return (
    <header className="bg-[#222831] text-[#DFD0B8] shadow-md sticky top-0 z-50">
      <nav className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            duration: 1.5, // slower animation
            stiffness: 60, // softer bounce
          }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="/assets/botImage.png"
            alt="logo"
            className="w-12 h-12 object-contain hover:rotate-6 transition-transform"
          />
          <span className="text-2xl sm:text-3xl font-bold">NEX.AI</span>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["home", "about", "contact"].map((item, i) => (
            <motion.li
              key={item}
              whileHover={{ scale: 1.1, color: "#948979" }}
              className="transition duration-200 cursor-pointer"
            >
              <a href={`#${item}`}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Buttons */}
        {currentPath !== "/jobpost" && (
          <div className="hidden md:flex gap-4">
            {["Post a Job", "Login"].map((label, i) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={
                  label === "Post a Job" ? handleJobpostClick : handleLoginClick
                }
                className="border border-[#948979] px-4 py-2 rounded-md hover:bg-[#948979] hover:text-[#393e46] transition"
              >
                {label}
              </motion.button>
            ))}
          </div>
        )}

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#DFD0B8]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#222831] text-center text-sm px-6 pb-4"
          >
            {["home", "about", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="block py-2 hover:text-[#948979] transition"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}

            {currentPath !== "/jobpost" && (
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={handleJobpostClick}
                  className="w-full border border-[#948979] py-2 rounded-md hover:bg-[#948979] hover:text-[#393e46] transition"
                >
                  Post a Job
                </button>
                <button
                  onClick={handleLoginClick}
                  className="w-full border border-[#948979] py-2 rounded-md hover:bg-[#948979] hover:text-[#393e46] transition"
                >
                  Login
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
