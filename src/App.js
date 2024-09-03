import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ProgressTracker from './components/ProgressTracker';
import Demo from './components/Demo'; // Import the Demo component

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tracker" element={<ProgressTracker />} />
          <Route path="/demo" element={<Demo />} /> {/* Added route for Demo component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

