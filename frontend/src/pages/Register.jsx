



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages/Register.css";  

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });

      if (response.data.success) {
        alert("Registration successful! Redirecting to Login...");
        navigate("/login"); 
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response) {
      
    
        setError(`Server error: ${err.response.data.message || err.response.statusText}`);
      } else if (err.request) {
        
        setError("No response from server");
      } else {
    
        setError("Error setting up registration request. Please try again.");
      }
    }
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
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;