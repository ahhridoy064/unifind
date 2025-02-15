import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../FormStyles.css";  

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Login</h2>
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
          <button type="submit" className="submit-btn">Login</button><br/>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="toggle-btn"
          >
            Don't Have an Account? Register
          </button>
          <br/>

          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="toggle-btn"
          >
            Forgot Password?
          </button>
          <br/>
                   
          
        </form>
     
      </div>
    </div>
  );
};

export default Login;
