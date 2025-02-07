import React from "react";

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
            <li><a href="/login" className="btn">Login</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
