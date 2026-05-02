import { Outlet, Link, useLocation } from 'react-router-dom';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Navbar } from '../components/ui/Navbar';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Inventory', icon: '⬡' },
  { path: '/dashboard/requests', label: 'My Requests', icon: '◻', roles: ['STUDENT', 'STAFF', 'ADMIN'] },
  { path: '/dashboard/profile', label: 'Profile', icon: '◉', roles: ['STUDENT', 'STAFF', 'ADMIN'] },
  { path: '/dashboard/admin', label: 'Management', icon: '◈', roles: ['STAFF', 'ADMIN'] },
];

export function DashboardLayout() {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const filteredNavItems = NAV_ITEMS.filter(item => 
    !item.roles || item.roles.includes(user?.role || '')
  );

  return (
    <div className="min-h-screen relative flex flex-col pt-20 bg-charcoal">
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
          <GlassCard className="sticky top-24 flex flex-col gap-1 p-3 h-auto border-bronze/10">
            {/* Branding */}
            <div className="px-3 py-3 mb-2 border-b border-white/5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gold/40">Equipment Portal</p>
            </div>

            <nav className="flex flex-col gap-1">
              {filteredNavItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-light transition-all relative',
                      isActive
                        ? 'bg-white/5 text-champagne'
                        : 'text-champagne/40 hover:text-champagne hover:bg-white/5'
                    )}
                  >
                    <span className="text-base text-bronze">{item.icon}</span>
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute left-0 w-0.5 h-6 bg-gold/50 rounded-full ml-[1px]"
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
