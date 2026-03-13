import { useState } from "react";
import axios from "../services/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import "../auth.css";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Register, 2: Verification

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      await axios.post("/auth/register", form);
      toast.success("OTP sent to your email");
      setStep(2); // Move to OTP verification step
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const res = await axios.post("/auth/verify-otp", {
        email: form.email,
        otp,
        name: form.name,
        password: form.password
      });

      if (res.data.token) {
         localStorage.setItem("token", res.data.token);
         navigate("/dashboard");
      } else {
         toast.success("Account created and verified successfully!");
         navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  const handleResendOTP = async () => {
    try {
      await axios.post("/auth/resend-otp", { email: form.email });
      toast.success("A new OTP has been sent to your email");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="page-wrapper">
      
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">Jobsy</h2>
        <div className="nav-buttons">
          <Link to="/login" className="nav-btn outline">
            Login
          </Link>
          <button className="nav-btn active">Register</button>
        </div>
      </nav>

      {/* Register / Verify Card */}
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="card-title">
            {step === 1 ? "Create Account" : "Verify Email"}
          </h2>

          {step === 1 && (
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
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOTP}>
              <p style={{ textAlign: "center", marginBottom: "20px", color: "#64748b" }}>
                We have sent an OTP to <strong>{form.email}</strong>
              </p>
              
              <div className="input-group">
                <label>OTP Verification Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter your OTP"
                  required
                />
              </div>

              <button type="submit" className="primary-btn" style={{ marginBottom: "15px" }}>
                Verify OTP
              </button>

              <button 
                type="button" 
                onClick={handleResendOTP} 
                className="nav-btn outline" 
                style={{ width: "100%", padding: "10px", display: "block", textAlign: "center", borderRadius: "8px" }}
              >
                Resend OTP
              </button>
            </form>
          )}

          {step === 1 && (
            <p className="bottom-text">
              Already have an account?{" "}
              <Link to="/login" className="register-link">
                Sign In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}