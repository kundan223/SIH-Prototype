import React from 'react';
import projectData from '../data/ProjectDetailData.json'; // Adjust the path as necessary

const ProjectDetailView = ({ locationName, stage }) => {
  // Find the relevant project data
  const project = projectData.find(p => p.name === locationName && p.stage === stage);

  if (!project) {
    return <div className="bg-gray-900 p-6 text-white">Project not found</div>;
  }

  const { monthData } = project;

  // Extract the month from the first entry in monthData
  const currentMonth = monthData.length > 0 ? monthData[0].month : 'N/A';
  
  const totalDays = monthData.length;
  const completedDays = monthData.filter(day => day.status === 'done').length;
  const progressPercentage = (completedDays / totalDays) * 100;

  return (
    <div className="bg-gray-900 p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {locationName} - {stage}
        </h2>
        <span className="text-2xl font-bold text-gray-400">{currentMonth}</span>
      </div>
      
      <div className="mb-4">
        <span className="text-xl font-semibold">Progress:</span>
        <span className="ml-2 text-lg">
          {progressPercentage.toFixed(2)}% done
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-6 h-4 bg-gray-600">
        <div
          className="absolute top-0 left-0 h-full bg-blue-600"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <h3 className="text-xl mb-4">Working Day status</h3>
      <div className="grid grid-cols-7 gap-2 mb-6">
        {monthData.map((day, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              day.status === 'done' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {day.date}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-4 mb-6">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-green-600 mr-2 rounded-full"></div>
          <span>Work Done</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-red-600 mr-2 rounded-full"></div>
          <span>Not Done</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailView;
