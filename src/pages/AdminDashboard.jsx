import { useEffect, useState } from "react";
import { getAdminStats } from "../services/adminApi";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../components/Header";
import SkeletonLoader from "../components/SkeletonLoader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend, Sector } from 'recharts';

function AdminDashboard() {

  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Prepare data for the chart based on the fetched stats
  const chartData = [
    { name: 'Applied', value: stats.applied || 0, color: '#4338ca' },
    { name: 'Interview', value: stats.interview || 0, color: '#854d0e' },
    { name: 'Offer', value: stats.offer || 0, color: '#166534' },
    { name: 'Rejected', value: stats.rejected || 0, color: '#b91c1c' },
  ];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 12}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          style={{ filter: `drop-shadow(0px 8px 16px ${fill}66)`, transition: 'all 0.3s ease' }}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 14}
          outerRadius={outerRadius + 20}
          fill={fill}
        />
      </g>
    );
  };

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

          {/* Job Status Distribution Chart */}
          {!loading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px', marginTop: '30px' }}>
              {/* Donut Chart Card */}
              <div className="admin-glass-card" style={{ marginBottom: 0 }}>
                <h2 style={{ 
                  fontFamily: 'Outfit, sans-serif', 
                  fontSize: '20px', 
                  marginBottom: '24px', 
                  color: 'var(--text-main)',
                  textAlign: 'center'
                }}>
                  Application Status Breakdown
                </h2>
                <div style={{ width: '100%', height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        onMouseEnter={onPieEnter}
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                        style={{ cursor: 'pointer' }}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '12px', 
                          border: 'none', 
                          boxShadow: 'var(--shadow-lg)',
                          padding: '12px 16px',
                          fontFamily: 'Inter, sans-serif'
                        }}
                        itemStyle={{ fontWeight: 600, color: '#0f172a' }}
                      />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '14px', fontWeight: 500, color: '#64748b' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Gradient Bar Chart Card */}
              <div className="admin-glass-card" style={{ marginBottom: 0 }}>
                <h2 style={{ 
                  fontFamily: 'Outfit, sans-serif', 
                  fontSize: '20px', 
                  marginBottom: '24px', 
                  color: 'var(--text-main)',
                  textAlign: 'center'
                }}>
                  Pipeline Volume
                </h2>
                <div style={{ width: '100%', height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                      <defs>
                        {chartData.map((entry, index) => (
                          <linearGradient key={`grad-${index}`} id={`colorGrad-${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={entry.color} stopOpacity={0.9}/>
                            <stop offset="95%" stopColor={entry.color} stopOpacity={0.3}/>
                          </linearGradient>
                        ))}
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} 
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
                      />
                      <Tooltip 
                        cursor={{ fill: 'rgba(226, 232, 240, 0.4)' }}
                        contentStyle={{ 
                          borderRadius: '12px', 
                          border: 'none', 
                          boxShadow: 'var(--shadow-lg)',
                          padding: '12px 16px',
                          fontFamily: 'Inter, sans-serif'
                        }}
                        itemStyle={{ fontWeight: 600, color: '#0f172a' }}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={50} style={{ cursor: 'pointer' }}>
                        {chartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={`url(#colorGrad-${index})`} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
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