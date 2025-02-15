import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sectors from '../components/Sectors';
import Schools from '../pages/school';
import SchoolProfile from '../pages/schoolProfile'; // Added SchoolProfile
import Colleges from '../pages/college';
import CollegeProfile from '../pages/collegeProfile'; // Added CollegeProfile
import Universities from '../pages/university';
import UniversityProfile from '../pages/universityProfile'; // Added UniversityProfile
import MedicalCenters from '../pages/medicalcenter';
import MedicalCenterProfile from '../pages/medicalcenterProfile'; // Added MedicalCenterProfile
import Header from '../components/header';
import Footer from '../components/footer';
import HeroSection from '../components/Herosection';
import '../pages/Home.css';
 import Login from '../pages/Login';
 import Register from '../pages/Register';
 import ForgotPassword from '../pages/ForgotPassword';





const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <Routes>
        <Route path="/" element={<Sectors />} />

        {/* School Routes */}
        <Route path="/school" element={<Schools />} />
        <Route path="/school/:id" element={<SchoolProfile />} />

        {/* College Routes */}
        <Route path="/college" element={<Colleges />} />
        <Route path="/college/:id" element={<CollegeProfile />} />

        {/* University Routes */}
        <Route path="/university" element={<Universities />} />
        <Route path="/university/:id" element={<UniversityProfile />} />

        {/* Medical Center Routes */}
        <Route path="/medicalcenter" element={<MedicalCenters />} />
        <Route path="/medicalcenter/:id" element={<MedicalCenterProfile />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>

      <Footer />
    </>
  );
};

export default Home;
