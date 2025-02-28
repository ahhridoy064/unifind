import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Register.css";  // Import the scoped CSS file

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <div className="register-card">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn">Register</button>
            <br />

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="toggle-btn"
            >
              Already Have an Account? Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;