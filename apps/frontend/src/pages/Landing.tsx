import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center pt-20 px-4 bg-charcoal">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl text-center space-y-10"
      >
        <h1 className="text-7xl md:text-[8rem] font-extralight tracking-tighter leading-[0.8] mb-12 text-champagne">
          Equipment <br />
          <span className="text-gradient italic pr-4">Portal</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-champagne/40 max-w-2xl mx-auto leading-relaxed font-light tracking-[0.3em] uppercase text-xs mt-12">
          Borrow. Build. Innovate.
        </p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12"
        >
          <Link to="/signup">
            <Button size="lg" className="w-full sm:w-auto tracking-widest px-12">Get Started</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto tracking-widest px-12">Sign In</Button>
          </Link>
        </motion.div>
      </motion.div>

      <div className="w-full max-w-6xl mt-48 grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
        <GlassCard delay={0.2} className="h-80 flex flex-col justify-end p-8 border-bronze/10">
          <h3 className="text-xl font-light tracking-widest uppercase mb-4 text-bronze">Inventory</h3>
          <p className="text-champagne/40 text-sm leading-relaxed">Browse our extensive collection of electronics, tools, and lab equipment.</p>
        </GlassCard>
        <GlassCard delay={0.4} className="h-80 flex flex-col justify-end p-8 border-gold/10">
          <h3 className="text-xl font-light tracking-widest uppercase mb-4 text-gold">Seamless Requests</h3>
          <p className="text-champagne/40 text-sm leading-relaxed">Request items with a single click and track your lending history in real-time.</p>
        </GlassCard>
        <GlassCard delay={0.6} className="h-80 flex flex-col justify-end p-8 border-bronze/10">
          <h3 className="text-xl font-light tracking-widest uppercase mb-4 text-champagne">Staff Oversight</h3>
          <p className="text-champagne/40 text-sm leading-relaxed">Managed approvals and automated status updates for efficient resource distribution.</p>
        </GlassCard>
      </div>
    </div>
  );
}
