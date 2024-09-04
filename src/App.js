import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProgressTracker from './components/ProgressTracker';
import HeroSection from './components/hersection';
import RedirectToExternal from './components/RedirectToExternal';
import LeftNavbar from './components/LeftNavbar';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Router>
      <div className="min-h-screen flex">
        {/* Left Navbar */}
        <div className="w-64">
          <LeftNavbar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 ">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tracker" element={<ProgressTracker />} />
            <Route path="/demo" element={<RedirectToExternal />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
