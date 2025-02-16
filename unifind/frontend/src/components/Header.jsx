import React from 'react'
import '../screen/school.css'
import { Link } from 'react-router-dom';
import AboutUs from './AboutUs';

const Header = () => {
    return (
        <div>
            <header className="header">
                <div className="logo">UNIFIND</div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/medical-centers">Medical Center</Link>
                </nav>
                <input type="text" placeholder="Search..." className="search-bar" />
            </header>
        </div>
    )
}

export default Header