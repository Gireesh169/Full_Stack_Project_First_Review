import React, { useState, useEffect, useMemo } from 'react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import './ComplaintHistory.css';

const ComplaintHistory = ({ complaints: propComplaints }) => {
  const [complaints, setComplaints] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Use props if available, otherwise fall back to localStorage
    if (propComplaints && propComplaints.length >= 0) {
      setComplaints(propComplaints);
    } else {
      try {
        const stored = localStorage.getItem("citizenComplaints");
        const data = stored ? JSON.parse(stored) : [];
        setComplaints(data);
      } catch {
        setComplaints([]);
      }
    }
  }, [propComplaints]);

  const STATUSES = ["Pending", "In Progress", "Resolved", "Rejected"];

  const categories = useMemo(() => {
    const cats = [...new Set(complaints.map(c => c.category))];
    return ["All", ...cats];
  }, [complaints]);

  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => {
      const statusMatch = filterStatus === "All" || c.status === filterStatus;
      const categoryMatch = filterCategory === "All" || c.category === filterCategory;
      const searchMatch = !searchTerm || 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      return statusMatch && categoryMatch && searchMatch;
    });
  }, [complaints, filterStatus, filterCategory, searchTerm]);

  const stats = useMemo(() => {
    return {
      total: complaints.length,
      pending: complaints.filter(c => c.status === "Pending").length,
      inProgress: complaints.filter(c => c.status === "In Progress").length,
      resolved: complaints.filter(c => c.status === "Resolved").length,
      rejected: complaints.filter(c => c.status === "Rejected").length
    };
  }, [complaints]);

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending": return "#f59e0b";
      case "In Progress": return "#f97316";
      case "Resolved": return "#10b981";
      case "Rejected": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const sortedComplaints = [...filteredComplaints].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="ch-container">
      <div className="ch-page">
        {/* Header */}
        <div className="ch-header">
          <h1>📋 My Complaint History</h1>
          <p>Track and manage all your complaints</p>
        </div>

        {/* Stats Cards */}
        <div className="ch-stats">
          <div className="ch-stat-card">
            <div className="ch-stat-value">{stats.total}</div>
            <div className="ch-stat-label">Total</div>
          </div>
          <div className="ch-stat-card" style={{ '--color': '#f59e0b' }}>
            <div className="ch-stat-value">{stats.pending}</div>
            <div className="ch-stat-label">Pending</div>
          </div>
          <div className="ch-stat-card" style={{ '--color': '#f97316' }}>
            <div className="ch-stat-value">{stats.inProgress}</div>
            <div className="ch-stat-label">In Progress</div>
          </div>
          <div className="ch-stat-card" style={{ '--color': '#10b981' }}>
            <div className="ch-stat-value">{stats.resolved}</div>
            <div className="ch-stat-label">Resolved</div>
          </div>
          <div className="ch-stat-card" style={{ '--color': '#ef4444' }}>
            <div className="ch-stat-value">{stats.rejected}</div>
            <div className="ch-stat-label">Rejected</div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="ch-filters">
          <input
            type="text"
            placeholder="🔍 Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ch-search"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="ch-filter-select"
          >
            <option value="All">All Statuses</option>
            {STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="ch-filter-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Complaints List/Table */}
        {sortedComplaints.length === 0 ? (
          <div className="ch-empty">
            <div className="ch-empty-icon">🎉</div>
            <p>No complaints found</p>
            <small>{searchTerm ? "Try adjusting your search" : "You haven't filed any complaints yet"}</small>
          </div>
        ) : (
          <div className="ch-list">
            {sortedComplaints.map((complaint) => (
              <div key={complaint.id} className="ch-card">
                {/* Card Header */}
                <div className="ch-card-header">
                  <div className="ch-card-title">{complaint.title}</div>
                  <div className="ch-badges">
                    <StatusBadge status={complaint.status} />
                    {complaint.priority && <PriorityBadge priority={complaint.priority} />}
                  </div>
                </div>

                {/* Card Content */}
                <div className="ch-card-content">
                  <div className="ch-info-row">
                    <span className="ch-label">Category:</span>
                    <span className="ch-value">{complaint.category}</span>
                  </div>

                  <div className="ch-info-row">
                    <span className="ch-label">📍 Location:</span>
                    <span className="ch-value">{complaint.location}</span>
                  </div>

                  <div className="ch-info-row">
                    <span className="ch-label">📅 Date:</span>
                    <span className="ch-value">
                      {new Date(complaint.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  {complaint.assignedTo && (
                    <div className="ch-info-row">
                      <span className="ch-label">👤 Assigned to:</span>
                      <span className="ch-value">{complaint.assignedTo}</span>
                    </div>
                  )}

                  {complaint.updatedAt && complaint.updatedAt !== complaint.createdAt && (
                    <div className="ch-info-row">
                      <span className="ch-label">🔄 Last Updated:</span>
                      <span className="ch-value">
                        {new Date(complaint.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}

                  <div className="ch-description">
                    <span className="ch-label">Description:</span>
                    <p>{complaint.description}</p>
                  </div>

                  {complaint.image && (
                    <div className="ch-image-preview">
                      <img src={complaint.image} alt={complaint.title} />
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="ch-card-footer">
                  <div className="ch-time-since">
                    ⏱️ {Math.floor((new Date() - new Date(complaint.createdAt)) / (1000 * 60 * 60))} hours ago
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Info */}
        {sortedComplaints.length > 0 && (
          <div className="ch-results-info">
            Showing {sortedComplaints.length} of {complaints.length} complaints
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintHistory;
