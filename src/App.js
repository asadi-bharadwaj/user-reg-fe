import React, { useState } from "react";
import "./App.css";

function App() {
  const [showRegister, setShowRegister] = useState(false);

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleCloseForm = () => {
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
          <form className="register-form">
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
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
