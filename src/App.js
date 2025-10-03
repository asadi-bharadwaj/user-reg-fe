import React, { useState } from "react";
import "./App.css";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleCloseForm = () => {
    setShowRegister(false);
    setFormData({ username: "", email: "", password: "" });
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one special character";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // 🚀 Call backend API (POST /register)
    console.log("Submitting Data:", formData);

    // Reset form
    setFormData({ username: "", email: "", password: "" });
    setErrors({});
    setShowRegister(false);
  };

  return (
    <div className="app-container">
      {!showRegister && (
        <>
          {/* Top-right buttons */}
          <div className="top-right-buttons">
            <button className="premium-btn" onClick={handleRegisterClick}>
              Register
            </button>
            <button className="premium-btn">Login</button>
          </div>

          {/* Centered app name */}
          <h1 className="app-title">project-X</h1>
        </>
      )}

      {showRegister && (
        <div className="form-container">
          {/* Close button */}
          <span className="close-btn" onClick={handleCloseForm}>
            &times;
          </span>

          <h2 className="form-title">Register</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <button type="submit" className="submit-btn">
              Register
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
