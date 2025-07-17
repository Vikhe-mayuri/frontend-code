// import React from "react";
// import { ArrowRight } from "lucide-react";

// const Home = () => {
//   return (
//     <div className="w-full min-h-screen bg-[#222831] text-[#DFD0B8] flex flex-col">
//       {/* Hero Section */}
//       <section className="flex flex-1 flex-col-reverse lg:flex-row items-center justify-between py-12 px-4 sm:px-8 lg:px-20 gap-10">
//         {/* Text Content */}
//         <div className="text-left max-w-xl">
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#f3ead9]">
//             Your Hiring
//             <br />
//             <span className="text-[#d6c3a1]">Pipeline.</span>
//             <br />
//             Streamlined.
//           </h1>
//         </div>

//         {/* Illustration */}
//         <div className="w-full flex justify-center p-0">
//           <img
//             src="/assets/2.png"
//             alt="Hiring Visual"
//             className="w-full max-w-[600px] h-auto lg:-mr-70 "
//           />
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

// src/components/Home.jsx
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const textVariant = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { ease: "easeOut", duration: 1, stiffness: 20 } },
};

const imageVariant = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { ease: "easeOut", duration: 1,stiffness: 20 } },
};

const Home = () => {
  return (
    <div
      id="home"
      className="w-full min-h-screen bg-[#222831] text-[#DFD0B8] flex flex-col justify-center"
    >
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between py-16 px-4 sm:px-8 lg:px-20 gap-10">
        {/* Text Section */}
        <motion.div
          className="text-left max-w-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariant}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#f3ead9] mb-6">
            Your Hiring
            <br />
            <span className="text-[#d6c3a1]">Pipeline.</span>
            <br />
            Streamlined.
          </h1>
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-3 border border-[#948979] text-[#DFD0B8] rounded-md hover:bg-[#948979] hover:text-[#393e46] transition"
          >
            Get Started
          </motion.button> */}
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="w-full flex justify-center p-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageVariant}
        >
          <motion.img
            src="/assets/2.png"
            alt="Hiring Visual"
            className="w-full max-w-[600px] h-auto lg:-mr-70 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
