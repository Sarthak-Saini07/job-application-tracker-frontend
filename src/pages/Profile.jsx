import { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import Header from "../components/Header";
import "../profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/auth/me");
        setUser(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <Header />

      <div className="profile-container">
        {user && (
          <div className="profile-card">

            {/* Avatar Section */}
            <div className="profile-header">
              <div className="avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2>{user.name}</h2>
                <p className="member-since">
                  Member since {new Date(user.createdAt).toDateString()}
                </p>
              </div>
            </div>

            <div className="profile-details">

              <div className="profile-item">
                <label>Email</label>
                <p>{user.email}</p>
              </div>

              <div className="profile-item">
                <label>Contact</label>
                <p>{user.contact || "Not Provided"}</p>
              </div>

              <div className="profile-item">
                <label>Location</label>
                <p>{user.location || "Not Provided"}</p>
              </div>

              <div className="profile-item">
                <label>LinkedIn</label>
                <p>{user.linkedin || "Not Provided"}</p>
              </div>

              <div className="profile-item">
                <label>Skills</label>
                <p>{user.skills?.join(", ") || "Not Provided"}</p>
              </div>

            </div>

            <button className="edit-btn">
              Edit Profile
            </button>

          </div>
        )}
      </div>
    </>
  );
}