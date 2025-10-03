import React from "react";
import "./App.css";

function App() {
  return (
    <div
      className="app-container" // move inline styles to CSS for cleaner code
    >
      {/* Top-right buttons */}
      <div className="top-right-buttons">
        <button className="premium-btn">Register</button>
        <button className="premium-btn">Login</button>
      </div>

      {/* Centered app name */}
      <h1 className="app-title">project-X</h1>
    </div>
  );
}

export default App;
