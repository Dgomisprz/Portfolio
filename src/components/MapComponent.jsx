import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapAnimation({ startAnimation }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView([0, 0], 1);
    
    if (startAnimation) {
      setTimeout(() => {
        map.flyTo([38.34567591142283, -0.49067320930580116], 12, {
          duration: 2,
          easeLinearity: 0.25
        });
      }, 1000);
    }
  }, [map, startAnimation]);

  return null;
}

function MapComponent({ startAnimation = false }) {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={0.5}
      style={{ height: '400px', width: '400px' }}
      className="rounded-lg shadow-lg"
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapAnimation startAnimation={startAnimation} />
    </MapContainer>
  );
}
export default MapComponent;