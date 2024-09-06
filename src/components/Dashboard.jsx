import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import MapView from "./MapView";
import projectsData from "../data/projects.json";
import ProjectDetailView from "./ProjectDetailView";
import constructionData from "../data/constructionData.json";
import Footer from "./Footer";
import HeroSection from "./hersection";
import Building from "../assets/building.png"


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
    labels: ["Foundation", "Superstructure", "Masonary work ", "Interiors"],
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
    <div className="min-h-screen flex-col bg-white text-[#333333] flex">
      <div className="rounded-3xl bg-gradient-to-r bg-[#f3ffc5b7] m-6 ">
      <header className="flex mb-6 p-6 mt-[60px]">
  
      <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col space-y-6 p-6 bg-gradient-to-b rounded-lg">
  <div className="flex items-center group">
    <div
      className="w-10 h-10 mr-4 flex-shrink-0 rounded-full border-2 border-orange-400 bg-orange-200 group-hover:bg-orange-300 transition-colors"
    ></div>
    <span className="text-2xl font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
      Foundation
    </span>
  </div>
  <div className="flex items-center group">
    <div
      className="w-10 h-10 mr-4 flex-shrink-0 rounded-full border-2 border-teal-400 bg-teal-200 group-hover:bg-teal-300 transition-colors"
    ></div>
    <span className="text-2xl font-medium text-gray-700 group-hover:text-teal-600 transition-colors">
      Superstructure
    </span>
  </div>
  <div className="flex items-center group">
    <div
      className="w-10 h-10 mr-4 flex-shrink-0 rounded-full border-2 border-orange-600 bg-orange-400 group-hover:bg-orange-500 transition-colors"
    ></div>
    <span className="text-2xl font-medium text-gray-700 group-hover:text-orange-800 transition-colors">
      Masonry work
    </span>
  </div>
  <div className="flex items-center group">
    <div
      className="w-10 h-10 mr-4 flex-shrink-0 rounded-full border-2 border-purple-400 bg-indigo-200 group-hover:bg-purple-300 transition-colors"
    ></div>
    <span className="text-2xl font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
      Interiors
    </span>
  </div>
</div>

</div>

<div className="flex-1 flex items-center justify-center">
  <div
    className="w-80 h-80 relative flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: "url('SIH-Prototype\src\assets\building.png')" }}
  >
    <Doughnut data={data} options={options} />
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-[#333333]">
      <div className="text-xl">Construction</div>
      <div className="text-3xl font-bold">Progress</div>
    </div>
  </div>
</div>

</header>
      </div>

{/* code for the add project 
 */}
      <div className="rounded-full m-6 bg-transparent border-gray-400 border-2 p-4 flex flex-row items-center hover:bg-green-100">
  <p className="text-[#BCB96C] text-4xl font-extrabold mr-2">+</p>
  <input
    type="text"
    placeholder="Add Project"
    className="bg-transparent text-[#BCB96C] focus:outline-none ml-2"
  />
</div>


      {/* buttons code  */}

        
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

      {/* line */}

      <div>
        <div className="justify-center x-2 flex-row flex ">
        <p className="font-extrabold text-[32px] flex-1 mx-6">
          Name
        </p>
        <p className="font-extrabold text-[32px] mx-6 flex-1">
          Progress 
        </p>
        <p className="font-extrabold text-[32px] mx-6 flex-1">
          Stage 
        </p>
        
        </div>
      <div className="border m-6 bg-slate-300"></div>
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
             
              <div className="mt-4">
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-4 py-2 scale-100 rounded transition-transform transform hover:scale-98 hover:shadow-lg cursor-pointer"
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="flex w-full ">
  <div className="text-lg font-semibold flex-1  ">
    {project.name}
  </div>
  <div className="flex-1 bg-white p-2">
  <div className="w-full bg-gray-200 rounded-full h-4">
    <div
      className="bg-[#DFECAC] h-4 rounded-full"
      style={{ width: '50%' }} // Adjust the width percentage to simulate progress
    ></div>
  </div>
</div>

  <div className="flex items-center flex-1 ml-[80px]">
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

                    </div>
                  ))
                ) : (
                  <div className="text-gray-600">Loading projects...</div>
                )}
              </div>
            </div>

            {/* <div className="mt-8">
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
            </div> */}
          </div>
        )}
      </div>
      
      {/* <Footer className="mt-12" /> */}
    </div>
  );
};

export default Dashboard;
