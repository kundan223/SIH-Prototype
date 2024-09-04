import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProgressTracker from './components/ProgressTracker';
import HeroSection from './components/hersection';
import RedirectToExternal from './components/RedirectToExternal'; // Import the Redirect component

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/tracker" element={<ProgressTracker />} />
          <Route path="/demo" element={<RedirectToExternal />} /> {/* Route for external redirect */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
