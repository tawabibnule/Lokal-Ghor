import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, LogIn } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar glass-panel">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <Home className="logo-icon" />
          <span className="logo-text">LokalHome</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/seeker" className="nav-link">Find a Home</Link>
          <Link to="/owner" className="nav-link">List Property</Link>
        </div>

        <div className="navbar-actions">
          <Link to="/login" className="btn btn-glass">
            <LogIn size={18} />
            Sign In
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
