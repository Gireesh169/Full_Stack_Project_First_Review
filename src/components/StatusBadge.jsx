import React from 'react';
import './StatusBadge.css';

const StatusBadge = ({ status }) => {
  const getStatusClass = (status) => {
    switch(status) {
      case "Pending": return "status-pending";
      case "In Progress": return "status-inprogress";
      case "Resolved": 
      case "Completed": return "status-completed";
      case "Rejected": return "status-rejected";
      default: return "status-pending";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Pending": return "⏳";
      case "In Progress": return "⚙️";
      case "Resolved": 
      case "Completed": return "✅";
      case "Rejected": return "❌";
      default: return "⏳";
    }
  };

  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      <span className="status-icon">{getStatusIcon(status)}</span>
      <span className="status-text">{status}</span>
    </span>
  );
};

export default StatusBadge;
