// import { useState } from "react";
// import axios from "../services/axiosInstance";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/auth/register", form);
//       navigate("/");
//     } catch (err) {
//         console.error(err);
//       alert("Registration failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <input
//           placeholder="Name"
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           placeholder="Email"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }




import { useState } from "react";
import axios from "../services/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import "../auth.css";


export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };
  // return (
  //   <div>
  //     <h2>Register</h2>
  //     <form onSubmit={handleRegister}>
  //       <input
  //         placeholder="Name"
  //         onChange={(e) => setForm({ ...form, name: e.target.value })}
  //       />
  //       <input
  //         placeholder="Email"
  //         onChange={(e) => setForm({ ...form, email: e.target.value })}
  //       />
  //       <input
  //         type="password"
  //         placeholder="Password"
  //         onChange={(e) => setForm({ ...form, password: e.target.value })}
  //       />
  //       <button type="submit">Register</button>
  //     </form>
  //   </div>
  // );

  return (
    <div className="page-wrapper">
      
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">JobTracker</h2>
        <div className="nav-buttons">
          <Link to="/login" className="nav-btn outline">
            Login
          </Link>
          <button className="nav-btn active">Register</button>
          
        </div>
      </nav>

      {/* Register Card */}
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="card-title">Create Account</h2>

          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />
            </div>

            <button type="submit" className="primary-btn">
              Register
            </button>
          </form>

          <p className="bottom-text">
            Already have an account?{" "}
            <Link to="/login" className="register-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}