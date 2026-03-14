import { useEffect, useState } from "react";
import { getAllJobs, updateJobStatus } from "../services/adminApi";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../components/Header";
import SkeletonLoader from "../components/SkeletonLoader";
import { toast } from "react-toastify";

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getAllJobs(token);
        setJobs(res.data.data);
      } catch (error) {
        console.error("Fetch jobs error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await updateJobStatus(jobId, newStatus, token);
      
      // Update UI without refetching
      setJobs((prevJobs) => 
        prevJobs.map((job) => 
          job._id === jobId ? { ...job, status: newStatus } : job
        )
      );
      toast.success(`Application status updated to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("Failed to update application status.");
    }
  };

  const statusOptions = ['Applied', 'Interviewing', 'Offer', 'Rejected'];

  return (
    <>
      <Header />
      <div className="admin-layout">
        <AdminSidebar />

        <div className="admin-content">
          <h1 className="admin-header">Job Application Management</h1>

          {loading ? (
            <SkeletonLoader type="table" count={5} />
          ) : (
            <div className="glass-table-wrapper">
              <table className="glass-table">
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>CV</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job._id}>
                      <td>
                        <div style={{fontWeight: '600', color: '#0f172a'}}>
                          {job.createdBy?.name || "Unknown"}
                        </div>
                        <div style={{fontSize: '13px', color: '#64748b'}}>
                          {job.createdBy?.email || "No Email"}
                        </div>
                      </td>
                      <td>{job.companyName}</td>
                      <td>{job.role}</td>
                      <td>
                        <select 
                          value={job.status || 'Applied'}
                          onChange={(e) => handleStatusChange(job._id, e.target.value)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: '1px solid rgba(59, 130, 246, 0.4)',
                            background: 'rgba(255, 255, 255, 0.6)',
                            outline: 'none',
                            cursor: 'pointer',
                            color: '#0f172a',
                            fontWeight: '500',
                            fontSize: '14px',
                            backdropFilter: 'blur(4px)'
                          }}
                        >
                          {statusOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        {job.cvUrl ? (
                          <a
                            href={job.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: "6px 12px",
                              borderRadius: "8px",
                              backgroundColor: "#3b82f6",
                              color: "white",
                              textDecoration: "none",
                              fontSize: "13px",
                              fontWeight: "600"
                            }}
                          >
                            Download CV
                          </a>
                        ) : (
                          <span style={{ color: "#94a3b8", fontSize: "13px" }}>No CV</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {jobs.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{textAlign: 'center', padding: '30px', color: '#64748b'}}>
                        No applications found in the system.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminJobs;
