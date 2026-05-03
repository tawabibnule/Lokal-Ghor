import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, Map as MapIcon, Filter, List, Clock, Briefcase } from 'lucide-react';
import MapPlaceholder from '../../components/MapPlaceholder';
import './Dashboard.css';

const SeekerDashboard = () => {
  const { user, logout } = useAuth();
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [commuteTarget, setCommuteTarget] = useState('Gulshan 1'); // Mock target for commute calc

  return (
    <div className="dashboard-container animate-fade-in container">
      <div className="dashboard-header">
        <div>
          <h2>Welcome, {user?.name || 'Seeker'}</h2>
          <p className="text-muted">Find your perfect home</p>
        </div>
        <button className="btn btn-glass" onClick={logout}>Sign Out</button>
      </div>

      <div className="dashboard-actions glass-panel">
        <div className="search-bar">
          <Search className="text-muted" />
          <input type="text" placeholder="Search by area, e.g., Gulshan..." />
        </div>
        <button className="btn btn-primary" style={{gap: '8px'}}>
          <Filter size={18} />
          Filters
        </button>
        <button 
          className={`btn ${viewMode === 'map' ? 'btn-primary' : 'btn-glass'}`} 
          onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
          style={{gap: '8px'}}
        >
          {viewMode === 'list' ? <MapIcon size={18} /> : <List size={18} />}
          {viewMode === 'list' ? 'Map View' : 'List View'}
        </button>
      </div>

      {/* Commute Tool Header */}
      {viewMode === 'list' && (
        <div className="commute-tool glass-panel" style={{padding: '16px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px'}}>
          <Briefcase className="text-secondary" />
          <span style={{fontWeight: '500'}}>Calculating commute times to:</span>
          <input 
            type="text" 
            value={commuteTarget} 
            onChange={(e) => setCommuteTarget(e.target.value)}
            style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '8px', color: '#fff'}}
          />
        </div>
      )}

      {viewMode === 'map' ? (
        <div className="animate-fade-in">
          <MapPlaceholder height="600px" />
        </div>
      ) : (
        <div className="listings-grid animate-fade-in">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="property-card glass-panel">
              <div className="property-image mock-image"></div>
              <div className="property-details">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                  <h3 style={{marginBottom: '4px'}}>Modern Apartment {i}</h3>
                  {/* Commute Calculator Mock */}
                  <div className="commute-badge" style={{display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(123, 97, 255, 0.1)', color: 'var(--secondary)', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold'}}>
                    <Clock size={12} />
                    {10 + i * 5} min
                  </div>
                </div>
                <p className="text-muted" style={{fontSize: '0.875rem', marginBottom: '12px'}}>Gulshan 2, Dhaka</p>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span className="text-gradient" style={{fontWeight: 'bold', fontSize: '1.1rem'}}>45,000 BDT</span>
                  <button className="btn btn-primary" style={{padding: '8px 16px', fontSize: '0.875rem'}}>View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeekerDashboard;
