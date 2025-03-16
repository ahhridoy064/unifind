import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../pages/ResetPassword.css';

const SetNewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // Forgot Password page থেকে email আসবে

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        newPassword,
      });

      if (response.data.success) {
        alert("Password updated successfully! Please login.");
        navigate("/login");
      } else {
        setError("Failed to reset password. Try again.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="reset-password-body">
      <div className="reset-password-container">
        <div className="reset-password-card">
          <h2>Set New Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn">Reset Password</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
