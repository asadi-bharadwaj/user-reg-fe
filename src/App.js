import React, { useState } from "react";
import "./App.css";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccessCard, setShowSuccessCard] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        setFormData({ username: "", email: "", password: "" }); // reset form
        setShowRegister(false);
        setShowSuccessCard(true); // show success card
      } else {
        const errorMsg = await response.text();
        setError(errorMsg || "Registration failed ❌");
      }
    } catch (err) {
      setError("Server not reachable. Try again later.");
    }
  };

  return (
    <div className="app-container">
      {/* Top-right buttons */}
      <div className="top-right-buttons">
        {!showRegister && !showSuccessCard && (
          <>
            <button className="premium-btn" onClick={() => setShowRegister(true)}>
              Register
            </button>
            <button className="premium-btn">Login</button>
          </>
        )}
      </div>

      {/* Title */}
      {!showRegister && !showSuccessCard && <h1 className="app-title">project-X</h1>}

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

          {/* Error message */}
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
    </div>
  );
}

export default App;
