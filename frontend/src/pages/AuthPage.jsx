

import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import SetNewPassword from "./SetNewPassword";  


const AuthPage = () => {
 
  return (
    <div className="auth-container">
 
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="set-new-password" element={<SetNewPassword />} /> 
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
 
  );
};

export default AuthPage;

