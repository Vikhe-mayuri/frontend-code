// import React, { useState } from "react";
// import { useLogin } from "../hooks/useLogin";

// function Login() {
//   const [role, setRole] = useState("vendor");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { login, error, loading } = useLogin();

//   const handleLogin = () => {
//     login({ email, password, role });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#1e222a] text-white px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-[#1e222a] p-6 sm:p-10 rounded-xl shadow-md space-y-8">
//         <div className="flex justify-center">
//           <img
//             src="/assets/botImage.png"
//             alt="Bot Logo"
//             className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
//           />
//         </div>

//         <h2 className="text-center text-xl sm:text-2xl font-semibold text-[#DFD0B8]">
//           Welcome
//         </h2>

//         <div className="flex border border-[#948979] rounded-full overflow-hidden text-sm sm:text-base">
//           <button
//             onClick={() => setRole("vendor")}
//             className={`px-4 sm:px-6 py-2 w-full font-semibold transition-colors duration-300 ${
//               role === "vendor"
//                 ? "bg-[#222831] text-[#DFD0B8]"
//                 : "bg-[#393E46] text-[#948979]"
//             }`}
//           >
//             Vendor
//           </button>
//           <button
//             onClick={() => setRole("sub-vendor")}
//             className={`px-4 sm:px-6 py-2 w-full font-semibold transition-colors duration-300 ${
//               role === "sub-vendor"
//                 ? "bg-[#222831] text-[#DFD0B8]"
//                 : "bg-[#393E46] text-[#948979]"
//             }`}
//           >
//             Sub-Vendor
//           </button>
//         </div>

//         <div className="space-y-6">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 bg-[#2b2f38] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DFD0B8]"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 bg-[#2b2f38] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DFD0B8]"
//           />
//         </div>

//         {error && (
//           <div className="text-red-400 text-sm text-center -mt-3">{error}</div>
//         )}

//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full bg-[#2b2f38] text-[#DFD0B8] border border-[#948979] hover:bg-[#3a3f4b] py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 disabled:opacity-50"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Login;

// src/pages/Login.jsx
import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("vendor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading } = useLogin();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    const roleFormatted = role === "sub-vendor" ? "subvendor" : role;

    const res = await login({ email, password, role: roleFormatted });

    if (res.status === 200) {
      toast.success("Login successful!");
      setPassword(""); 
      navigate(
        role === "vendor" ? "/vendor-dashboard" : "/subvendor-dashboard"
      );
    } else if (res.status === 403) {
      toast.error("You are not authorized to login as this role.");
    } else {
      toast.error(res.data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#222831] px-4 sm:px-6 lg:px-8 text-white">
      <div className="w-full max-w-sm sm:max-w-md bg-[#1e222a] border border-[#948979] p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 space-y-6">
        <div className="flex justify-center">
          <img
            src="/assets/botImage.png"
            alt="Bot Logo"
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        <h2 className="text-center text-lg sm:text-xl font-semibold text-[#DFD0B8]">
          Login as <span className="capitalize">{role.replace("-", " ")}</span>
        </h2>

        <div className="flex items-center justify-center bg-[#393E46] rounded-full p-1 border border-[#948979] text-sm sm:text-base">
          <button
            onClick={() => setRole("vendor")}
            className={`w-1/2 px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${
              role === "vendor"
                ? "bg-[#222831] text-[#DFD0B8]"
                : "text-[#948979]"
            }`}
          >
            Vendor
          </button>
          <button
            onClick={() => setRole("sub-vendor")}
            className={`w-1/2 px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${
              role === "sub-vendor"
                ? "bg-[#222831] text-[#DFD0B8]"
                : "text-[#948979]"
            }`}
          >
            Sub-Vendor
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#2b2f38] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#948979] text-sm sm:text-base"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#2b2f38] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#948979] text-sm sm:text-base pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-[#948979] hover:text-[#DFD0B8]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#2b2f38] text-[#DFD0B8] border border-[#948979] hover:bg-[#3a3f4b] py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
