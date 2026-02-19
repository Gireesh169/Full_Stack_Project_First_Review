import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = ({ onSignup }) => {
  const [role, setRole] = useState("citizen");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      // Save profile info for Profile page
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      onSignup(role);
      navigate("/dashboard");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create an account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your full name"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a strong password"
            />
          </label>

          <label>
            Role
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="citizen">Citizen</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <button type="submit" className="btn-primary">Sign Up</button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login" className="link-btn">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
