import React, { useEffect, useRef } from 'react';

export default function JobList({ jobs, onDelete }) {
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-card');
                }
            });
        }, { threshold: 0.1 });

        const cards = document.querySelectorAll('.job-card');
        cards.forEach((card) => observerRef.current.observe(card));

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [jobs]);

    if (!jobs || jobs.length === 0) {
        return <p>No applications found. Start by adding one above!</p>;
    }

    // Helper function to determine status badge class
    const getStatusClass = (status) => {
        switch (status) {
            case 'Applied': return 'status-applied';
            case 'Interviewing': return 'status-interview'; // Matches new CSS
            case 'Offer': return 'status-offer';
            case 'Rejected': return 'status-rejected';
            default: return 'status-applied';
        }
    };

    return (
        <div className="job-list">
            {jobs.map((job) => (
                <div key={job._id} className="job-card">
                    <div className="job-details">
                        <strong>{job.companyName}</strong>
                        <span>—</span>
                        <span>{job.role}</span>
                        <span className={`status-badge ${getStatusClass(job.status)}`}>
                            {job.status || "Applied"}
                        </span>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        {job.cvUrl && (
                            <a
                                href={job.cvUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="base-btn primary-btn-global"
                                style={{
                                    textDecoration: "none",
                                    fontSize: "13px",
                                    padding: "6px 12px",
                                }}
                            >
                                Download CV
                            </a>
                        )}
                        <button
                            className="delete-btn"
                            onClick={() => onDelete(job._id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
