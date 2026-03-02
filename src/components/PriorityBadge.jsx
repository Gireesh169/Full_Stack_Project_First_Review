import React from 'react';
import './PriorityBadge.css';

const PriorityBadge = ({ priority }) => {
  const getPriorityClass = (priority) => {
    switch(priority) {
      case "Low": return "priority-low";
      case "Medium": return "priority-medium";
      case "High": return "priority-high";
      case "Critical": return "priority-critical";
      default: return "priority-medium";
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case "Low": return "⬇️";
      case "Medium": return "➡️";
      case "High": return "⬆️";
      case "Critical": return "🔥";
      default: return "➡️";
    }
  };

  if (!priority) return null;

  return (
    <span className={`priority-badge ${getPriorityClass(priority)}`}>
      <span className="priority-icon">{getPriorityIcon(priority)}</span>
      <span className="priority-text">{priority}</span>
    </span>
  );
};

export default PriorityBadge;
