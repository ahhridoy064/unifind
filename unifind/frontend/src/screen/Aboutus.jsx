import React from 'react';
import './AboutUs.css'; // Importing CSS file for styles

const AboutUs = () => {
  const admins = [
    {
      name: "John Doe",
      position: "CEO",
      description: "John is the visionary leader of our company with over 20 years of experience in the industry.",
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Jane Smith",
      position: "CTO",
      description: "Jane is the brain behind our tech innovations and is responsible for all technical strategies.",
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Alice Johnson",
      position: "COO",
      description: "Alice ensures smooth operations and oversees our day-to-day business activities.",
      image: "https://via.placeholder.com/150"
    }
  ];

  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <div className="admins-container">
        {admins.map((admin, index) => (
          <div key={index} className="admin-card">
            <img src={admin.image} alt={admin.name} className="admin-image" />
            <h2>{admin.name}</h2>
            <p className="position">{admin.position}</p>
            <p className="description">{admin.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
