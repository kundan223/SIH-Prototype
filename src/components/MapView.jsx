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

    // Tooltip div
    const tooltip = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', 'white')
      .style('border', '1px solid #ccc')
      .style('border-radius', '4px')
      .style('padding', '8px')
      .style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.1)');

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
        } else if (activity === 'incomplete_work') {
          return 'yellow';
        } else if (activity === 'progressing_fine') {
          return 'green';
        } else {
          return 'gray';  // Default color for regions with no data
        }
      })
      .attr('fill-opacity', 0.7)
      .on('mouseover', function (event, d) {
        const region = d.properties.NAME_1;
        const activity = data[region] || 'No Data';
        tooltip
          .style('visibility', 'visible')
          .text(`Region: ${region} | Activity: ${activity}`);
        d3.select(this).attr('fill-opacity', 1);  // Highlight on hover
      })
      .on('mousemove', function (event) {
        tooltip
          .style('top', `${event.pageY + 10}px`)
          .style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', function () {
        tooltip.style('visibility', 'hidden');
        d3.select(this).attr('fill-opacity', 0.7);  // Reset opacity
      });

    // Clean up SVG and tooltip on component unmount
    return () => {
      svg.remove();
      tooltip.remove();
    };
  }, [data]);

  return <div ref={mapContainer} style={{ height: '100vh', width: '100%' }} />;
};

export default ConstructionMap;
