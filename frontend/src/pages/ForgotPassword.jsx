


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import '../pages/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const sendOtp = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      const response = await axios.post("http://localhost:5000/api/auth/send-otp", { email });
      if (response.data.success) {
        setIsOtpSent(true);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });
      if (response.data.success) {
        navigate("/set-new-password", { state: { email } }); 
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="forgot-password-body">
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <h2>Forgot Password</h2>

          {!isOtpSent ? (
            
            <form onSubmit={sendOtp}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="submit-btn">Send OTP</button>
            </form>
          ) : (
    
            <form onSubmit={verifyOtp}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="submit" className="submit-btn">Verify OTP</button>
            </form>
          )}

          {error && <p className="error">{error}</p>}

          
          <div className="links">
            <Link to="/login" className="toggle-btn">Back to Login</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;



