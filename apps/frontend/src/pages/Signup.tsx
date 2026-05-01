import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';

export function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // mock flow
    navigate('/dashboard');
  };

  return (
    <div className="flex-1 flex items-center justify-center pt-20 px-4">
      <GlassCard className="w-full max-w-md p-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2 className="text-3xl font-bold mb-2">Join StudySync</h2>
          <p className="text-foreground/60 mb-8">Create your cinematic learning profile.</p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 transition-all text-white placeholder:text-white/30"
                placeholder="Alex Carter"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 transition-all text-white placeholder:text-white/30"
                placeholder="you@university.edu"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <input 
                type="password" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 transition-all text-white placeholder:text-white/30"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full mt-6" size="lg">Create Account</Button>
          </form>

          <p className="mt-6 text-center text-sm text-foreground/60">
            Already have an account? <Link to="/login" className="text-accent-pink hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </GlassCard>
    </div>
  );
}
