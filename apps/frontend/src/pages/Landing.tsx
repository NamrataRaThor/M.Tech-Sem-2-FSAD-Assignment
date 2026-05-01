import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center pt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl text-center space-y-10"
      >
        <h1 className="text-7xl md:text-9xl font-extralight tracking-tight leading-[0.9]">
          Study <br />
          <span className="text-gradient-accent italic">Sync</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-champagne/40 max-w-2xl mx-auto leading-relaxed font-light tracking-wide uppercase text-xs">
          Where dreams collaborate.
        </p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12"
        >
          <Link to="/signup">
            <Button size="lg" className="w-full sm:w-auto tracking-widest">Enter the Dream</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto tracking-widest">View Experience</Button>
          </Link>
        </motion.div>
      </motion.div>

      <div className="w-full max-w-6xl mt-48 grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
        <GlassCard delay={0.2} className="h-80 flex flex-col justify-end p-8">
          <h3 className="text-xl font-light tracking-widest uppercase mb-4 text-bronze">Smart Groups</h3>
          <p className="text-champagne/40 text-sm leading-relaxed">Connect with peers effortlessly using intelligent, AI-enhanced matching.</p>
        </GlassCard>
        <GlassCard delay={0.4} className="h-80 flex flex-col justify-end p-8">
          <h3 className="text-xl font-light tracking-widest uppercase mb-4 text-gold">Resource Booking</h3>
          <p className="text-champagne/40 text-sm leading-relaxed">Reserve study spaces and equipment with architectural precision.</p>
        </GlassCard>
        <GlassCard delay={0.6} className="h-80 flex flex-col justify-end p-8">
          <h3 className="text-xl font-light tracking-widest uppercase mb-4 text-champagne">Activity Feeds</h3>
          <p className="text-champagne/40 text-sm leading-relaxed">Stay updated with your community's academic milestones in real-time.</p>
        </GlassCard>
      </div>
    </div>
  );
}
