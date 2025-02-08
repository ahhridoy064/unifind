import React, { useState } from "react";

import { BrowserRouter , Route, Routes } from "react-router-dom";
import AuthPage from "./Components/AuthPage";



//import "./App.css";
//import { BrowserRouter } from "react-router-dom";

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} /> {}
      </Routes>
   </BrowserRouter>

  );
}

export default App;


