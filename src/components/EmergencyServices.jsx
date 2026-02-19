import React from "react";
import "./EmergencyServices.css";

const EmergencyServices = () => {
  const emergencyServices = [
    {
      id: 1,
      name: "Police",
      number: "100",
      description: "Emergency police assistance",
      icon: "🚓",
      color: "blue",
    },
    {
      id: 2,
      name: "Ambulance",
      number: "108",
      description: "Medical emergency & first aid",
      icon: "🚑",
      color: "red",
    },
    {
      id: 3,
      name: "Fire Department",
      number: "101",
      description: "Fire & rescue services",
      icon: "🚒",
      color: "orange",
    },
    {
      id: 4,
      name: "Women Helpline",
      number: "181",
      description: "Women in distress",
      icon: "👩‍🦰",
      color: "pink",
    },
    {
      id: 5,
      name: "Disaster Control",
      number: "1070",
      description: "Disaster & emergency management",
      icon: "🛡️",
      color: "yellow",
    },
    {
      id: 6,
      name: "Municipal Corporation",
      number: "1919",
      description: "Civic services & complaints",
      icon: "🏢",
      color: "green",
    },
  ];

  const handleCall = (number) => {
    // In a real app, this would trigger a call
    alert(`Calling: ${number}`);
  };

  return (
    <div className="emergency-page">
      <div className="emergency-header">
        <h1>🚨 Emergency Services</h1>
        <p>Quick access to important emergency contacts in your city</p>
      </div>

      <div className="emergency-grid">
        {emergencyServices.map((service) => (
          <div key={service.id} className={`emergency-card emergency-${service.color}`}>
            <div className="emergency-icon">{service.icon}</div>
            <h3 className="emergency-name">{service.name}</h3>
            <p className="emergency-desc">{service.description}</p>
            <div className="emergency-number">{service.number}</div>
            <button
              className="emergency-btn"
              onClick={() => handleCall(service.number)}
            >
              📞 Call Now
            </button>
          </div>
        ))}
      </div>

      {/* Additional Info Section */}
      <section className="info-section">
        <h2>Important Information</h2>
        <div className="info-cards">
          <div className="info-card">
            <h4>🏥 Hospitals Near You</h4>
            <ul>
              <li>City Hospital - Main Road</li>
              <li>Sunrise Clinic - Park Avenue</li>
            </ul>
          </div>
          <div className="info-card">
            <h4>⚠️ Emergency Tips</h4>
            <ul>
              <li>Always provide accurate location</li>
              <li>Stay calm and follow instructions</li>
              <li>Keep emergency numbers saved</li>
            </ul>
          </div>
          <div className="info-card">
            <h4>📱 Online Services</h4>
            <ul>
              <li>File complaints online</li>
              <li>Request medical assistance</li>
              <li>Report incidents</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmergencyServices;
