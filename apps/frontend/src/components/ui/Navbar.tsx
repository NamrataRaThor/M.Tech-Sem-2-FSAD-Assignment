import { Link } from 'react-router-dom';
import { Button } from './Button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 50],
    ['rgba(9, 9, 11, 0)', 'rgba(9, 9, 11, 0.7)']
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(16px)']
  );

  return (
    <motion.header
      style={{ background, backdropFilter: backdropBlur }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/0 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-bronze to-gold flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-shadow">
            <div className="w-3 h-3 bg-charcoal rounded-full" />
          </div>
          <span className="text-xl font-extralight tracking-tighter text-champagne">Equipment Portal</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-xs font-light tracking-widest uppercase text-champagne/40 hover:text-gold transition-colors">Home</Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="text-xs font-light tracking-widest uppercase text-champagne/40 hover:text-gold transition-colors">Dashboard</Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <Button 
                variant="primary" 
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
