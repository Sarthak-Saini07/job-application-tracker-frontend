import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/adminApi";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../components/Header";
import SkeletonLoader from "../components/SkeletonLoader";
import { toast } from "react-toastify";

function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUsers = async () => {
      try {

        const token = localStorage.getItem("token");

        const res = await getUsers(token);

        setUsers(res.data.data);

      } catch (error) {

        console.error("Fetch users error:", error);

      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await deleteUser(id, token);

      // refresh list
      setUsers(prev => prev.filter(user => user._id !== id));
      toast.success("User successfully deleted!");

    } catch (error) {
      console.error("Delete user error:", error);
      
      const errorMessage = error.response?.data?.message || "";
      if (errorMessage.toLowerCase().includes("admin")) {
        toast.error("Admins cannot remove another admin. Please contact superadmin.");
      } else {
        toast.error(errorMessage || "Failed to delete user.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="admin-layout">
        <AdminSidebar />

        <div className="admin-content">
          <h1 className="admin-header">User Management</h1>

          {loading ? (
            <SkeletonLoader type="table" count={5} />
          ) : (
            <div className="glass-table-wrapper">
              <table className="glass-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span style={{ 
                          padding: "4px 10px", 
                          borderRadius: "12px", 
                          background: user.role === 'admin' ? "rgba(139, 92, 246, 0.15)" : "rgba(59, 130, 246, 0.1)",
                          color: user.role === 'admin' ? "#7c3aed" : "#3b82f6",
                          fontSize: "12px",
                          fontWeight: "bold",
                          textTransform: "uppercase"
                        }}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn-glass-danger"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete User
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default AdminUsers;