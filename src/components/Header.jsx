import { useNavigate } from "react-router-dom";
import "../dashboard.css";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <h2 className="logo">JobTracker</h2>

      <div className="header-right">
        <div
          className="profile-icon"
          onClick={() => navigate("/profile")}
        >
          👤
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}