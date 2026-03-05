import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div style={{ width: "200px", padding: "20px", background: "#eee" }}>
      <h2>Admin</h2>

      <div>
        <Link to="/admin">Dashboard</Link>
      </div>

      <div>
        <Link to="/admin/users">Users</Link>
      </div>

      <div>
        <Link to="/admin/notifications">Notifications</Link>
      </div>
    </div>
  );
}

export default AdminSidebar;