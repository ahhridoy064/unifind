import React from "react";

const sectorsData = [
  { title: "Schools", description: "Find schools across all divisions.", link: "schools.html" },
  { title: "Colleges", description: "Discover colleges near you.", link: "colleges.html" },
  { title: "Universities", description: "Explore top universities for higher education.", link: "universities.html" },
  { title: "Medical Centers", description: "Search for trusted healthcare institutions.", link: "medical_centers.html" }
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
                <a href={sector.link} className="btn">Explore</a>
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
