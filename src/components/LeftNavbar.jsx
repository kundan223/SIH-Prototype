import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../assets/dashboards.png'; 
import Progress from '../assets/Progress.png';   
import Settings from '../assets/settings.png';   

const LeftNavbar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-[#f3ffc5] p-6 text-black">
      <div className="mt-12">
        <ul>
          <li className="mb-4 ml-8">
          <div className='flex'>
          <img src={Dashboard} alt="Dashboard Icon" className="w-6 h-6 mr-2" />
            <Link
              to="/"
              className="text-xl font-extralight text-black hover:text-[#DFECAC]"
            >
              Dashboard
            </Link>
          </div>
          </li>
          <li className="mb-4 ml-8">
          <div className='flex '>
          <img src={Progress} alt="Dashboard Icon" className="w-6 h-6 mr-2" />
            <Link
              to="/tracker"
              className="text-xl font-extralight text-black hover:text-[#DFECAC]"
            >
              Progress Tracker
            </Link>
          </div>
          </li>
          <li className="mb-4 ml-8">
          <div className='flex'>
          <img src={Settings} alt="Dashboard Icon" className="w-6 h-6 mr-2" />
            <Link
              to="/settings"
              className="text-xl font-extralight text-black hover:text-[#DFECAC]"
            >
              Settings
            </Link>
          </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftNavbar;
