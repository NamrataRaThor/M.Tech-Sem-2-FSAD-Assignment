import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center pt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl text-center space-y-8"
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
          Where study <br />
          <span className="text-gradient-accent">dreams</span> collaborate.
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
          Experience a cinematic, AI-enhanced platform designed to elevate your campus learning experience to new heights.
        </p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <Link to="/signup">
            <Button size="lg" className="w-full sm:w-auto">Start Collaborating</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">View Demo</Button>
          </Link>
        </motion.div>
      </motion.div>

      <div className="w-full max-w-6xl mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
        <GlassCard delay={0.2} className="h-64 flex flex-col justify-end">
          <h3 className="text-2xl font-semibold mb-2">Smart Groups</h3>
          <p className="text-foreground/60">Connect with peers effortlessly using intelligent matching.</p>
        </GlassCard>
        <GlassCard delay={0.4} className="h-64 flex flex-col justify-end border-accent-purple/20">
          <h3 className="text-2xl font-semibold mb-2">Resource Booking</h3>
          <p className="text-foreground/60">Reserve study spaces and equipment without the overlap.</p>
        </GlassCard>
        <GlassCard delay={0.6} className="h-64 flex flex-col justify-end">
          <h3 className="text-2xl font-semibold mb-2">Activity Feeds</h3>
          <p className="text-foreground/60">Stay updated with your community's academic milestones.</p>
        </GlassCard>
      </div>
    </div>
  );
}
