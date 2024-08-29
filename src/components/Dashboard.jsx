import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import MapView from './MapView'; // Import the MapView component
import projectsData from '../data/projects.json'; // Import the JSON data directly
import ProjectDetailView from './ProjectDetailView'; // Import the ProjectDetailView component
import Footer from './Footer'; // Import the Footer component

// Register the necessary components
Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [showMap, setShowMap] = useState(false); // State to toggle between ProjectList and MapView
  const [projects, setProjects] = useState([]); // State to store projects data
  const [showProjectDetail, setShowProjectDetail] = useState(false); // State to toggle ProjectDetailView
  const [selectedProject, setSelectedProject] = useState(null); // State to store selected project

  useEffect(() => {
    // Since the data is static and imported, just set it directly
    setProjects(projectsData);
  }, []);

  const data = {
    labels: ['Foundation', 'Superstructure', 'Facade', 'Interiors'],
    datasets: [
      {
        data: [25, 35, 15, 25], // Example data distribution
        backgroundColor: ['#e86f6f', '#e6c146', '#04c7b6', '#9b59b6'], // Colors for each segment
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowProjectDetail(true);
  };

  const handleBackToProjectList = () => {
    setShowProjectDetail(false);
    setShowMap(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="flex justify-between items-center mb-6 p-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome Raj</h1>
        </div>
        <div className="w-60 h-60 relative"> {/* Increased size */}
          <Doughnut data={data} options={options} />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white">
            <div className="text-xl">Construction</div>
            <div className="text-3xl font-bold">Progress</div>
          </div>
        </div>
      </header>

      {/* Legend below the pie chart with increased font size */}
      <div className="flex justify-center items-center mb-6 text-base"> {/* Updated from text-xs to text-base */}
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 mr-1" style={{ backgroundColor: '#e86f6f' }}></div>
          <span>Foundation</span>
        </div>
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 mr-1" style={{ backgroundColor: '#e6c146' }}></div>
          <span>Superstructure</span>
        </div>
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 mr-1" style={{ backgroundColor: '#04c7b6' }}></div>
          <span>Facade</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 mr-1" style={{ backgroundColor: '#9b59b6' }}></div>
          <span>Interiors</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 px-6">
        <button
          className="bg-gray-700 px-4 py-2 rounded"
          onClick={handleBackToProjectList}
        >
          Project View
        </button>
        <button className="bg-gray-700 px-4 py-2 rounded" onClick={() => setShowMap(true)}>
          Map View
        </button>
      </div>

      <div className="flex-grow px-6 pb-10"> {/* Added padding-bottom */}
        {showMap ? (
          <MapView /> // Display the MapView component if showMap is true
        ) : showProjectDetail && selectedProject ? (
          <ProjectDetailView
            locationName={selectedProject.name} // Pass the selected project's name as the location name
            stage={selectedProject.stage} // Pass the selected project's stage number
          />
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-xl">Project List</h2>
              <div className="mt-4">
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-4 p-4 bg-gray-800 rounded"
                      onClick={() => handleProjectClick(project)} // Set selected project on click
                    >
                      <div className="text-lg font-semibold">{project.name}</div>
                      <div className="flex items-center">
                        <div className="text-sm mr-4">{project.stage}</div>
                        <div
                          className={`w-4 h-4 rounded-full ${
                            project.status === 'not_progressing'
                              ? 'bg-red-500'
                              : project.status === 'incomplete_lazy'
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">Loading projects...</div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg">Notes:</h3>
              <ul>
                <li className="text-green-500">Green: No attention needed, consistent progress</li>
                <li className="text-yellow-500">Yellow: Inconsistent progress, needs monitoring</li>
                <li className="text-red-500">Red: No progress for 7 days, needs attention</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer now fixed at the bottom with margin-top */}
      <Footer className="mt-12" /> {/* Added margin-top to create space between content and footer */}
    </div>
  );
};

export default Dashboard;
