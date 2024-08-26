import React from 'react';
import ChartComponent from './ChartComponent.jsx';
import Footer from './Footer.jsx';

const Dashboard = () => {
    const chartData = {
        labels: ['Foundation', 'Superstructure', 'Facade', 'Interiors'],
        datasets: [
            {
                label: 'Progress (%)',
                data: [20, 40, 70, 90], // Example progress data
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.4, // To give a smooth curve to the line chart
            },
        ],
    };

    return (
        <div className="bg-neutral-900 flex flex-col min-h-screen">
            <div className="flex-grow p-5">
                <div className="max-w-7xl mx-auto bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Construction Progress Overview</h2>
                    <ChartComponent data={chartData} />
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Dashboard;
