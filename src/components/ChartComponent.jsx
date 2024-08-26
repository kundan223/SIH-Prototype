import React, { useRef, useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement, LineController } from 'chart.js';
import chartData from '../data/progressData.json'; // Import JSON data

// Register necessary components including LineController
Chart.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement, LineController);

const ChartComponent = () => {
    const chartRef = useRef(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        // Set chart data from JSON file
        setData(chartData);

        const ctx = chartRef.current.getContext('2d');

        if (ctx) {
            if (ctx.chart) {
                ctx.chart.destroy();
            }

            const chart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    size: 14,
                                    weight: 'bold',
                                },
                            },
                        },
                        tooltip: {
                            callbacks: {
                                label: (tooltipItem) => `${tooltipItem.raw}%`,
                            },
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                stepSize: 20,
                                callback: (value) => `${value}%`,
                            },
                        },
                        x: {
                            beginAtZero: true,
                        },
                    },
                },
            });

            ctx.chart = chart;
        }

        return () => {
            if (ctx.chart) {
                ctx.chart.destroy();
            }
        };
    }, [data]);

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="relative h-[500px] w-full overflow-hidden">
                <canvas ref={chartRef} className="h-full w-full" />
            </div>
        </div>
    );
};

export default ChartComponent;
