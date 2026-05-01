import { Outlet, Link } from 'react-router-dom';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Navbar } from '../components/ui/Navbar';

export function DashboardLayout() {
  return (
    <div className="min-h-screen relative flex flex-col pt-20">
      <AnimatedBackground />
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex gap-8">
        {/* Sidebar */}
        <motion.aside 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-64 flex-shrink-0 hidden md:block"
        >
          <GlassCard className="h-[calc(100vh-120px)] sticky top-24 flex flex-col gap-2 p-4">
            <nav className="flex flex-col gap-2">
              <Link to="/dashboard" className="px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-foreground">Home</Link>
              <Link to="/dashboard/groups" className="px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-foreground/70">Groups</Link>
              <Link to="/dashboard/bookings" className="px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-foreground/70">Bookings</Link>
              <Link to="/dashboard/settings" className="px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-foreground/70">Settings</Link>
            </nav>
          </GlassCard>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
