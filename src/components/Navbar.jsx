import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#ffffff] p-4 shadow-md"> {/* Updated background color to orange */}
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-white"> {/* Updated text color to white */}
          <Link to="/">YourWebsiteName</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="text-xl font-bold text-white"> {/* Updated text color to white */}
            Dashboard
          </Link>
          <Link to="/tracker" className="text-xl font-bold text-white"> {/* Updated text color to white */}
            Progress Tracker
          </Link>
          <div className='bg-[#D9D9D9] rounded-2xl w-[80px] h-[40px] flex items-center justify-center'>
          <Link to="/demo" className="text-xl font-bold text-[#B09368]"> {/* Added link to Demo */}
            Demo
          </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
