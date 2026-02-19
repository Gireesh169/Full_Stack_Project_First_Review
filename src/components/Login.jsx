import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [role, setRole] = useState("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("userEmail", email);
      if (!localStorage.getItem("userName")) {
        localStorage.setItem("userName", "");
      }
      onLogin(role);
      navigate("/dashboard");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="••••••••"
            />
          </label>
          <label>
            Role
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="citizen">Citizen</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <button type="submit" className="btn-primary">Login</button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup" className="link-btn">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
