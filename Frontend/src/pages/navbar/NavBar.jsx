import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';  // You can style your navbar here

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo">User-Auth</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/about" className="nav-link">About</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
