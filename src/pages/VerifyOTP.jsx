import { useState } from "react";
import axios from "../services/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifyOTP() {

  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { email, name, password } = location.state;

  const handleVerify = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post("/auth/verify-otp", {
        email,
        otp,
        name,
        password
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Account created successfully");

      navigate("/dashboard");

    } catch (err) {

      toast.error(err.response?.data?.message || "OTP verification failed");

    }

  };

  return (
    <div>
      <h2>Verify OTP</h2>

      <form onSubmit={handleVerify}>
        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );

}