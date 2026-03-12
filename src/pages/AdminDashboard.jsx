import { useEffect, useState } from "react";
import { getAdminStats } from "../services/adminApi";
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {

  const [stats, setStats] = useState({});

  useEffect(() => {

    const fetchStats = async () => {

      const token = localStorage.getItem("token");

      const res = await getAdminStats(token);

      setStats(res.data.data);

    };

    fetchStats();

  }, []);

  return (
    <div style={{ display: "flex" }}>

      <AdminSidebar />

      <div style={{ padding: "20px" }}>

        <h1>Admin Dashboard</h1>

        <p>Total Users: {stats.totalUsers}</p>
        <p>Total Jobs: {stats.totalJobs}</p>
        <p>Applied: {stats.applied}</p>
        <p>Interview: {stats.interview}</p>
        <p>Offer: {stats.offer}</p>
        <p>Rejected: {stats.rejected}</p>

      </div>

    </div>
  );
}

export default AdminDashboard;