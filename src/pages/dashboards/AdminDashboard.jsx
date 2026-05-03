import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, CheckCircle, XCircle } from 'lucide-react';
import './Dashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container animate-fade-in container">
      <div className="dashboard-header">
        <div>
          <h2>Control Room</h2>
          <p className="text-muted">Welcome back, Admin {user?.name}</p>
        </div>
        <button className="btn btn-glass" onClick={logout}>Sign Out</button>
      </div>

      <div className="dashboard-section">
        <h3 style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <ShieldAlert className="text-primary" />
          Pending Verifications
        </h3>
        <div className="verification-list">
          {[1, 2].map(i => (
            <div key={i} className="verification-card glass-panel">
              <div className="user-info">
                <h4>New {i === 1 ? 'Owner' : 'Seeker'} Application</h4>
                <p className="text-muted">ID: NID_Front_{i}.jpg</p>
                <p className="text-muted">Phone: +880 171122334{i}</p>
              </div>
              <div className="verification-actions">
                <button className="btn btn-glass" style={{color: '#FF416C'}}>
                  <XCircle size={18} /> Reject
                </button>
                <button className="btn btn-primary">
                  <CheckCircle size={18} /> Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
