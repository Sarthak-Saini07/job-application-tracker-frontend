import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axiosInstance";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate(); // ✅ added

  const fetchJobs = async () => {
    const res = await axios.get("/jobs");
    setJobs(res.data.data);
  };

  const fetchStats = async () => {
    const res = await axios.get("/jobs/stats");
    setStats(res.data.data);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchJobs();
      await fetchStats();
    };

    loadData();
  }, []);

  return (
    <div> {/* ✅ single parent wrapper */}
      
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>

      <h2>Dashboard</h2>

      {stats && (
        <div>
          <p>Total: {stats.total}</p>
          <p>Applied: {stats.applied}</p>
          <p>Interview: {stats.interview}</p>
          <p>Offer: {stats.offer}</p>
          <p>Rejected: {stats.rejected}</p>
        </div>
      )}

      <h3>My Jobs</h3>

      {jobs.map((job) => (
        <div key={job._id}>
          <p>
            {job.companyName} - {job.role} - {job.status}
          </p>
        </div>
      ))}

    </div>
  );
}