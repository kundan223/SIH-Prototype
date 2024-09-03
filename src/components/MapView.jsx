import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import indiaGeojson from '../data/StatesGeojsonIndia.json'; // Ensure the path is correct

const ConstructionMap = ({ data }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Clear previous SVG if any
    d3.select(mapContainer.current).selectAll('*').remove();

    const width = 800;
    const height = 600;

    const svg = d3.select(mapContainer.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const projection = d3.geoMercator()
      .center([78.9629, 20.5937])  // Center on India
      .scale(1000)                 // Adjust this scale as needed
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    svg.selectAll('path')
      .data(indiaGeojson.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('stroke', 'black')
      .attr('fill', d => {
        const region = d.properties.NAME_1; // Use NAME_1 to get the state name
        console.log("Region:", region); // Log the region name to confirm
        const activity = data[region];
        console.log("Activity:", activity); // Log the activity based on the region

        // Color logic
        if (activity === 'not_progressing') {
          return 'red';
        } else if (activity === 'incomplete_lazy') {
          return 'yellow';
        } else if (activity === 'progressing_fine') {
          return 'green';
        } else {
          return 'gray';  // Default color for regions with no data
        }
      })
      .attr('fill-opacity', 0.7);

    // Clean up SVG on component unmount
    return () => {
      svg.remove();
    };
  }, [data]);

  return <div ref={mapContainer} style={{ height: '100vh', width: '100%' }} />;
};

export default ConstructionMap;
