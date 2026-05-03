import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { User, Home as HomeIcon, UploadCloud, ShieldCheck } from 'lucide-react';
import './Auth.css';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6 digit for Supabase
  const [idUploaded, setIdUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { handleAuthSuccess } = useAuth();

  const handleNextStep = async (e) => {
    e?.preventDefault();
    setError('');

    if (step === 1 && !role) return;
    
    if (step === 2) {
      if (!email) return;
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
      });
      setLoading(false);
      
      if (error) {
        setError(error.message);
        return;
      }
    }
    
    if (step === 3) {
      const token = otp.join('');
      if (token.length !== 6) {
        setError('Please enter a 6-digit code');
        return;
      }
      
      setLoading(true);
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token,
        type: 'email'
      });
      
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      
      // If OTP verified successfully, we can update the user metadata with their role
      if (data?.session) {
        const { error: updateError } = await supabase.auth.updateUser({
          data: { role: role }
        });
        
        if (updateError) {
           setError('Failed to update user profile. Continuing anyway...');
        }
      }
      setLoading(false);
    }
    
    setStep(step + 1);
  };

  const handleFinish = () => {
    // Assuming the user is already authenticated from Step 3
    handleAuthSuccess(role);
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join the high-trust real estate ecosystem</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(255, 65, 108, 0.1)', color: '#FF416C', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <div className="step-indicator">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`step-dot ${s <= step ? 'active' : ''}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="animate-fade-in">
            <div className="form-group">
              <label style={{textAlign: 'center', marginBottom: '16px'}}>I want to...</label>
              <div className="role-selector">
                <div 
                  className={`role-card ${role === 'seeker' ? 'selected' : ''}`}
                  onClick={() => setRole('seeker')}
                >
                  <User className="role-icon" size={32} />
                  <h4>Find a Home</h4>
                  <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Browse verified listings</p>
                </div>
                <div 
                  className={`role-card ${role === 'owner' ? 'selected' : ''}`}
                  onClick={() => setRole('owner')}
                >
                  <HomeIcon className="role-icon" size={32} />
                  <h4>List Property</h4>
                  <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Find trusted tenants</p>
                </div>
              </div>
            </div>
            <button 
              className="btn btn-primary btn-block" 
              onClick={handleNextStep}
              disabled={!role}
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleNextStep} className="animate-fade-in">
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleNextStep} className="animate-fade-in">
            <div className="form-group">
              <label>Enter 6-digit code sent to {email}</label>
              <div className="otp-inputs">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="form-control otp-input"
                    value={digit}
                    onChange={(e) => {
                      if (e.target.value.length > 1) return;
                      const newOtp = [...otp];
                      newOtp[index] = e.target.value;
                      setOtp(newOtp);
                    }}
                    required
                  />
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>
        )}

        {step === 4 && (
          <div className="animate-fade-in">
            <div className="form-group">
              <label style={{textAlign: 'center'}}>Identity Verification</label>
              <p style={{textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px'}}>
                Please upload your NID or Passport. Admin verification takes up to 24 hours.
              </p>
              
              <div 
                className={`id-upload-area ${idUploaded ? 'active' : ''}`}
                onClick={() => setIdUploaded(true)}
              >
                {!idUploaded ? (
                  <>
                    <UploadCloud size={48} style={{color: 'var(--text-muted)', marginBottom: '16px'}} />
                    <h4>Click to browse files</h4>
                    <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>JPEG, PNG up to 5MB</p>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={48} style={{color: 'var(--primary)', marginBottom: '16px'}} />
                    <h4 style={{color: 'var(--primary)'}}>NID_Front.jpg</h4>
                    <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Ready for submission</p>
                  </>
                )}
              </div>
            </div>
            <button 
              className="btn btn-primary btn-block" 
              onClick={handleFinish}
              disabled={!idUploaded}
            >
              Complete Registration
            </button>
          </div>
        )}

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
