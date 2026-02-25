// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../services/axiosInstance";

// export default function Dashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [stats, setStats] = useState(null);
//   const navigate = useNavigate(); // ✅ added

//   const fetchJobs = async () => {
//     const res = await axios.get("/jobs");
//     setJobs(res.data.data);
//   };

//   const fetchStats = async () => {
//     const res = await axios.get("/jobs/stats");
//     setStats(res.data.data);
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       await fetchJobs();
//       await fetchStats();
//     };

//     loadData();
//   }, []);

//   return (
//     <div> {/* ✅ single parent wrapper */}
      
//       <button
//         onClick={() => {
//           localStorage.removeItem("token");
//           navigate("/");
//         }}
//       >
//         Logout
//       </button>

//       <h2>Dashboard</h2>

//       {stats && (
//         <div>
//           <p>Total: {stats.total}</p>
//           <p>Applied: {stats.applied}</p>
//           <p>Interview: {stats.interview}</p>
//           <p>Offer: {stats.offer}</p>
//           <p>Rejected: {stats.rejected}</p>
//         </div>
//       )}

//       <h3>My Jobs</h3>

//       {jobs.map((job) => (
//         <div key={job._id}>
//           <p>
//             {job.companyName} - {job.role} - {job.status}
//           </p>
//         </div>
//       ))}

//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axiosInstance";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  // Load data
  const loadData = async () => {
    try {
      const jobsRes = await axios.get("/jobs");
      const statsRes = await axios.get("/jobs/stats");

      setJobs(jobsRes.data.data);
      setStats(statsRes.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  const fetchData = async () => {
    try {
      const jobsRes = await axios.get("/jobs");
      const statsRes = await axios.get("/jobs/stats");

      setJobs(jobsRes.data.data);
      setStats(statsRes.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);
  // Add job
  const handleAddJob = async (e) => {
    e.preventDefault();

    const formData = {
      companyName: e.target.company.value,
      role: e.target.role.value,
      location: e.target.location.value,
      status: e.target.status.value,
    };

    await axios.post("/jobs", formData);
    e.target.reset();
    loadData();
  };

  // Delete job
  const handleDelete = async (id) => {
    await axios.delete(`/jobs/${id}`);
    loadData();
  };

  return (
    <div style={{ padding: "30px", background: "#f5f7fa", minHeight: "100vh" }}>
      
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <h2>Job Application Dashboard</h2>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          style={{
            background: "#e63946",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Stats Section */}
      {stats && (
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {["total", "applied", "interview", "offer", "rejected"].map(
            (key) => (
              <div
                key={key}
                style={{
                  flex: 1,
                  background: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                  textAlign: "center",
                }}
              >
                <h4 style={{ textTransform: "uppercase", color: "#555" }}>
                  {key}
                </h4>
                <h2>{stats[key]}</h2>
              </div>
            )
          )}
        </div>
      )}

      {/* Add Job Form */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          marginBottom: "30px",
        }}
      >
        <h3>Add New Job</h3>

        <form
          onSubmit={handleAddJob}
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <input name="company" placeholder="Company" required />
          <input name="role" placeholder="Role" required />
          <input name="location" placeholder="Location" />

          <select name="status">
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <button
            style={{
              background: "#1d3557",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </form>
      </div>

      {/* Job List */}
      <div>
        <h3>My Applications</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {jobs.map((job) => (
            <div
              key={job._id}
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{job.companyName}</strong> — {job.role}
                <br />
                <small>Status: {job.status}</small>
              </div>

              <button
                onClick={() => handleDelete(job._id)}
                style={{
                  border: "1px solid red",
                  background: "white",
                  color: "red",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}