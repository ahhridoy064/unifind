import React from 'react';
import Reviews from './Reviews'; // Assuming you already have the Reviews component
import { Link } from 'react-router-dom'; // For navigation

function CollegePage({ college }) {
  return (
    <div className="college-page-container">
      <div className="college-header">
        <div className="college-logo-container">
          <img
            src={college.logo}
            alt={college.name}
            className="college-logo"
          />
        </div>
        <div className="college-info">
          <h1 className="college-name">{college.name}</h1>
          <p className="college-location">{college.location}</p>
          <p className="college-type">{college.type}</p>
          <p className="college-rank">Rank: {college.rank}</p>
        </div>
      </div>

      <div className="college-details">
        <h2>Programs Offered</h2>
        <ul>
          {college.programs.map((program, index) => (
            <li key={index} className="program-item">
              {program}
            </li>
          ))}
        </ul>

        <h3>Contact Information</h3>
        <p>Website: <a href={college.website}>{college.website}</a></p>
        <p>Email: {college.email}</p>
        <p>Phone: {college.phone}</p>
        
        <div className="map-container">
          {/* Embedded Google Map (replace with actual embed link) */}
          <iframe 
            src={`https://www.google.com/maps/embed/v1/place?q=${college.location}&key=YOUR_GOOGLE_MAPS_API_KEY`}
            width="600" height="450" frameBorder="0" style={{border:0}} allowFullScreen=""
            aria-hidden="false" tabIndex="0"></iframe>
        </div>
      </div>

      <div className="college-reviews">
        <Reviews reviews={college.reviews} />
      </div>

      <Link to="/apply" className="apply-button">Apply Now</Link>
    </div>
  );
}

export default CollegePage;
