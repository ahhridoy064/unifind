import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Frontpage from '../components/frontpage';
import Schools from '../pages/school';
import SchoolProfile from '../pages/schoolProfile'; 
import Colleges from '../pages/college';
import CollegeProfile from '../pages/collegeProfile'; // Added CollegeProfile
import Universities from '../pages/university';
import UniversityProfile from '../pages/universityProfile'; // Added UniversityProfile
import MedicalCenters from '../pages/medicalcenter';
import MedicalCenterProfile from '../pages/medicalcenterProfile'; // Added MedicalCenterProfile
import '../pages/Home.css';
 import Login from '../pages/Login';
 import Register from '../pages/Register';
 import ForgotPassword from '../pages/ForgotPassword';
 import { allpageProvider} from '../context/context.js'





const Home = () => {

  const [school, setschool] = useState(null)
  const [ college, setCollege] = useState(null);
  const [university, setUniversity] = useState(null);
  const [medical, setMedical] = useState(null);

  return (
    <>

     <allpageProvider.Provider value={{school , setschool,college, setCollege,university, setUniversity,medical, setMedical}}>

      <Routes>

        <Route path="/" element={<Frontpage />} />

        {/* School Routes */}
        <Route path="/school" element={<Schools />} />
        <Route path="/school/details" element={<SchoolProfile />} />

        {/* College Routes */}
        <Route path="/college" element={<Colleges />} />
        <Route path="/college/details" element={<CollegeProfile />} />

        {/* University Routes */}
        <Route path="/university" element={<Universities />} />
        <Route path="/university/details" element={<UniversityProfile />} />

        {/* Medical Center Routes */}
        <Route path="/medicalcenter" element={<MedicalCenters />} />
        <Route path="/medical/details" element={<MedicalCenterProfile />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        
      </Routes>

      
      </allpageProvider.Provider> 
    </>
  );
};

export default Home;
