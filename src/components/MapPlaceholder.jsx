import React from 'react';
import { MapPin } from 'lucide-react';
import './MapPlaceholder.css';

const MapPlaceholder = ({ height = '500px', pins = [] }) => {
  return (
    <div className="map-placeholder-container" style={{ height }}>
      <div className="map-overlay">
        <span className="map-badge glass-panel">Interactive Map (Placeholder)</span>
        
        {/* Mock Map Pins */}
        <div className="mock-pin" style={{ top: '30%', left: '40%' }}>
          <MapPin className="pin-icon text-primary" size={32} />
          <div className="pin-tooltip glass-panel">৳45k</div>
        </div>
        <div className="mock-pin" style={{ top: '60%', left: '70%' }}>
          <MapPin className="pin-icon text-secondary" size={32} />
          <div className="pin-tooltip glass-panel">৳65k</div>
        </div>
        <div className="mock-pin" style={{ top: '45%', left: '20%' }}>
          <MapPin className="pin-icon text-primary" size={32} />
          <div className="pin-tooltip glass-panel">৳30k</div>
        </div>

        {pins.map((pin, index) => (
          <div key={index} className="mock-pin" style={{ top: pin.top, left: pin.left }}>
            <MapPin className="pin-icon text-primary" size={32} />
            {pin.label && <div className="pin-tooltip glass-panel">{pin.label}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapPlaceholder;
