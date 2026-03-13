import React, { useState } from 'react';

export default function JobForm({ onAddJob }) {
    const [companyName, setCompanyName] = useState("");
    const [role, setRole] = useState("");

    const [cv, setCv] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!companyName || !role) return;

        const formData = new FormData();
        formData.append("companyName", companyName);
        formData.append("role", role);
        if (cv) {
            formData.append("cv", cv);
        }

        onAddJob(formData);
        
        setCompanyName("");
        setRole("");
        setCv(null);
        // Reset the file input visually
        e.target.reset();
    };

    return (
        <div className="add-job-card">
            <h3>Add Application</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Company Name (e.g. Google, Apple)"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Role / Title"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                />
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setCv(e.target.files[0])}
                    title="Upload CV (Optional)"
                    style={{
                        padding: '10px',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: 'rgba(255, 255, 255, 0.4)'
                    }}
                />
                <button type="submit" className="add-btn">
                    Add Role
                </button>
            </form>
        </div>
    );
}
