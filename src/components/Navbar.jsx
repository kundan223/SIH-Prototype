import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-yellow-400 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">YourWebsiteName</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="text-xl font-bold">Dashboard</Link>
          <Link to="/tracker" className="text-xl font-bold">Progress Tracker</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
