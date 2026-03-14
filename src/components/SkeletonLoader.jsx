import React from "react";
import "./SkeletonLoader.css";

function SkeletonLoader({ type = "table", count = 3 }) {
  if (type === "card") {
    return (
      <div className="skeleton-card-container">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="skeleton skeleton-card">
            <div className="skeleton-line title"></div>
            <div className="skeleton-line subtitle"></div>
            <div className="skeleton-line status"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="skeleton-table-wrapper">
        <div className="skeleton-table-header skeleton"></div>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="skeleton-table-row skeleton"></div>
        ))}
      </div>
    );
  }

  if (type === "stats") {
    return (
      <div className="stats-grid">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="stat-card skeleton skeleton-stat"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="skeleton skeleton-line"></div>
  );
}

export default SkeletonLoader;
