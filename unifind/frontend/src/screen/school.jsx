// src/SchoolPage.js

import React, { useEffect, useState } from 'react';
import './school.css'
import { Link } from 'react-router-dom';
import Header from '../components/Header';


const schools = [
  {
    id: 1,
    name: "Rajshahi Government School",
    type: "Secondary",
    rating: 4,
    address: "Rajshahi, Bangladesh",
    description: "A renowned secondary school offering a variety of subjects.",
    contact: "0987654321",
  },
  {
    id: 2,
    name: "Rajshahi International School",
    type: "Secondary",
    rating: 5,
    address: "Rajshahi, Bangladesh",
    description: "An international school with high academic standards.",
    contact: "0123456789",
  },
  {
    id: 2,
    name: "Rajshahi International School",
    type: "Secondary",
    rating: 5,
    address: "Rajshahi, Bangladesh",
    description: "An international school with high academic standards.",
    contact: "0123456789",
  },
  {
    id: 2,
    name: "Rajshahi International School",
    type: "Secondary",
    rating: 5,
    address: "Rajshahi, Bangladesh",
    description: "An international school with high academic standards.",
    contact: "0123456789",
  },

];

const SchoolPage = () => {
  const [selectedDivision, setSelectedDivision] = useState("Rajshahi");
  const [School, setSchool] = useState([])
  useEffect(() => {
    setSchool(schools)
  }, [])
  useEffect(() => {
    setSchool([
      {
        id: 1,
        name: `${selectedDivision} Government School,${selectedDivision}`,
        type: "Secondary",
        rating: 4,
        address: `${selectedDivision}, Bangladesh`,
        description: "A renowned secondary school offering a variety of subjects.",
        contact: "0987654321",
      },
      {
        id: 2,
        name: ` ${selectedDivision} International School, ${selectedDivision}`,
        type: "Secondary",
        rating: 5,
        address: `${selectedDivision}, Bangladesh`,
        description: "An international school with high academic standards.",
        contact: "0123456789",
      },
      {
        id: 3,
        name: `Police Lines School,${selectedDivision}`,
        type: "Secondary",
        rating: 5,
        address: `${selectedDivision}, Bangladesh`,
        description: "An international school with high academic standards.",
        contact: "0123456789",
      },
      {
        id: 4,
        name: `Cantonment Public School,${selectedDivision}`,
        type: "Secondary",
        rating: 5,
        address: `${selectedDivision}, Bangladesh`,
        description: "An international school with high academic standards.",
        contact: "0123456789",
      },
      {
        id: 5,
        name: ` Border Guard School,${selectedDivision}`,
        type: "Secondary",
        rating: 5,
        address: `${selectedDivision}, Bangladesh`,
        description: "An international school with high academic standards.",
        contact: "0123456789",
      },



    ]
    )
  }, [selectedDivision])

  const handleDivisionChange = (event) => {
    setSelectedDivision(event.target.value);
  };

  return (
    <div className="school-page">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        <h1>Schools in {selectedDivision}</h1>

        {/* Division Dropdown */}
        <div className="division-dropdown">
          <label>Choose a Division: </label>
          <select onChange={handleDivisionChange}>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chittagong">Chittagong</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Khulna">Khulna</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Barishal">Barishal</option>


            {/* Add all other divisions */}
          </select>
        </div>

        {/* School Listings */}
        <div className="school-list">
          {School.map((school) => (
            <div key={school.id} className="school-card">
              <h3>{school.name}</h3>
              <p>Rating: {'★'.repeat(school.rating)}</p>
              <p>Type: {school.type}</p>
              <p>Address: {school.address}</p>
              <button className="view-details">View Details</button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer>
        <p>Contact Info | Social Links</p>
        <p>Privacy Policy | Terms of Use</p>
      </footer>
    </div>
  );
};

export default SchoolPage;
