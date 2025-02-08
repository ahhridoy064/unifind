import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../FormStyles.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };

  return (
    <div className="form-container">
      <div className="form-card">
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
        {}
          {}
        {}
      </div>
    </div>
  );
};

export default ForgotPassword;
