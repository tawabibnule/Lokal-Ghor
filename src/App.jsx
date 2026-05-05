import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SeekerDashboard from './pages/dashboards/SeekerDashboard';
import OwnerDashboard from './pages/dashboards/OwnerDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import PropertyDetails from './pages/PropertyDetails';
import { AuthProvider, useAuth } from './context/AuthContext';

// Simple PrivateRoute wrapper for mock auth
const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              
              {/* Protected Portals */}
              <Route path="/seeker/*" element={<PrivateRoute role="seeker"><SeekerDashboard /></PrivateRoute>} />
              <Route path="/owner/*" element={<PrivateRoute role="owner"><OwnerDashboard /></PrivateRoute>} />
              <Route path="/admin/*" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
