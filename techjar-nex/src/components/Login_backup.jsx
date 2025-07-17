import React, { useState } from "react";

export default function Login() {
  const [role, setRole] = useState("vendor");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e222a] text-white px-4">
      <div className="w-full max-w-md bg-[#1e222a] p-10 rounded-xl shadow-md space-y-8">
        
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/src/assets/botImage.png"
            alt="Bot Logo"
            className="w-50 h-50"
          />
        </div>

        {/* Welcome Text */}
        <h2 className="text-center text-2xl font-semibold text-[#DFD0B8]">
          Welcome
        </h2>

        {/* Role Toggle */}
        <div className="flex border border-[#948979] rounded-full overflow-hidden">
          <button
            onClick={() => setRole("vendor")}
            className={`px-6 py-2 w-full font-semibold transition-colors duration-300 ${
              role === "vendor"
                ? "bg-[#222831] text-[#DFD0B8]"
                : "bg-[#393E46] text-[#948979]"
            }`}
          >
            Vendor
          </button>
          <button
            onClick={() => setRole("sub-vendor")}
            className={`px-6 py-2 w-full font-semibold transition-colors duration-300 ${
              role === "sub-vendor"
                ? "bg-[#222831] text-[#DFD0B8]"
                : "bg-[#393E46] text-[#948979]"
            }`}
          >
            Sub-Vendor
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-[#2b2f38] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-[#2b2f38] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Login Button */}
        <button className="w-full bg-[#2b2f38] text-[#DFD0B8] border border-[#948979] hover:bg-[#3a3f4b] py-2 rounded-full text-sm font-medium transition-all duration-200">
          Login
        </button>
      </div>
    </div>
  );
}
