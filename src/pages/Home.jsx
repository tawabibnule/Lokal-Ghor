import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section container">
        <div className="hero-content animate-fade-in">
          <div className="badge glass-panel delay-100">
            <ShieldCheck size={16} className="text-primary" />
            <span>100% Verified Properties</span>
          </div>
          <h1 className="hero-title delay-200">
            Find Your Next Home with <br/>
            <span className="text-gradient">Absolute Certainty</span>
          </h1>
          <p className="hero-subtitle delay-300">
            LokalHome is the first high-trust, location-based real estate platform. We verify identities and use live GPS data to eliminate scams.
          </p>
          <div className="hero-actions delay-300">
            <Link to="/seeker" className="btn btn-primary btn-lg">
              <Search size={20} />
              Start Browsing
            </Link>
            <Link to="/owner" className="btn btn-glass btn-lg">
              <MapPin size={20} />
              List a Property
            </Link>
          </div>
        </div>
        <div className="hero-visual animate-fade-in delay-200">
          {/* Abstract Glassmorphism Cards representing properties/map UI */}
          <div className="floating-card card-1 glass-panel">
            <div className="mock-map"></div>
            <div className="card-info">
              <h4>Gulshan Apartment</h4>
              <p className="text-gradient">65,000 BDT/mo</p>
            </div>
          </div>
          <div className="floating-card card-2 glass-panel">
            <div className="mock-user"></div>
            <div className="card-info">
              <h4>Owner Verified</h4>
              <p className="text-muted">ID & Location checked</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="features-section container">
        <h2 className="section-title text-center">Why choose LokalHome?</h2>
        <div className="features-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon bg-primary-light">
              <ShieldCheck size={28} />
            </div>
            <h3>Verified Identity</h3>
            <p>Every seeker and owner is verified via ID upload and OTP. No more fake profiles.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon bg-secondary-light">
              <MapPin size={28} />
            </div>
            <h3>Live GPS Pinning</h3>
            <p>Owners list properties from the exact physical location, guaranteeing map accuracy.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon bg-accent-light">
              <Search size={28} />
            </div>
            <h3>Smart Discovery</h3>
            <p>Filter by commute time, budget, and exact proximity to your daily destinations.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
