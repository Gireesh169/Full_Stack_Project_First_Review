import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "./ReportForm.css";

const ReportForm = () => {
  const location = useLocation();
  const { serviceName, actionType } = location.state;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Read existing complaints
    const existing =
      JSON.parse(localStorage.getItem("citizenComplaints")) || [];

    // Create new complaint object
    const newComplaint = {
      id: Date.now(),
      title: `${serviceName} - ${formData.name}`,
      description: formData.description,
      category: serviceName,
      status: "Open",
      createdAt: new Date().toISOString(),
    };

    // Save to LocalStorage
    const updated = [newComplaint, ...existing];
    localStorage.setItem("citizenComplaints", JSON.stringify(updated));

    // Generate PDF
    const pdf = new jsPDF();
    pdf.text(`Service: ${serviceName}`, 10, 10);
    pdf.text(`Action: ${actionType}`, 10, 20);
    pdf.text(`Name: ${formData.name}`, 10, 30);
    pdf.text(`Phone: ${formData.phone}`, 10, 40);
    pdf.text(`Address: ${formData.address}`, 10, 50);
    pdf.text(`Issue Description: ${formData.description}`, 10, 60);

    pdf.save(`${serviceName}-${actionType}-report.pdf`);

    alert("Submitted Successfully & Registered Complaint!");
  };

  return (
    <div className="report-page">
      <h2>
        {actionType} - {serviceName}
      </h2>

      <form onSubmit={handleSubmit} className="report-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          required
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Describe Your Issue"
          required
          onChange={handleChange}
        />

        <button type="submit" className="cd-btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
