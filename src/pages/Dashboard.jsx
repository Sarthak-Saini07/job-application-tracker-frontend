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
//           navigate("/login");
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
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../services/axiosInstance";

// export default function Dashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [companyName, setCompanyName] = useState("");
//   const [role, setRole] = useState("");
//   const [status, setStatus] = useState("Applied");

//   const navigate = useNavigate();

//   const fetchJobs = async () => {
//     const res = await axios.get("/jobs");
//     setJobs(res.data.data);
//   };

//   const fetchStats = async () => {
//     const res = await axios.get("/jobs/stats");
//     setStats(res.data.data);
//   };

//   const loadData = async () => {
//     await fetchJobs();
//     await fetchStats();
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // ✅ ADD JOB
//   const handleAddJob = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("/jobs", {
//         companyName,
//         role,
//         status,
//       });

//       setCompanyName("");
//       setRole("");
//       setStatus("Applied");

//       loadData(); // refresh data
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add job");
//     }
//   };

//   // ✅ DELETE JOB
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/jobs/${id}`);
//       loadData(); // refresh after delete
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete job");
//     }
//   };

//   return (
//     <div style={{ padding: "30px" }}>
//       {/* Logout */}
//       <button
//         onClick={() => {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }}
//       >
//         Logout
//       </button>

//       <h2>Dashboard</h2>

//       {/* Stats */}
//       {stats && (
//         <div>
//           <p>Total: {stats.total}</p>
//           <p>Applied: {stats.applied}</p>
//           <p>Interview: {stats.interview}</p>
//           <p>Offer: {stats.offer}</p>
//           <p>Rejected: {stats.rejected}</p>
//         </div>
//       )}

//       <hr />

//       {/* ✅ ADD JOB FORM */}
//       <h3>Add New Job</h3>

//       <form onSubmit={handleAddJob} style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Company Name"
//           value={companyName}
//           onChange={(e) => setCompanyName(e.target.value)}
//           required
//           style={{ marginRight: "10px" }}
//         />

//         <input
//           type="text"
//           placeholder="Role"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           required
//           style={{ marginRight: "10px" }}
//         />

//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           style={{ marginRight: "10px" }}
//         >
//           <option>Applied</option>
//           <option>Interview</option>
//           <option>Offer</option>
//           <option>Rejected</option>
//         </select>

//         <button type="submit">Add</button>
//       </form>

//       <hr />

//       {/* ✅ JOB LIST WITH DELETE */}
//       <h3>My Jobs</h3>

//       {jobs.map((job) => (
//         <div
//           key={job._id}
//           style={{
//             border: "1px solid #ccc",
//             padding: "10px",
//             marginBottom: "10px",
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <div>
//             <strong>{job.companyName}</strong> - {job.role} - {job.status}
//           </div>

//           <button onClick={() => handleDelete(job._id)}>
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }





// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../services/axiosInstance";

// export default function Dashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [status, setStatus] = useState("Applied");
//   const [companyName, setCompanyName] = useState("");
//   const [role, setRole] = useState("");

//   const navigate = useNavigate();

//   // Fetch Jobs
//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get("/jobs");
//       setJobs(res.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Fetch Stats
//   const fetchStats = async () => {
//     try {
//       const res = await axios.get("/jobs/stats");
//       setStats(res.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Add Job
//   const handleAddJob = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/jobs", {
//         companyName,
//         role,
//       });

//       setCompanyName("");
//       setRole("");

//       fetchJobs();
//       fetchStats();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete Job
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/jobs/${id}`);
//       fetchJobs();
//       fetchStats();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//  useEffect(() => {
//   const loadData = async () => {
//     try {
//       const jobsRes = await axios.get("/jobs");
//       setJobs(jobsRes.data.data);

//       const statsRes = await axios.get("/jobs/stats");
//       setStats(statsRes.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   loadData();
// }, []);
//   return (
//     <div style={{ padding: "20px" }}>
      
//       {/* Logout */}
//       <button
//         onClick={() => {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }}
//       >
//         Logout
//       </button>

//       <h2>Dashboard</h2>

//       {/* Stats */}
//       {stats && (
//         <div>
//           <p>Total: {stats.total}</p>
//           <p>Applied: {stats.applied}</p>
//           <p>Interview: {stats.interview}</p>
//           <p>Offer: {stats.offer}</p>
//           <p>Rejected: {stats.rejected}</p>
//         </div>
//       )}
//       {/* <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           style={{ marginRight: "10px" }}
//         >
//           <option>Applied</option>
//           <option>Interview</option>
//           <option>Offer</option>
//           <option>Rejected</option>
//         </select> */}
//       {/* Add Job Form */}
//       <h3>Add Job</h3>
//       <form onSubmit={handleAddJob}>
//         <input
//           type="text"
//           placeholder="Company Name"
//           value={companyName}
//           onChange={(e) => setCompanyName(e.target.value)}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Role"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           required
//         />

//         <button type="submit">Add</button>
//       </form>

//       {/* Job List */}
//       <h3>My Jobs</h3>

//       {jobs.map((job) => (
//         <div key={job._id} style={{ marginTop: "10px" }}>
//           <p>
//             {job.companyName} - {job.role} - {job.status}
//           </p>

//           <button onClick={() => handleDelete(job._id)}>
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import Header from "../components/Header";
import "../dashboard.css";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");

  const fetchJobs = async () => {
    const res = await axios.get("/jobs");
    setJobs(res.data.data);
  };

  const fetchStats = async () => {
    const res = await axios.get("/jobs/stats");
    setStats(res.data.data);
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    await axios.post("/jobs", { companyName, role });
    setCompanyName("");
    setRole("");
    fetchJobs();
    fetchStats();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/jobs/${id}`);
    fetchJobs();
    fetchStats();
  };

  useEffect(() => {
  const loadData = async () => {
    try {
      const jobsRes = await axios.get("/jobs");
      const statsRes = await axios.get("/jobs/stats");

      setJobs(jobsRes.data.data);
      setStats(statsRes.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  loadData();
}, []);
  return (
    <>
      <Header />

      <div className="dashboard-container">

        <h2>Dashboard</h2>

        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{stats.total}</h3>
              <p>Total</p>
            </div>
            <div className="stat-card">
              <h3>{stats.applied}</h3>
              <p>Applied</p>
            </div>
            <div className="stat-card">
              <h3>{stats.interview}</h3>
              <p>Interview</p>
            </div>
            <div className="stat-card">
              <h3>{stats.offer}</h3>
              <p>Offer</p>
            </div>
            <div className="stat-card">
              <h3>{stats.rejected}</h3>
              <p>Rejected</p>
            </div>
          </div>
        )}

        <div className="add-job-card">
          <h3>Add Job</h3>
          <form onSubmit={handleAddJob}>
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
        </div>

        <h3>My Jobs</h3>

        {jobs.map((job) => (
          <div key={job._id} className="job-card">
            <div>
              <strong>{job.companyName}</strong> — {job.role} — {job.status}
            </div>

            <button
              className="delete-btn"
              onClick={() => handleDelete(job._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}