// import { BrowserRouter,Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import AdminDashboard from "./pages/AdminDashboard";
// import AdminUsers from "./pages/AdminUsers";
// import AdminNotifications from "./pages/AdminNotifications";
// import {ToastContainer} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import VerifyOTP from "./pages/VerifyOTP";
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         {/* <Route path="/verify-otp" element={<VerifyOTP />} /> */}
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/admin/users" element={<AdminUsers />} />
//         <Route path="/admin/notifications" element={<AdminNotifications />} />
        
//         {/* <ToastContainer position = "top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/> */}
//       </Routes>
//       <ToastContainer position = "top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminJobs from "./pages/AdminJobs";
import AdminNotifications from "./pages/AdminNotifications";
import VerifyOTP from "./pages/VerifyOTP";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/verify-otp" element={<VerifyOTP />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/jobs" element={<AdminJobs />} />

        <Route path="/admin/users" element={<AdminUsers />} />

        <Route path="/admin/notifications" element={<AdminNotifications />} />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover
        theme="light"
      />

    </BrowserRouter>
  );

}

export default App;