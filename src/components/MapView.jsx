import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import upGeojson from '../data/UttarPradeshGeojson.json'; // Ensure the path is correct

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
      .center([80.9462, 26.8467])  // Center on Uttar Pradesh
      .scale(4000)                 // Adjust this scale as needed
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
      .data(upGeojson.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('stroke', 'black')
      .attr('fill', d => {
        const district = d.properties.Name;
        const activity = data[district];

        // Color logic
        if (activity === 'need_attention') {
          return 'red';
        } else if (activity === 'inconsistent') {
          return 'yellow';
        } else if (activity === 'no_action_needed') {
          return 'green';
        } else {
          return 'gray';  // Default color for regions with no data
        }
      })
      .attr('fill-opacity', 0.7)
      .on('mouseover', function (event, d) {
        const district = d.properties.Name;
        const activity = data[district] || 'No Data';
        tooltip
          .style('visibility', 'visible')
          .text(`District: ${district} | Activity: ${activity}`);
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

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
        Uttar Pradesh District Construction Progress Map
      </h2>
      <div ref={mapContainer} style={{ height: '90vh', width: '100%' }} />
    </div>
  );
};

export default ConstructionMap;
