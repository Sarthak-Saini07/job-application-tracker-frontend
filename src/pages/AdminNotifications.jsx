import { useEffect, useState } from "react";
import { getNotifications } from "../services/adminApi";
import AdminSidebar from "../components/AdminSidebar";

function AdminNotifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const fetchNotifications = async () => {

      const token = localStorage.getItem("token");

      const res = await getNotifications(token);

      setNotifications(res.data.data);

    };

    fetchNotifications();

  }, []);

  return (
    <div style={{ display: "flex" }}>

      <AdminSidebar />

      <div style={{ padding: "20px" }}>

        <h1>Notifications</h1>

        {notifications.map((n) => (

          <div key={n._id}>
            <p>{n.message}</p>
          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminNotifications;