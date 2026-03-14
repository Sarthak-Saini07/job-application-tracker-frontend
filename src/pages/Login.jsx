


// // 3rd with proper header

// // import { useState } from "react";
// // import axios from "../services/axiosInstance";
// // import { useNavigate, Link } from "react-router-dom";
// // import "../auth.css";

// // export default function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post("/auth/login", {
// //         email,
// //         password,
// //       });

// //       localStorage.setItem("token", res.data.data.token);
// //       navigate("/dashboard");
// //     } catch (err) {
// //       console.error(err);
// //       alert("Login failed");
// //     }
// //   };

// //   return (
// //     <div className="page-wrapper">
      
// //       {/* HEADER */}
// //       <header className="auth-header">
// //         <h1>Job Application Tracker</h1>
// //         <Link to="/register" className="header-link">
// //           Register
// //         </Link>
// //       </header>

// //       {/* LOGIN CARD */}
// //       <div className="auth-container">
// //         <div className="auth-card">
// //           <h2>Welcome Back 👋</h2>
// //           <p className="subtitle">Login to continue</p>

// //           <form onSubmit={handleLogin}>
// //             <div className="input-group">
// //               <input
// //                 type="email"
// //                 placeholder="Email address"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             <div className="input-group">
// //               <input
// //                 type="password"
// //                 placeholder="Password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             <button type="submit" className="btn-primary">
// //               Login
// //             </button>
// //           </form>
// //         </div>
// //       </div>

// //     </div>
// //   );
// // }

// // import { useState } from "react";
// // import axios from "../services/axiosInstance";
// // import { useNavigate, Link } from "react-router-dom";
// // import "../auth.css";

// // export default function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post("/auth/login", {
// //         email,
// //         password,
// //       });

// //       localStorage.setItem("token", res.data.data.token);
// //       navigate("/dashboard");
// //     } catch (err) {
// //       console.error(err);
// //       alert("Login failed");
// //     }
// //   };

// //   return (
// //     <div className="page-wrapper">
      
// //       {/* Navbar */}
// //       <nav className="navbar">
// //         <h2 className="logo">JobTracker</h2>
// //         <div className="nav-buttons">
// //           <button className="nav-btn active">Login</button>
// //           <Link to="/register" className="nav-btn outline">
// //             Register
// //           </Link>
// //         </div>
// //       </nav>

// //       {/* Login Card */}
// //       <div className="auth-container">
// //         <div className="auth-card">
// //           <h2 className="card-title">Sign In</h2>

// //           <form onSubmit={handleLogin}>
// //             <div className="input-group">
// //               <label>Email</label>
// //               <input
// //                 type="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             <div className="input-group">
// //               <label>Password</label>
// //               <input
// //                 type="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             <button type="submit" className="primary-btn">
// //               Sign In
// //             </button>
// //           </form>

// //           <p className="bottom-text">
// //             Don’t have an account?{" "}
// //             <Link to="/register" className="register-link">
// //               Register
// //             </Link>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState } from "react";
// import axios from "../services/axiosInstance";
// import { useNavigate, Link } from "react-router-dom";
// import "../auth.css";
// import { toast } from "react-toastify";
// export default function Login() {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otpStep, setOtpStep] = useState(false);
//   const [otp, setOtp] = useState("");
//   const navigate = useNavigate();

//   // const handleLogin = async (e) => {

//   //   e.preventDefault();

//   //   try {

//   //     const res = await axios.post("/auth/login", {
//   //       email,
//   //       password
//   //     });

//   //     const { token, user } = res.data.data;

//   //     // store token
//   //     localStorage.setItem("token", token);

//   //     // store user
//   //     localStorage.setItem("user", JSON.stringify(user));

//   //     // redirect based on role
//   //     if (user.role === "admin") {
//   //       toast.success("Admin Logged in successfully");;
//   //       navigate("/admin");
//   //     } else {
//   //       toast.success("User Logged in successfully");
//   //       navigate("/dashboard");
//   //     }

//   //   } catch (err) {

//   //     console.error(err);
//   //     // alert("Login failed");
//   //     toast.error("Login failed");

//   //   }

//   // };
//   const handleLogin = async (e) => {
//   e.preventDefault();

//   try {

//     const res = await axios.post("/auth/login", {
//       email,
//       password
//     });

//     if (res.data.otpRequired) {
//       setOtpStep(true);
//       toast.success("OTP sent to your email");
//     }

//   } catch (err) {

//     console.error(err);
//     toast.error("Login failed");

//   }
// };
// const verifyOtp = async () => {

//   try {

//     const res = await axios.post("/auth/verify-otp", {
//       email,
//       otp
//     });

//     const { token, user } = res.data.data;

//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));

//     if (user.role === "admin") {
//       toast.success("Admin Logged in successfully");
//       navigate("/admin");
//     } else {
//       toast.success("User Logged in successfully");
//       navigate("/dashboard");
//     }

//   } catch (err) {

//     console.error(err);
//     toast.error("Invalid OTP");

//   }
// };

//   return (
//     <div className="page-wrapper">

//       {/* Navbar */}
//       <nav className="navbar">
//         <h2 className="logo">JobTracker</h2>

//         <div className="nav-buttons">
//           <button className="nav-btn active">Login</button>

//           <Link to="/register" className="nav-btn outline">
//             Register
//           </Link>
//         </div>
//       </nav>

//       {/* Login Card */}
//       <div className="auth-container">

//         <div className="auth-card">

//           <h2 className="card-title">Sign In</h2>

//           <form onSubmit={handleLogin}>

//             <div className="input-group">
//               <label>Email</label>

//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />

//             </div>

//             <div className="input-group">

//               <label>Password</label>

//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />

//             </div>

//             <button type="submit" className="primary-btn">
//               Sign In
//             </button>

//           </form>

//           <p className="bottom-text">
//             Don’t have an account?{" "}
//             <Link to="/register" className="register-link">
//               Register
//             </Link>
//           </p>

//         </div>

//       </div>

//     </div>
//   );
// }




import { useState } from "react";
import axios from "../services/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import "../auth.css";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  /* ---------------- LOGIN STEP ---------------- */

  const handleLogin = async (e) => {
  e.preventDefault();

  try {

    const res = await axios.post("/auth/login", {
      email,
      password
    });

    const { token, user } = res.data.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    if (user.role === "admin") {
      toast.success("Admin Logged in successfully");
      navigate("/admin");
    } else {
      toast.success("User Logged in successfully");
      navigate("/dashboard");
    }

  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Login failed");
  }
};
  /* ---------------- OTP VERIFY ---------------- */

  const verifyOtp = async () => {

    try {

      const res = await axios.post("/auth/verify-otp", {
        email,
        otp
      });

      const { token, user } = res.data.data;

      // store token
      localStorage.setItem("token", token);

      // store user
      localStorage.setItem("user", JSON.stringify(user));

      // redirect based on role
      if (user.role === "admin") {

        toast.success("Admin Logged in successfully");
        navigate("/admin");

      } else {

        toast.success("User Logged in successfully");
        navigate("/dashboard");

      }

    } catch (err) {

      console.error(err);
      toast.error("Invalid OTP");

    }
  };

  return (

    <div className="page-wrapper">

      {/* Navbar */}

      <nav className="navbar">

        <h2 className="logo">JobTracker</h2>

        <div className="nav-buttons">

          <button className="nav-btn active">
            Login
          </button>

          <Link to="/register" className="nav-btn outline">
            Register
          </Link>

        </div>

      </nav>

      {/* Login Card */}

      <div className="auth-container">

        <div className="auth-card">

          <h2 className="card-title">
            {otpStep ? "Enter OTP" : "Sign In"}
          </h2>

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="input-group">

              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={otpStep}
              />

            </div>

            {/* PASSWORD */}

            {!otpStep && (

             <div className="input-group">
  <label>Password</label>

  <div className="password-field">

    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    <span
      className="password-toggle"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>

  </div>
</div>

            )}

            {/* OTP INPUT */}

            {otpStep && (

              <div className="input-group">

                <label>OTP</label>

                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />

              </div>

            )}

            {/* BUTTON */}

            <button
              type={otpStep ? "button" : "submit"}
              className="primary-btn"
              onClick={otpStep ? verifyOtp : undefined}
            >

              {otpStep ? "Verify OTP" : "Sign In"}

            </button>

          </form>

          <p className="bottom-text">

            Don’t have an account?{" "}

            <Link to="/register" className="register-link">
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}