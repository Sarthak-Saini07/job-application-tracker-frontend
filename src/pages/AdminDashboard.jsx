import { useEffect, useState } from "react";
import { getAdminStats } from "../services/adminApi";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../components/Header";
import SkeletonLoader from "../components/SkeletonLoader";

function AdminDashboard() {

  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchStats = async () => {

      const token = localStorage.getItem("token");

      try {
        const res = await getAdminStats(token);
        setStats(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

    };

    fetchStats();

  }, []);

  return (
    <>
      <Header />
      <div className="admin-layout">
        <AdminSidebar />

        <div className="admin-content">
          <h1 className="admin-header">Dashboard Overview</h1>

          {loading ? (
            <SkeletonLoader type="stats" count={6} />
          ) : (
            <div className="admin-glass-card">
              <div className="admin-stats-grid">
                <div className="admin-stat-item">
                  <span className="admin-stat-value">{stats.totalUsers || 0}</span>
                  <span className="admin-stat-label">Total Users</span>
                </div>
                
                <div className="admin-stat-item">
                  <span className="admin-stat-value">{stats.totalJobs || 0}</span>
                  <span className="admin-stat-label">Total Jobs</span>
                </div>
                
                <div className="admin-stat-item">
                  <span className="admin-stat-value" style={{color: '#4338ca'}}>{stats.applied || 0}</span>
                  <span className="admin-stat-label">Applied</span>
                </div>
                
                <div className="admin-stat-item">
                  <span className="admin-stat-value" style={{color: '#854d0e'}}>{stats.interview || 0}</span>
                  <span className="admin-stat-label">Interviewing</span>
                </div>
                
                <div className="admin-stat-item">
                  <span className="admin-stat-value" style={{color: '#166534'}}>{stats.offer || 0}</span>
                  <span className="admin-stat-label">Offers</span>
                </div>
                
                <div className="admin-stat-item">
                  <span className="admin-stat-value" style={{color: '#b91c1c'}}>{stats.rejected || 0}</span>
                  <span className="admin-stat-label">Rejected</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default AdminDashboard;