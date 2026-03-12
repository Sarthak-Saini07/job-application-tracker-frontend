import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/adminApi";
import AdminSidebar from "../components/AdminSidebar";

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

    } catch (error) {

      console.error("Delete user error:", error);

    }

  };

  if (loading) {
    return <h2>Loading users...</h2>;
  }

  return (
    <div style={{ display: "flex" }}>

      <AdminSidebar />

      <div style={{ padding: "20px", width: "100%" }}>

        <h1>Users</h1>

        <table border="1" width="100%" cellPadding="10">

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

                <td>{user.role}</td>

                <td>

                  <button
                    onClick={() => handleDelete(user._id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminUsers;