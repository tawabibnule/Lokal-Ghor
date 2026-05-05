import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, BedDouble, Bath, Square, 
  ShieldCheck, Clock, User, Phone, MessageSquare, CheckCircle2 
} from 'lucide-react';
import MapPlaceholder from '../components/MapPlaceholder';
import { mockProperties } from '../data/mockProperties';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find property from mock data based on ID
  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="property-details-page container animate-fade-in" style={{textAlign: 'center', padding: '100px 0'}}>
        <h2>Property not found</h2>
        <button className="btn btn-primary" onClick={() => navigate(-1)} style={{marginTop: '20px'}}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="property-details-page container animate-fade-in">
      <button className="btn btn-glass back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        Back to Results
      </button>

      {/* Hero Gallery */}
      <div className="property-gallery">
        <div className="main-image mock-image hero-mock">
          <div className="image-overlay">
            <span className="badge glass-panel">Featured</span>
          </div>
        </div>
        <div className="thumbnail-grid">
          <div className="thumbnail mock-image"></div>
          <div className="thumbnail mock-image"></div>
          <div className="thumbnail mock-image">
            <div className="more-overlay">+5 Photos</div>
          </div>
        </div>
      </div>

      <div className="property-content-grid">
        {/* Left Column: Details */}
        <div className="property-main-info">
          <div className="header-info">
            <div className="title-row">
              <h1>{property.title}</h1>
              <div className="price-mobile text-gradient">{property.price} BDT/mo</div>
            </div>
            <p className="location text-muted">
              <MapPin size={18} />
              {property.location}
            </p>
          </div>

          <div className="key-specs glass-panel">
            <div className="spec-item">
              <BedDouble className="text-primary" size={24} />
              <div>
                <span className="spec-value">{property.beds}</span>
                <span className="spec-label">Beds</span>
              </div>
            </div>
            <div className="spec-item">
              <Bath className="text-secondary" size={24} />
              <div>
                <span className="spec-value">{property.baths}</span>
                <span className="spec-label">Baths</span>
              </div>
            </div>
            <div className="spec-item">
              <Square className="text-primary" size={24} />
              <div>
                <span className="spec-value">{property.sqft}</span>
                <span className="spec-label">Sq Ft</span>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Description</h3>
            <p className="description-text">{property.description}</p>
          </div>

          <div className="section">
            <h3>Amenities</h3>
            <div className="amenities-grid">
              {property.amenities.map((item, idx) => (
                <div key={idx} className="amenity-item">
                  <CheckCircle2 size={16} className="text-secondary" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <h3>Exact Location</h3>
            <p className="text-muted" style={{ marginBottom: '16px' }}>
              GPS locked by owner during listing creation.
            </p>
            <div className="map-container glass-panel">
              <MapPlaceholder height="300px" pins={[{ top: '50%', left: '50%', label: property.title }]} />
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="property-sidebar">
          <div className="sticky-wrapper">
            <div className="pricing-card glass-panel">
              <div className="price-header">
                <h2><span className="text-gradient">{property.price}</span> <span className="currency">BDT/mo</span></h2>
              </div>
              
              <div className="owner-info">
                <div className="owner-avatar">
                  <User size={24} />
                </div>
                <div className="owner-details">
                  <h4>{property.owner.name}</h4>
                  {property.owner.verified && (
                    <span className="verified-badge">
                      <ShieldCheck size={14} /> Verified Owner
                    </span>
                  )}
                </div>
              </div>

              <div className="commute-estimate">
                <Clock size={16} className="text-primary" />
                <span><strong>{property.commuteTimeBase} min</strong> commute</span>
              </div>

              <div className="action-buttons">
                <button className="btn btn-primary btn-block">
                  <Phone size={18} />
                  Contact Owner
                </button>
                <button className="btn btn-glass btn-block">
                  <MessageSquare size={18} />
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
