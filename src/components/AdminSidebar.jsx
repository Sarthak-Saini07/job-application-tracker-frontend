import { Link, useLocation } from "react-router-dom";
import "../admin.css";

function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="admin-sidebar">
      <h2>Jobsy Admin</h2>

      <div className="admin-nav">
        <Link to="/admin" className={location.pathname === "/admin" ? "active" : ""}>
          📊 Dashboard
        </Link>
        <Link to="/admin/jobs" className={location.pathname === "/admin/jobs" ? "active" : ""}>
          💼 Jobs
        </Link>
        <Link to="/admin/users" className={location.pathname === "/admin/users" ? "active" : ""}>
          👥 Users
        </Link>
        <Link to="/admin/notifications" className={location.pathname === "/admin/notifications" ? "active" : ""}>
          🔔 Notifications
        </Link>
      </div>
    </div>
  );
}

export default AdminSidebar;