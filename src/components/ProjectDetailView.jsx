import React from 'react';
import projectData from '../data/ProjectDetailData.json'; // Adjust the path as necessary

const ProjectDetailView = ({ locationName, stage }) => {
  // Find the relevant project data
  const project = projectData.find(p => p.name === locationName && p.stage === stage);

  if (!project) {
    return <div className="bg-white p-6 text-gray-800">Project not found</div>;
  }

  const { monthData } = project;

  // Divide monthData into chunks representing four months (assuming 30 days per month)
  const months = [
    monthData.slice(0, 30),  // Month 1
    monthData.slice(30, 60), // Month 2
    monthData.slice(60, 90), // Month 3
    monthData.slice(90, 120), // Month 4
  ];

  // Calculate the total completed days across all months
  const completedDays = monthData.filter(day => day.status === 'done').length;
  const totalDays = monthData.length;
  const progressPercentage = (completedDays / totalDays) * 100;

  // Stage titles and thresholds for the progress bar
  const stageTitles = ["stage 1", "stage 2", "stage 3", "stage 4"];
  const stageThresholds = [25, 50, 75, 100];

  return (
    <div className="bg-white p-6 text-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-teal-500">
          {locationName} - {stage}
        </h2>
      </div>

      {/* Progress Info */}
      <div className="mb-4">
        <span className="text-xl font-semibold">Overall Progress:</span>
        <span className="ml-2 text-lg text-teal-600">
          {progressPercentage.toFixed(2)}% done
        </span>
      </div>

      Combined Step Progress Bar
      <div className="relative mb-6">
        <div className="absolute top-5 left-0 w-full h-2 bg-gray-300 z-0">
          <div
            className="h-2 bg-teal-500"
            style={{
              width: `${Math.min(progressPercentage, 100)}%`
            }}
          ></div>
        </div>

        <div className="flex justify-between items-center relative">
          {stageTitles.map((title, index) => {
            const stageProgress = stageThresholds[index];
            const isActive = progressPercentage >= stageProgress;

            return (
              <div key={index} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-12 h-11 rounded-full flex items-center justify-center text-white ${
                    isActive ? 'bg-teal-500' : 'bg-gray-300'
                  }`}
                >
                  {index + 1}
                </div>
                <span className={`mt-2 text-sm ${isActive ? 'text-teal-600' : 'text-gray-600'}`}>
                  {title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Render Calendars for All Four Months */}
      <h3 className="text-xl mb-4 text-teal-600">Monthly Progress Status</h3>
      <div className="flex justify-between mb-8">
        {months.map((month, monthIndex) => {
          // Calculate monthly progress for each month
          const completedDaysInMonth = month.filter(day => day.status === 'done').length;
          const totalDaysInMonth = month.length;
          const monthProgress = (completedDaysInMonth / totalDaysInMonth) * 100;

          return (
            <div
              key={monthIndex}
              className="w-1/4 bg-neutral-900 border border-gray-700 shadow-lg rounded-lg p-4 mx-2"  // Added styling for the box
            >
              <h4 className="text-lg font-semibold text-center mb-4 text-white">
                Month {monthIndex + 1} - {monthProgress.toFixed(2)}% done
              </h4>
              <div className="grid grid-cols-7 gap-1 mb-6"> {/* Reduced gap */}
                {month.map((day, index) => (
                  <div
                    key={index}
                    className={`p-1 rounded text-white text-center text-sm w-8 h-8 flex items-center justify-center ${
                      day.status === 'done' ? 'bg-teal-500' : 'bg-orange-500'
                    }`}
                  >
                    {day.date}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-4 mb-6">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-teal-500 mr-2 rounded-full"></div>
          <span className="text-gray-700">Work Done</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-orange-500 mr-2 rounded-full"></div>
          <span className="text-gray-700">Not Done</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailView;
