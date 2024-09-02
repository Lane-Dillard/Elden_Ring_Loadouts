import React from 'react';
import { Link } from 'react-router-dom';
import '/root/workspace/Elden_Ring_Loadouts/src/styles/MainPage.css'

const MainPage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our Website</h1>
      <p>
        This is the homepage of our application. Explore various features like building your loadout, browsing items, and much more!
      </p>
      <div className="home-buttons">
        <Link to="/loadout" className="button">Build Your Loadout</Link>
        <Link to="/login" className="button">Login</Link>
        <Link to="/signUp" className="button">Sign Up</Link>
      </div>
    </div>
  );
};

export default MainPage;
