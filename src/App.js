import React, { useState } from "react";
import "./App.css";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [welcomeUser, setWelcomeUser] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8081/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const msg = await response.text();
        setSuccess(msg || "Registration successful 🎉");
        setFormData({ username: "", email: "", password: "" });
        setShowRegister(false);
        setShowSuccessCard(true);
      } else {
        const errorMsg = await response.text();
        setError(errorMsg || "Registration failed ❌");
      }
    } catch (err) {
      setError("Server not reachable. Try again later.");
    }
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8081/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      if (response.ok) {
        const data = await response.json(); // assuming backend sends user info
        setWelcomeUser(data.username || "User");
        setFormData({ username: "", email: "", password: "" });
        setShowLogin(false);
      } else {
        const errorMsg = await response.text();
        setError(errorMsg || "Login failed ❌");
      }
    } catch (err) {
      setError("Server not reachable. Try again later.");
    }
  };

  return (
    <div className="app-container">
      {/* Top-right buttons */}
      <div className="top-right-buttons">
        {!showRegister && !showLogin && !showSuccessCard && !welcomeUser && (
          <>
            <button className="premium-btn" onClick={() => setShowRegister(true)}>
              Register
            </button>
            <button className="premium-btn" onClick={() => setShowLogin(true)}>
              Login
            </button>
          </>
        )}
      </div>

      {/* Title */}
      {!showRegister && !showLogin && !showSuccessCard && !welcomeUser && (
        <h1 className="app-title">Project-X</h1>
      )}

      {/* Registration form */}
      {showRegister && (
        <div className="form-container">
          <span className="close-btn" onClick={() => setShowRegister(false)}>
            ×
          </span>
          <h2 className="form-title">Register</h2>
          <form className="register-form" onSubmit={handleRegister}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-btn">
              Register
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      )}

      {/* Login form */}
      {showLogin && (
        <div className="form-container">
          <span className="close-btn" onClick={() => setShowLogin(false)}>
            ×
          </span>
          <h2 className="form-title">Login</h2>
          <form className="register-form" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      )}

      {/* Success card after registration */}
      {showSuccessCard && (
        <div className="success-card">
          <h2>🎉 Registration Successful!</h2>
          <p>Please login to continue.</p>
          <button
            className="premium-btn"
            onClick={() => setShowSuccessCard(false)}
          >
            Go to Login
          </button>
        </div>
      )}

      {/* Welcome screen after login */}
      {welcomeUser && (
        <div className="success-card">
          <h2>👋 Welcome, {welcomeUser}!</h2>
          <p>Glad to have you onboard.</p>
          <button
            className="premium-btn"
            onClick={() => setWelcomeUser("")}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
