import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { useAuth } from './context/AuthContext';

// Lazy load components with named exports
const Landing = React.lazy(() => import('./pages/Landing').then(m => ({ default: m.Landing })));
const Login = React.lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Signup = React.lazy(() => import('./pages/Signup').then(m => ({ default: m.Signup })));
const Dashboard = React.lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Requests = React.lazy(() => import('./pages/dashboard/Requests').then(m => ({ default: m.Requests })));
const Profile = React.lazy(() => import('./pages/dashboard/Profile').then(m => ({ default: m.Profile })));
const Admin = React.lazy(() => import('./pages/dashboard/Admin').then(m => ({ default: m.Admin })));

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<div className="h-screen w-screen bg-charcoal flex items-center justify-center text-gold animate-pulse font-light tracking-widest">LOADING...</div>}>
      <Routes>
        {/* Public routes */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Landing />} />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
          />
          <Route 
            path="/signup" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} 
          />
        </Route>

        {/* Authenticated routes */}
        <Route element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/requests" element={<Requests />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/admin" element={<Admin />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
