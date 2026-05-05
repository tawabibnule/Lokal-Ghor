import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Search, Map as MapIcon, Filter, List, Clock, Briefcase } from 'lucide-react';
import MapPlaceholder from '../../components/MapPlaceholder';
import { mockProperties } from '../../data/mockProperties';
import './Dashboard.css';

const SeekerDashboard = () => {
  const { user, logout } = useAuth();
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [commuteTarget, setCommuteTarget] = useState('Gulshan 1'); // Mock target for commute calc

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    maxPrice: '',
    minBeds: 'Any',
    propertyType: 'All'
  });

  const filteredProperties = mockProperties.filter(property => {
    // 1. Text Search (Title or Location)
    const query = searchQuery.toLowerCase();
    const matchesSearch = property.title.toLowerCase().includes(query) || 
                          property.location.toLowerCase().includes(query);
    
    // 2. Max Price
    const priceNumber = parseInt(property.price.replace(/,/g, ''), 10);
    const maxBudget = filters.maxPrice ? parseInt(filters.maxPrice, 10) : Infinity;
    const matchesPrice = priceNumber <= maxBudget;

    // 3. Beds
    const matchesBeds = filters.minBeds === 'Any' || property.beds >= parseInt(filters.minBeds, 10);

    // 4. Property Type
    const matchesType = filters.propertyType === 'All' || property.type === filters.propertyType;

    return matchesSearch && matchesPrice && matchesBeds && matchesType;
  });

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilters({ maxPrice: '', minBeds: 'Any', propertyType: 'All' });
  };

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
          <input 
            type="text" 
            placeholder="Search by area, e.g., Gulshan..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button 
          className={`btn ${showFilters ? 'btn-primary' : 'btn-glass'}`} 
          style={{gap: '8px'}}
          onClick={() => setShowFilters(!showFilters)}
        >
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

      {/* Expandable Filter Panel */}
      {showFilters && (
        <div className="filter-panel glass-panel animate-fade-in" style={{padding: '24px', marginBottom: '32px'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px'}}>
            
            <div className="form-group">
              <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-muted)'}}>Max Budget (BDT)</label>
              <input 
                type="number" 
                placeholder="e.g. 50000"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                style={{width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: '#fff'}}
              />
            </div>

            <div className="form-group">
              <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-muted)'}}>Bedrooms</label>
              <select 
                value={filters.minBeds}
                onChange={(e) => setFilters({...filters, minBeds: e.target.value})}
                style={{width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: '#fff'}}
              >
                <option value="Any" style={{color: '#000'}}>Any</option>
                <option value="1" style={{color: '#000'}}>1+</option>
                <option value="2" style={{color: '#000'}}>2+</option>
                <option value="3" style={{color: '#000'}}>3+</option>
                <option value="4" style={{color: '#000'}}>4+</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-muted)'}}>Property Type</label>
              <select 
                value={filters.propertyType}
                onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                style={{width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: '#fff'}}
              >
                <option value="All" style={{color: '#000'}}>All Types</option>
                <option value="Apartment" style={{color: '#000'}}>Apartment</option>
                <option value="Studio" style={{color: '#000'}}>Studio</option>
                <option value="Duplex" style={{color: '#000'}}>Duplex</option>
                <option value="Penthouse" style={{color: '#000'}}>Penthouse</option>
              </select>
            </div>

            <div style={{display: 'flex', alignItems: 'flex-end'}}>
              <button className="btn btn-glass" onClick={handleClearFilters} style={{width: '100%'}}>
                Clear Filters
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Commute Tool Header */}
      {viewMode === 'list' && (
        <div className="commute-tool glass-panel" style={{padding: '16px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px'}}>
          <Briefcase className="text-secondary" />
          <span style={{fontWeight: '500'}}>Commute to:</span>
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
        <>
          {filteredProperties.length === 0 ? (
            <div className="glass-panel animate-fade-in" style={{padding: '60px 40px', textAlign: 'center'}}>
              <Search size={48} className="text-muted" style={{marginBottom: '16px', opacity: 0.5}} />
              <h3 className="text-main" style={{fontSize: '1.5rem', marginBottom: '8px'}}>No properties found</h3>
              <p className="text-muted">We couldn't find any listings matching your search criteria.</p>
              <button className="btn btn-primary" onClick={handleClearFilters} style={{marginTop: '24px'}}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="listings-grid animate-fade-in">
              {filteredProperties.map((property, idx) => (
                <div key={property.id} className="property-card glass-panel">
                  <div className="property-image mock-image"></div>
                  <div className="property-details">
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                      <h3 style={{marginBottom: '4px'}}>{property.title}</h3>
                      {/* Commute Calculator Mock */}
                      <div className="commute-badge" style={{display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(123, 97, 255, 0.1)', color: 'var(--secondary)', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold'}}>
                        <Clock size={12} />
                        {property.commuteTimeBase + (idx % 3) * 5} min
                      </div>
                    </div>
                    <p className="text-muted" style={{fontSize: '0.875rem', marginBottom: '12px'}}>{property.location}</p>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span className="text-gradient" style={{fontWeight: 'bold', fontSize: '1.1rem'}}>{property.price} BDT</span>
                      <Link to={`/property/${property.id}`} className="btn btn-primary" style={{padding: '8px 16px', fontSize: '0.875rem'}}>View</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SeekerDashboard;
