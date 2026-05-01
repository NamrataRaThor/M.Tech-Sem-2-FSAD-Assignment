import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // mock login flow
    navigate('/dashboard');
  };

  return (
    <div className="flex-1 flex items-center justify-center pt-20 px-4">
      <GlassCard className="w-full max-w-md p-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-foreground/60 mb-8">Sign in to continue to StudySync.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-purple/50 transition-all text-white placeholder:text-white/30"
                placeholder="you@university.edu"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <input 
                type="password" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-purple/50 transition-all text-white placeholder:text-white/30"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full mt-6" size="lg">Sign In</Button>
          </form>

          <p className="mt-6 text-center text-sm text-foreground/60">
            Don't have an account? <Link to="/signup" className="text-accent-cyan hover:underline">Sign up</Link>
          </p>
        </motion.div>
      </GlassCard>
    </div>
  );
}
