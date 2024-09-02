// NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from local storage or cookies
    localStorage.removeItem('eldenRing_user');

    // Redirect to the login page or home page
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Elden Ring Loadouts</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/loadout">Build Your Loadout</Link>
        </li>
        <li>
          <Link to="/user/loadouts">My Loadouts</Link>
        </li>
        {localStorage.getItem('eldenRing_user') ? (
          <li>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signUp">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
