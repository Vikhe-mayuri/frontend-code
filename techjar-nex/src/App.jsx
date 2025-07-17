// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import "./index.css";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Login from "./components/Login";
// import Jobpost from "./components/Jobpost";
// import Contact from "./pages/Contact";
// import VendorDashboard from "./components/VendorDashboard";
// import VendorJobInbox from "./components/VendorJobInbox";
// import StudentList from "./components/StudentList";
// import SubVendorDashboard from "./components/SubVendorDashboard";
// import SubVendorList from "./components/SubVendorList";
// import FileUpload from "./components/FileUpload";
// import Reports from "./components/Reports";
// import PrivateRoute from "./components/PrivateRoute"; // ✅ NEW
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function App() {
//   return (
//     <BrowserRouter>
//       <ToastContainer position="top-center" autoClose={2000} />
//       <Routes>
//         <Route path="/" element={<Layout />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/jobpost" element={<Jobpost />} />

//         {/* ✅ PROTECTED ROUTES */}
//         <Route
//           path="/vendor-dashboard"
//           element={
//             <PrivateRoute>
//               <VendorDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/subvendor-dashboard"
//           element={
//             <PrivateRoute>
//               <SubVendorDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/vendor-jobs"
//           element={
//             <PrivateRoute>
//               <VendorJobInbox />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/students"
//           element={
//             <PrivateRoute>
//               <StudentList />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/subvendor-list"
//           element={
//             <PrivateRoute>
//               <SubVendorList />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/vendor-reports"
//           element={
//             <PrivateRoute>
//               <Reports />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/upload"
//           element={
//             <PrivateRoute>
//               <FileUpload />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./components/Login";
import Jobpost from "./components/Jobpost";
import Contact from "./pages/Contact";
import VendorDashboard from "./components/VendorDashboard";
import VendorJobInbox from "./components/VendorJobInbox";
import StudentList from "./components/StudentList";
import SubVendorDashboard from "./components/SubVendorDashboard";
import SubVendorList from "./components/SubVendorList";
import FileUpload from "./components/FileUpload";
import Reports from "./components/Reports";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubStudentList from "./pages/SubStudentList";
import { useAuth } from "./context/AuthContext";  // or your path

function App() {
  const { loading } = useAuth(); // ✅ get loading state

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#222831] text-[#DFD0B8] text-xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobpost" element={<Jobpost />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/vendor-jobs" element={<VendorJobInbox />} />
          <Route path="/vendor-reports" element={<Reports />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/subvendor-dashboard" element={<SubVendorDashboard />} />
          <Route path="/subvendor-list" element={<SubVendorList />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/sub-students" element={<SubStudentList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
