import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import MapView from "./MapView";
import projectsData from "../data/projects.json";
import ProjectDetailView from "./ProjectDetailView";
import constructionData from "../data/constructionData.json";
import Footer from "./Footer";
import HeroSection from "./hersection";

// Register the necessary components
Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [showMap, setShowMap] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    setProjects(projectsData);
  }, []);

  const data = {
    labels: ["Foundation", "Superstructure", "Facade", "Interiors"],
    datasets: [
      {
        data: [25, 35, 15, 25],
        backgroundColor: ["#FF6F00", "#F4A261", "#04C7B6", "#9B59B6"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
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
    <div className="min-h-screen flex-col bg-[#F7E8CA] text-[#333333] flex">
      <header className="flex mb-6 p-6">
  <div className="flex-1 flex items-center justify-center">
    <div className="w-60 h-60 relative  flex items-center justify-center">
      <Doughnut data={data} options={options} />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-[#333333]">
        <div className="text-xl">Construction</div>
        <div className="text-3xl font-bold">Progress</div>
      </div>
    </div>
  </div>
  <div className="flex-1 flex items-center justify-center">
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        <div
          className="w-3 h-3 mr-2"
          style={{ backgroundColor: "#FF6F00" }}
        ></div>
        <span>Foundation</span>
      </div>
      <div className="flex items-center mb-2">
        <div
          className="w-3 h-3 mr-2"
          style={{ backgroundColor: "#F4A261" }}
        ></div>
        <span>Superstructure</span>
      </div>
      <div className="flex items-center mb-2">
        <div
          className="w-3 h-3 mr-2"
          style={{ backgroundColor: "#04C7B6" }}
        ></div>
        <span>Facade</span>
      </div>
      <div className="flex items-center">
        <div
          className="w-3 h-3 mr-2"
          style={{ backgroundColor: "#9B59B6" }}
        ></div>
        <span>Interiors</span>
      </div>
    </div>
  </div>
</header>


      <div className="flex justify-between items-center mb-6 px-6">
        <div className="relative overflow-hidden">
          <button
            className="bg-[#04C7B6] text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
            onClick={handleBackToProjectList}
          >
            Project View
          </button>
        </div>
        <div className="relative overflow-hidden ml-4">
          <button
            className="bg-[#04C7B6] text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
            onClick={() => setShowMap(true)}
          >
            Map View
          </button>
        </div>
      </div>

      <div className="flex-grow px-6 pb-10">
        {showMap ? (
          <MapView data={constructionData} />
        ) : showProjectDetail && selectedProject ? (
          <ProjectDetailView
            locationName={selectedProject.name}
            stage={selectedProject.stage}
          />
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-xl text-[#333333]">Project List</h2>
              <div className="mt-4">
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-4 p-6 scale-95 bg-[#E0E0E0] rounded transition-transform transform hover:scale-100 hover:shadow-lg cursor-pointer"
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="text-lg font-semibold">
                        {project.name}
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm mr-4">{project.stage}</div>
                        <div
                          className={`w-4 h-4 rounded-full ${
                            project.status === "not_progressing"
                              ? "bg-red-600"
                              : project.status === "incomplete_lazy"
                              ? "bg-yellow-600"
                              : "bg-green-600"
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-600">Loading projects...</div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg text-[#333333] font-semibold">Notes:</h3>
              <ul>
                <li className="text-green-600 font-semibold">
                  Green: No attention needed, consistent progress
                </li>
                <li className="text-yellow-600 font-semibold">
                  Yellow: Inconsistent progress, needs monitoring
                </li>
                <li className="text-red-600 font-semibold">
                  Red: No progress for 7 days, needs attention
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      
      <Footer className="mt-12" />
    </div>
  );
};

export default Dashboard;
