import React from 'react';
import './medicalcentre.css';
import Header from '../components/Header';

const MedicalCenterPage = () => {
  const medicalCenters = [
    {
      name: "Dhaka Medical College Hospital",
      division: "Dhaka Division",
      location: "Dhaka, Bangladesh",
      contact: "02-9572342",
      website: "http://www.dmc.edu.bd"
    },
    {
      name: "Chittagong Medical College Hospital",
      division: "Chittagong Division",
      location: "Chittagong, Bangladesh",
      contact: "031-651112",
      website: "https://cmchbd.org"
    },
    {
      name: "Rajshahi Medical College Hospital",
      division: "Rajshahi Division",
      location: "Rajshahi, Bangladesh",
      contact: "0721-761405",
      website: "https://www.rmchbd.org"
    },
    {
      name: "Khulna Medical College Hospital",
      division: "Khulna Division",
      location: "Khulna, Bangladesh",
      contact: "041-731146",
      website: "https://www.khulnamedicalcollege.com"
    },
    {
      name: "Sylhet Osmani Medical College Hospital",
      division: "Sylhet Division",
      location: "Sylhet, Bangladesh",
      contact: "0821-715261",
      website: "https://www.somch.edu.bd"
    },
    {
      name: "Barisal Sher-E-Bangla Medical College Hospital",
      division: "Barisal Division",
      location: "Barisal, Bangladesh",
      contact: "0431-620018",
      website: "http://www.bsmc.ac.bd"
    },
    {
      name: "Mymensingh Medical College Hospital",
      division: "Mymensingh Division",
      location: "Mymensingh, Bangladesh",
      contact: "091-61388",
      website: "https://www.mmch.edu.bd"
    },
    {
      name: "Rangpur Medical College Hospital",
      division: "Rangpur Division",
      location: "Rangpur, Bangladesh",
      contact: "0521-63446",
      website: "https://www.rmchbd.org"
    },
    {
      name: "Comilla Medical College Hospital",
      division: "Chittagong Division",
      location: "Comilla, Bangladesh",
      contact: "081-722236",
      website: "https://www.cmch.edu.bd"
    },
    {
      name: "Jessore Medical College Hospital",
      division: "Khulna Division",
      location: "Jessore, Bangladesh",
      contact: "0421-63498",
      website: "http://www.jmc.edu.bd"
    }
  ];

  return (
    <div className="medical-center-page">
      <Header />
      <h1>Medical Centers in Bangladesh</h1>
      <div className="medical-center-grid">
        {medicalCenters.map((center, index) => (
          <div key={index} className="medical-center-card">
            <h2>{center.name}</h2>
            <p><strong>Division:</strong> {center.division}</p>
            <p><strong>Location:</strong> {center.location}</p>
            <p><strong>Contact:</strong> {center.contact}</p>
            <a href={center.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalCenterPage;
