import React from 'react';
import { Link } from 'react-router-dom';

const LeftNavbar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-[#F9FAF5] p-6 text-black">
      <div className="mt-12">
        <ul>
          <li className="mb-4 ml-8">
            <Link
              to="/"
              className="text-xl font-extralight text-black hover:text-[#DFECAC]"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-4 ml-8">
            <Link
              to="/tracker"
              className="text-xl font-extralight text-black hover:text-[#DFECAC]"
            >
              Progress Tracker
            </Link>
          </li>
          <li className="mb-4 ml-8">
            <Link
              to="/settings"
              className="text-xl font-extralight text-black hover:text-[#DFECAC]"
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftNavbar;
