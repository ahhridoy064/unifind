import React from "react";
import { Link } from "react-router-dom";

const sectorsData = [
  { title: "Schools", description: "Find schools across all divisions.", link: "/school" },
  { title: "Colleges", description: "Discover colleges near you.", link: "/college" },
  { title: "Universities", description: "Explore top universities for higher education.", link: "/university" },
  { title: "Medical Centers", description: "Search for trusted healthcare institutions.", link: "/medicalcenter" }
];

const Sectors = () => {
  return (
    <>
      <section id="sectors" className="sectors">
        <div className="container">
          <h3>Explore Sectors</h3>
          <div className="cards">
            {sectorsData.map((sector, index) => (
              <div className="card" key={index}>
                <h4>{sector.title}</h4>
                <p>{sector.description}</p>
                <Link to={sector.link} className="btn">Explore</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="about" className="about-us">
        <div className="container">
          <h3>About Us</h3>
          <p>
            UNIFIND is a vibrant platform connecting you to the best educational institutions and 
            medical facilities across Bangladesh. Our mission is to simplify your search with 
            a user-friendly interface and comprehensive, up-to-date information.
          </p>
        </div>
      </section>
    </>
  );
};

export default Sectors;