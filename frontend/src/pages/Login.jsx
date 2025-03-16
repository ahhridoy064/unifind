import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Login.css";  

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");


  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // ✅ লগইন সফল হলে টোকেন সেভ করো
      localStorage.setItem("token", data.token);
      navigate("/"); // ✅ হোম পেজে রিডাইরেক্ট
    } else {
      setError(data.message || "Invalid email or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    setError("Something went wrong!");
  }
};

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
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
            <button type="submit" className="submit-btn">Login</button>
            <br />

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="toggle-btn"
            >
              Don't Have an Account? Register
            </button>
            <br />

            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="toggle-btn"
            >
              Forgot Password?
            </button>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;