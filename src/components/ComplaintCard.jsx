import React from 'react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import './ComplaintCard.css';

const ComplaintCard = ({ 
  complaint, 
  onStatusChange, 
  onDelete, 
  onAssignEmployee,
  onPriorityChange,
  showActions = true,
  showEmployeeInfo = false,
  employees = []
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="complaint-card">
      <div className="complaint-card-header">
        <div className="complaint-card-title-section">
          <h3 className="complaint-card-title">{complaint.title}</h3>
          <div className="complaint-card-badges">
            <StatusBadge status={complaint.status} />
            <PriorityBadge priority={complaint.priority} />
          </div>
        </div>
        <div className="complaint-card-meta">
          <span className="complaint-card-category">📂 {complaint.category}</span>
          <span className="complaint-card-location">📍 {complaint.location}</span>
        </div>
      </div>

      <div className="complaint-card-body">
        <p className="complaint-card-description">{complaint.description}</p>
        
        {complaint.image && (
          <div className="complaint-card-image-wrapper">
            <img 
              src={complaint.image} 
              alt="Complaint" 
              className="complaint-card-image"
            />
          </div>
        )}

        <div className="complaint-card-info">
          <div className="complaint-card-info-item">
            <span className="info-label">Created:</span>
            <span className="info-value">{formatDate(complaint.createdAt)}</span>
          </div>
          {complaint.assignedTo && showEmployeeInfo && (
            <div className="complaint-card-info-item">
              <span className="info-label">Assigned to:</span>
              <span className="info-value">👤 {complaint.assignedTo}</span>
            </div>
          )}
          {complaint.assignedDate && showEmployeeInfo && (
            <div className="complaint-card-info-item">
              <span className="info-label">Assigned on:</span>
              <span className="info-value">{formatDate(complaint.assignedDate)}</span>
            </div>
          )}
        </div>
      </div>

      {showActions && (
        <div className="complaint-card-actions">
          {onStatusChange && (
            <select
              value={complaint.status}
              onChange={(e) => onStatusChange(complaint.id, e.target.value)}
              className="complaint-action-select status-select"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          )}

          {onPriorityChange && (
            <select
              value={complaint.priority || 'Medium'}
              onChange={(e) => onPriorityChange(complaint.id, e.target.value)}
              className="complaint-action-select priority-select"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
              <option value="Critical">Critical Priority</option>
            </select>
          )}

          {onAssignEmployee && employees.length > 0 && (
            <select
              value={complaint.assignedTo || ''}
              onChange={(e) => onAssignEmployee(complaint.id, e.target.value)}
              className="complaint-action-select employee-select"
            >
              <option value="">Select Employee</option>
              {employees.map((emp, idx) => (
                <option key={idx} value={emp}>{emp}</option>
              ))}
            </select>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(complaint.id)}
              className="complaint-action-btn delete-btn"
              title="Delete complaint"
            >
              🗑️ Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ComplaintCard;
