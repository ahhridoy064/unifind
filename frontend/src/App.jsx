// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SchoolPage from './screen/school';
function App() {
  return (

    <BrowserRouter>
        <Routes>
          <Route path="/" element={<SchoolPage />} />
          
        </Routes>
    </BrowserRouter>
  );
}

export default App;
