import { Outlet, Link, useLocation } from 'react-router-dom';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Navbar } from '../components/ui/Navbar';
import { cn } from '../lib/utils';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Overview', icon: '⬡' },
  { path: '/dashboard/groups', label: 'Groups', icon: '◈' },
  { path: '/dashboard/bookings', label: 'Bookings', icon: '◻' },
  { path: '/dashboard/notifications', label: 'Notifications', icon: '◇' },
  { path: '/dashboard/profile', label: 'Profile', icon: '◉' },
  { path: '/dashboard/admin', label: 'Analytics', icon: '◈' },
];

export function DashboardLayout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen relative flex flex-col pt-20">
      <AnimatedBackground />
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex gap-8">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-64 flex-shrink-0 hidden md:block"
        >
          <GlassCard className="sticky top-24 flex flex-col gap-1 p-3 h-auto">
            {/* Branding */}
            <div className="px-3 py-3 mb-2 border-b border-white/10">
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40">StudySync</p>
            </div>

            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                      isActive
                        ? 'bg-white/10 text-foreground shadow-inner'
                        : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
                    )}
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute left-0 w-0.5 h-6 bg-gradient-to-b from-accent-cyan to-accent-purple rounded-full ml-[1px]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </GlassCard>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
