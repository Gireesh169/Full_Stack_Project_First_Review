import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import CityServices from "./components/CityServices";
import Profile from "./components/Profile";
import CitizenDashboard from "./components/CitizenDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Navbar from "./components/Navbar";
import ServiceDetails from "./components/ServiceDetails";
import ReportForm from "./components/ReportForm";
import EmergencyServices from "./components/EmergencyServices";
import CityNews from "./components/CityNews";
import ComplaintHistory from "./components/ComplaintHistory";
import About from "./components/About";

function App() {
  const [userRole, setUserRole] = useState(() =>
    localStorage.getItem("userRole")
  );

  useEffect(() => {
    if (userRole) {
      localStorage.setItem("userRole", userRole);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [userRole]);

  const handleLogin = (role) => setUserRole(role);
  const handleSignup = (role) => setUserRole(role);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setUserRole(null);
  };

  return (
    <Router>
      <Navbar userRole={userRole} onLogout={handleLogout} />

      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={
            userRole ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/cityservices"
          element={userRole ? <CityServices /> : <Navigate to="/login" />}
        />

        <Route
          path="/citizen"
          element={userRole ? <ServiceDetails /> : <Navigate to="/login" />}
        />

        {/* Auth routes */}
        <Route
          path="/login"
          element={
            userRole ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            userRole ? (
              <Navigate to="/dashboard" />
            ) : (
              <Signup onSignup={handleSignup} />
            )
          }
        />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            userRole ? <Home role={userRole} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/profile"
          element={userRole ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/cityservices"
          element={userRole ? <CityServices /> : <Navigate to="/login" />}
        />

        {/* Dashboard with role-based access */}
        <Route
          path="/dashboard"
          element={
            userRole ? (
              userRole === "admin" ? (
                <AdminDashboard />
              ) : (
                <CitizenDashboard />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/report-form" element={<ReportForm />} />
        
        {/* Emergency Services route */}
        <Route
          path="/emergency"
          element={userRole ? <EmergencyServices /> : <Navigate to="/login" />}
        />

        {/* City News route */}
        <Route
          path="/news"
          element={userRole ? <CityNews /> : <Navigate to="/login" />}
        />

        {/* Complaint History route */}
        <Route
          path="/history"
          element={userRole ? <ComplaintHistory /> : <Navigate to="/login" />}
        />

        {/* About & Help route */}
        <Route
          path="/about"
          element={userRole ? <About /> : <Navigate to="/login" />}
        />

        {/* Admin-only route example */}
        <Route
          path="/admin"
          element={
            userRole === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
