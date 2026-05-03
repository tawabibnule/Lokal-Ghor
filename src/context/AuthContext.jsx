import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const role = session.user.user_metadata?.role || 'seeker';
        setUser({
          id: session.user.id,
          role: role,
          name: session.user.user_metadata?.name || `User`,
          verified: session.user.user_metadata?.verified || false,
          phone: session.user.phone
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const role = session.user.user_metadata?.role || 'seeker';
        setUser({
          id: session.user.id,
          role: role,
          name: session.user.user_metadata?.name || `User`,
          verified: session.user.user_metadata?.verified || false,
          phone: session.user.phone
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = (role) => {
    navigate(`/${role}`);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleAuthSuccess, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
