import { useEffect, useState } from "react";
import { getNotifications } from "../services/adminApi";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../components/Header";
import SkeletonLoader from "../components/SkeletonLoader";

function AdminNotifications() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await getNotifications(token, page, limit);
        setNotifications(res.data.data);
        if (res.data.pagination) {
          setTotalPages(res.data.pagination.totalPages);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [page]);

  return (
    <>
      <Header />
      <div className="admin-layout">
        <AdminSidebar />

        <div className="admin-content">
          <h1 className="admin-header">System Notifications</h1>

          {loading ? (
             <SkeletonLoader type="card" count={5} />
          ) : (
            <div className="notification-list">
              {notifications.length === 0 ? (
                <p style={{color: '#64748b'}}>No recent notifications.</p>
              ) : (
                notifications.map((n) => (
                  <div key={n._id} className="notification-card">
                  <div className="notification-icon">
                    {n.type === 'JOB_CREATED' ? (
                      <svg viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                      </svg>
                    )}
                  </div>
                  <div style={{flex: 1}}>
                    <p style={{margin: 0, fontSize: '15px', color: 'var(--text-main)', fontWeight: '500'}}>{n.message}</p>
                    <span style={{fontSize: '12px', color: 'var(--text-muted)'}}>{new Date(n.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                ))
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '20px'
                }}>
                  <button 
                    className="base-btn"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    style={{
                       background: page === 1 ? '#e2e8f0' : '#4f46e5',
                       color: page === 1 ? '#94a3b8' : 'white',
                       cursor: page === 1 ? 'not-allowed' : 'pointer',
                       padding: '8px 16px',
                       borderRadius: '8px'
                    }}
                  >
                    Previous
                  </button>

                  <span style={{fontSize: '14px', color: '#64748b', fontWeight: '500'}}>
                    Page {page} of {totalPages}
                  </span>

                  <button 
                    className="base-btn"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    style={{
                       background: page >= totalPages ? '#e2e8f0' : '#4f46e5',
                       color: page >= totalPages ? '#94a3b8' : 'white',
                       cursor: page >= totalPages ? 'not-allowed' : 'pointer',
                       padding: '8px 16px',
                       borderRadius: '8px'
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminNotifications;