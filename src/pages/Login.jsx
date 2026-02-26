// import { useState } from "react";
// import axios from "../services/axiosInstance";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", res.data.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//         console.error(err);
//       alert("Login failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//       <Link to="/register">Register</Link>
//     </div>
//   );
// }


// 2nd 

// import { useState } from "react";
// import axios from "../services/axiosInstance";
// import { useNavigate, Link } from "react-router-dom";
// import "../auth.css";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", res.data.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>Welcome Back 👋</h2>
//         <p className="subtitle">Login to your account</p>

//         <form onSubmit={handleLogin}>
//           <div className="input-group">
//             <input
//               type="email"
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="btn-primary">
//             Login
//           </button>
//         </form>

//         <p className="switch-text">
//           Don’t have an account? <Link to="/register">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }


// 3rd with proper header

// import { useState } from "react";
// import axios from "../services/axiosInstance";
// import { useNavigate, Link } from "react-router-dom";
// import "../auth.css";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", res.data.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="page-wrapper">
      
//       {/* HEADER */}
//       <header className="auth-header">
//         <h1>Job Application Tracker</h1>
//         <Link to="/register" className="header-link">
//           Register
//         </Link>
//       </header>

//       {/* LOGIN CARD */}
//       <div className="auth-container">
//         <div className="auth-card">
//           <h2>Welcome Back 👋</h2>
//           <p className="subtitle">Login to continue</p>

//           <form onSubmit={handleLogin}>
//             <div className="input-group">
//               <input
//                 type="email"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button type="submit" className="btn-primary">
//               Login
//             </button>
//           </form>
//         </div>
//       </div>

//     </div>
//   );
// }

import { useState } from "react";
import axios from "../services/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import "../auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="page-wrapper">
      
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">JobTracker</h2>
        <div className="nav-buttons">
          <button className="nav-btn active">Login</button>
          <Link to="/register" className="nav-btn outline">
            Register
          </Link>
        </div>
      </nav>

      {/* Login Card */}
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="card-title">Sign In</h2>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="primary-btn">
              Sign In
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