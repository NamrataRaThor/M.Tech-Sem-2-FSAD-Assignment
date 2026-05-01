import { Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Groups } from './pages/dashboard/Groups';
import { Bookings } from './pages/dashboard/Bookings';
import { Notifications } from './pages/dashboard/Notifications';
import { Profile } from './pages/dashboard/Profile';
import { Admin } from './pages/dashboard/Admin';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Authenticated routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/groups" element={<Groups />} />
        <Route path="/dashboard/bookings" element={<Bookings />} />
        <Route path="/dashboard/notifications" element={<Notifications />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
