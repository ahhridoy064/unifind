import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../pages/ForgotPassword.css';  // Import the scoped CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
  };

  return (
    <div className="forgot-password-body">
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn">Reset Password</button>
          </form>
          <div className="links">
            <Link to="/login" className="toggle-btn">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;