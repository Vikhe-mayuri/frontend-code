import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; 
import { CheckCircle2 } from "lucide-react";

const SuccessAnimation = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#2b2f38] text-white px-10 py-8 rounded-2xl shadow-2xl flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.6 }}
          className="text-green-400 mb-4"
        >
          <CheckCircle2 size={64} strokeWidth={1.5} />
        </motion.div>
        <p className="text-lg font-semibold">Job Posted Successfully!</p>
      </motion.div>
    </div>
  );
};

export default SuccessAnimation;
