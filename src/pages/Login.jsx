import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Supabase uses 6 digit OTP by default
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleAuthSuccess } = useAuth();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
    });

    if (error) {
      setError(error.message);
    } else {
      setOtpSent(true);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const token = otp.join('');
    if (token.length !== 6) {
      setError('Please enter a 6-digit code');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.verifyOtp({
      email: email,
      token,
      type: 'email'
    });

    if (error) {
      setError(error.message);
    } else if (data?.session) {
      const role = data.session.user.user_metadata?.role || 'seeker';
      handleAuthSuccess(role);
    }
    setLoading(false);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent pasting multiple chars in one box for now
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your LokalHome account</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(255, 65, 108, 0.1)', color: '#FF416C', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
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
              {loading ? 'Sending...' : 'Send OTP Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="animate-fade-in">
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
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    required
                  />
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Sign In'}
            </button>
            <div className="auth-footer" style={{marginTop: '16px'}}>
              <button type="button" onClick={() => setOtpSent(false)} style={{color: 'var(--text-muted)'}}>
                Use a different email
              </button>
            </div>
          </form>
        )}

        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
