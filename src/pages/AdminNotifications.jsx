import { useEffect, useState } from "react";
import { getNotifications } from "../services/adminApi";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../components/Header";

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
    <>
      <Header />
      <div className="admin-layout">
        <AdminSidebar />

        <div className="admin-content">
          <h1 className="admin-header">System Notifications</h1>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <p style={{color: '#64748b'}}>No recent notifications.</p>
            ) : (
              notifications.map((n) => (
                <div key={n._id} className="notification-card">
                  <div className="notification-icon">
                    {n.type === 'JOB_CREATED' ? '📝' : '🔔'}
                  </div>
                  <div style={{flex: 1}}>
                    <p style={{margin: 0, fontSize: '15px', color: '#334155', fontWeight: '500'}}>{n.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminNotifications;