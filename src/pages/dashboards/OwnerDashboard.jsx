import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Plus, BarChart2, Users, MapPin, Navigation } from 'lucide-react';
import MapPlaceholder from '../../components/MapPlaceholder';
import './Dashboard.css';

const OwnerDashboard = () => {
  const { user, logout } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [livePinning, setLivePinning] = useState(false);

  return (
    <div className="dashboard-container animate-fade-in container">
      <div className="dashboard-header">
        <div>
          <h2>Welcome, {user?.name || 'Owner'}</h2>
          <p className="text-muted">Manage your properties and leads</p>
        </div>
        <button className="btn btn-glass" onClick={logout}>Sign Out</button>
      </div>

      {!isCreating ? (
        <>
          <div className="dashboard-stats grid-3">
            <div className="stat-card glass-panel">
              <div className="stat-icon bg-primary-light"><BarChart2 /></div>
              <div>
                <h3>3</h3>
                <p className="text-muted">Active Listings</p>
              </div>
            </div>
            <div className="stat-card glass-panel">
              <div className="stat-icon bg-secondary-light"><Users /></div>
              <div>
                <h3>12</h3>
                <p className="text-muted">Total Leads</p>
              </div>
            </div>
            <div className="stat-card glass-panel" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <button className="btn btn-primary" style={{width: '100%', height: '100%'}} onClick={() => setIsCreating(true)}>
                <Plus size={20} />
                Create New Listing
              </button>
            </div>
          </div>

          <div className="dashboard-section">
            <h3>Recent Leads (CRM)</h3>
            <div className="glass-panel" style={{padding: '24px', marginTop: '16px'}}>
              <p className="text-muted">No leads to display right now.</p>
            </div>
          </div>
        </>
      ) : (
        <div className="create-listing-flow animate-fade-in glass-panel" style={{padding: '32px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px'}}>
            <h2>List a New Property</h2>
            <button className="btn btn-glass" onClick={() => setIsCreating(false)}>Cancel</button>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px'}}>
            <div className="listing-form">
              <div className="form-group" style={{marginBottom: '20px'}}>
                <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-muted)'}}>Property Title</label>
                <input type="text" className="form-control" placeholder="e.g. Modern 2BHK in Banani" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', width: '100%', color: '#fff'}} />
              </div>
              <div className="form-group" style={{marginBottom: '20px'}}>
                <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-muted)'}}>Rent (BDT/month)</label>
                <input type="number" className="form-control" placeholder="e.g. 45000" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', width: '100%', color: '#fff'}} />
              </div>

              <div className="live-pinning-section" style={{background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', padding: '24px', borderRadius: '12px', marginBottom: '24px'}}>
                <h4 style={{marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)'}}>
                  <MapPin size={20} />
                  Live GPS Pinning
                </h4>
                <p className="text-muted" style={{fontSize: '0.875rem', marginBottom: '16px'}}>
                  To guarantee location accuracy, please stand inside the property and click the button below to fetch your current GPS coordinates.
                </p>
                <button 
                  className={`btn ${livePinning ? 'btn-glass' : 'btn-primary'}`}
                  style={{width: '100%'}}
                  onClick={() => setLivePinning(true)}
                  disabled={livePinning}
                >
                  {livePinning ? <span style={{color: '#00E5FF'}}>Coordinates Locked: 23.794° N, 90.404° E</span> : <><Navigation size={18} /> Get Current Location</>}
                </button>
              </div>

              <button className="btn btn-primary btn-block" disabled={!livePinning} onClick={() => setIsCreating(false)}>
                Publish Listing
              </button>
            </div>

            <div className="listing-map-preview">
              <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-muted)'}}>Location Preview</label>
              {livePinning ? (
                <div className="animate-fade-in">
                  <MapPlaceholder height="380px" pins={[{ top: '50%', left: '50%', label: 'Your Property' }]} />
                </div>
              ) : (
                <div className="glass-panel" style={{height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px'}}>
                  <p className="text-muted">Click "Get Current Location" to preview your property on the map.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
