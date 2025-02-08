
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";



const AuthPage = () => {
  
  const [page, setPage] = useState("login");

  
  const togglePage = (pageName) => {
    setPage(pageName);
  };

  return (
    <div className="auth-container">
      <div className="form-card">
        <h2>{page === "login" ? "Login" : page === "register" ? "Register" : "Forgot Password"}</h2>

        {}
        {page === "login" && <Login />}
        {page === "register" && <Register />}
        {page === "forgotPassword" && <ForgotPassword />}
       
        {}
        {page !== "login" && (
          <button onClick={() => togglePage("login")} className="toggle-btn">
            Already have an account? Login
          </button>
        )}<br/><br/>

        {page !== "register" && (
          <button onClick={() => togglePage("register")} className="toggle-btn">
            Don't have an account? Register
          </button>
        )}<br/><br/>
          
        {page !== "forgotPassword" && (
          <button onClick={() => togglePage("forgotPassword")} className="toggle-btn">
            Forgot Password?
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
