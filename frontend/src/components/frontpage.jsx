import React from "react";
import { Link } from "react-router-dom";

// Header Component
const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1>UNIFIND</h1>
          <p>Discover the best institutions in Bangladesh</p>
        </div>
        <nav>
          <ul>
            <li><a href="#sectors">Sectors</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><Link to="/Login" className="btn">Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// HeroSection Component
const HeroSection = () => {
  return (
    <section className="hero">
      <section className="content">
        <h2>Find Your Path to Excellence</h2>
        <p>Explore schools, colleges, universities, and medical centers with ease and precision.</p>
        <a href="#sectors" className="btn">Get Started</a>
      </section>
    </section>
  );
};

// Sectors Component
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

// Footer Component
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>&copy; 2025 UNIFIND. All Rights Reserved.</p>
        <div className="socials">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Sectors />
      <Footer />
    </div>
  );
};

export default App;
