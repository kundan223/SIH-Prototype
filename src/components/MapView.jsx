// src/ConstructionMap.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Define the URL for fetching the GeoJSON data
const GEOJSON_URL = '/geojson';

// Define the bounding box for India (approximate)
const indiaBounds = [
  [6.5546079, 68.1113787],   // Southwest corner of India
  [35.6745457, 97.395555],   // Northeast corner of India
];

const ConstructionMap = ({ data }) => {
  const [geojsonData, setGeojsonData] = useState(null);

  // Fetch the GeoJSON data from the Flask backend
  useEffect(() => {
    const fetchGeojsonData = async () => {
      try {
        const response = await fetch(GEOJSON_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setGeojsonData(json);
      } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
      }
    };

    fetchGeojsonData();
  }, []);

  // Define the style function to color states based on construction activity
  const getRegionStyle = (feature) => {
    const region = feature.properties.name; // Assuming the region name is stored in "name"
    const activity = data[region]; // Assuming data is an object with region names as keys

    let fillColor;
    if (activity === 'not_progressing') {
      fillColor = 'red';
    } else if (activity === 'incomplete_lazy') {
      fillColor = 'yellow';
    } else if (activity === 'progressing_fine') {
      fillColor = 'green';
    } else {
      fillColor = 'gray'; // Default color for regions with no data
    }

    return {
      fillColor,
      weight: 2,
      opacity: 1,
      color: 'black', // Boundary color for states
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

  return (
    <MapContainer
      center={[20.5937, 78.9629]}      // Center the map on India
      zoom={5}                         // Appropriate zoom level for India
      minZoom={5}                      // Prevent zooming out beyond India
      maxZoom={10}                     // Allow zooming in to a closer view
      scrollWheelZoom={false}          // Disable scroll wheel zoom to avoid zooming out
      style={{ height: '100vh', width: '100%' }}
      maxBounds={indiaBounds}          // Set max bounds to restrict panning
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geojsonData && <GeoJSON data={geojsonData} style={getRegionStyle} />}
    </MapContainer>
  );
};

export default ConstructionMap;
