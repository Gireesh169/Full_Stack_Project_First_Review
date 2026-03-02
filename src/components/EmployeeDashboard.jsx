import React, { useMemo } from 'react';
import ComplaintCard from './ComplaintCard';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import './EmployeeDashboard.css';

const EmployeeDashboard = ({ complaints = [], setComplaints }) => {
  const employeeName = localStorage.getItem("userName") || localStorage.getItem("userEmail") || "Employee";

  // Filter complaints assigned to this employee
  const myComplaints = useMemo(() => {
    return complaints.filter(c => c.assignedTo === employeeName);
  }, [complaints, employeeName]);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: myComplaints.length,
      pending: myComplaints.filter(c => c.status === "Pending").length,
      inProgress: myComplaints.filter(c => c.status === "In Progress").length,
      completed: myComplaints.filter(c => c.status === "Completed" || c.status === "Resolved").length,
    };
  }, [myComplaints]);

  // Sort by priority and date
  const sortedComplaints = useMemo(() => {
    const priorityOrder = { 'Critical': 1, 'High': 2, 'Medium': 3, 'Low': 4 };
    return [...myComplaints].sort((a, b) => {
      const priorityDiff = (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3);
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.assignedDate || b.createdAt) - new Date(a.assignedDate || a.createdAt);
    });
  }, [myComplaints]);

  const handleStatusChange = (id, newStatus) => {
    setComplaints(prevComplaints =>
      prevComplaints.map(c =>
        c.id === id
          ? {
              ...c,
              status: newStatus,
              updatedAt: new Date().toISOString(),
              updatedBy: employeeName
            }
          : c
      )
    );
  };

  return (
    <div className="ed-container">
      <div className="ed-page">
        {/* Header */}
        <header className="ed-header">
          <div>
            <h1>👷 Employee Dashboard</h1>
            <p className="ed-subtitle">Welcome, {employeeName}</p>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="ed-stats">
          <div className="ed-stat-card total">
            <div className="ed-stat-icon">📋</div>
            <div className="ed-stat-content">
              <div className="ed-stat-value">{stats.total}</div>
              <div className="ed-stat-label">Total Assigned</div>
            </div>
          </div>
          <div className="ed-stat-card pending">
            <div className="ed-stat-icon">⏳</div>
            <div className="ed-stat-content">
              <div className="ed-stat-value">{stats.pending}</div>
              <div className="ed-stat-label">Pending</div>
            </div>
          </div>
          <div className="ed-stat-card progress">
            <div className="ed-stat-icon">⚙️</div>
            <div className="ed-stat-content">
              <div className="ed-stat-value">{stats.inProgress}</div>
              <div className="ed-stat-label">In Progress</div>
            </div>
          </div>
          <div className="ed-stat-card completed">
            <div className="ed-stat-icon">✅</div>
            <div className="ed-stat-content">
              <div className="ed-stat-value">{stats.completed}</div>
              <div className="ed-stat-label">Completed</div>
            </div>
          </div>
        </div>

        {/* Complaints Section */}
        <section className="ed-section">
          <div className="ed-section-header">
            <h2>📝 My Assigned Complaints</h2>
            <p className="ed-section-subtitle">
              {myComplaints.length === 0 
                ? "No complaints assigned yet" 
                : `Managing ${myComplaints.length} complaint${myComplaints.length !== 1 ? 's' : ''}`
              }
            </p>
          </div>

          {myComplaints.length === 0 ? (
            <div className="ed-empty-state">
              <div className="ed-empty-icon">📭</div>
              <h3>No Complaints Assigned</h3>
              <p>You don't have any complaints assigned to you at the moment.</p>
              <p className="ed-empty-hint">Check back later or contact your admin.</p>
            </div>
          ) : (
            <div className="ed-complaints-grid">
              {sortedComplaints.map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  onStatusChange={handleStatusChange}
                  showActions={true}
                  showEmployeeInfo={true}
                />
              ))}
            </div>
          )}
        </section>

        {/* Priority Guide */}
        <section className="ed-section">
          <div className="ed-info-box">
            <h3>📌 Priority Guidelines</h3>
            <div className="ed-priority-guide">
              <div className="ed-guide-item">
                <PriorityBadge priority="Critical" />
                <span>Immediate action required - respond within 1 hour</span>
              </div>
              <div className="ed-guide-item">
                <PriorityBadge priority="High" />
                <span>Urgent - respond within 4 hours</span>
              </div>
              <div className="ed-guide-item">
                <PriorityBadge priority="Medium" />
                <span>Standard - respond within 24 hours</span>
              </div>
              <div className="ed-guide-item">
                <PriorityBadge priority="Low" />
                <span>Non-urgent - respond within 48 hours</span>
              </div>
            </div>
          </div>
        </section>

        {/* Status Guide */}
        <section className="ed-section">
          <div className="ed-info-box">
            <h3>🔄 Status Workflow</h3>
            <div className="ed-status-guide">
              <div className="ed-guide-item">
                <StatusBadge status="Pending" />
                <span>Newly assigned - review and start work</span>
              </div>
              <div className="ed-guide-item">
                <StatusBadge status="In Progress" />
                <span>Currently working on the complaint</span>
              </div>
              <div className="ed-guide-item">
                <StatusBadge status="Completed" />
                <span>Work completed - awaiting verification</span>
              </div>
              <div className="ed-guide-item">
                <StatusBadge status="Resolved" />
                <span>Issue resolved and verified</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
