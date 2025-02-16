// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SchoolPage from './screen/school';
import MedicalCenterPage from './screen/medicalcentre';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SchoolPage />} />
        <Route path="/medical-centers" element={<MedicalCenterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

