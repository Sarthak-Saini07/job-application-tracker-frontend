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
import { Routes, Route, useLocation } from "react-router-dom";
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
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

        <Route path="/" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />

        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />

        <Route path="/verify-otp" element={<PageTransition><VerifyOTP /></PageTransition>} />

        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />

        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />

        <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />

        <Route path="/admin/jobs" element={<PageTransition><AdminJobs /></PageTransition>} />

        <Route path="/admin/users" element={<PageTransition><AdminUsers /></PageTransition>} />

        <Route path="/admin/notifications" element={<PageTransition><AdminNotifications /></PageTransition>} />

        </Routes>
      </AnimatePresence>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover
        theme="light"
      />

    </>
  );

}

export default App;