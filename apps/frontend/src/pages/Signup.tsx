import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '../hooks/useQueries';
import { useAuth } from '../context/AuthContext';

export function Signup() {
  const navigate = useNavigate();
  const signupMutation = useSignup();
  const { login } = useAuth();
  const [error, setError] = React.useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const name = (e.target as any).name.value;
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;
    const role = (e.target as any).role.value;

    if (!name || !email || !password || !role) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response: any = await signupMutation.mutateAsync({ name, email, password, role });
      if (response.data?.accessToken && response.data?.user) {
        login(response.data.user, response.data.accessToken);
        navigate('/dashboard');
      } else {
        throw new Error('No access token or user received');
      }
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center pt-20 px-4">
      <GlassCard className="w-full max-w-md p-8 border-bronze/10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2 className="text-3xl font-extralight tracking-tight text-champagne mb-2">Create Account</h2>
          <p className="text-champagne/40 text-sm font-light tracking-wide mb-8">Join the Equipment Lending Portal.</p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-light tracking-[0.2em] uppercase text-bronze">Full Name</label>
              <input 
                name="name"
                type="text" 
                className="w-full bg-charcoal/50 border border-bronze/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all text-champagne placeholder:text-champagne/20 font-light"
                placeholder="Alex Carter"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-light tracking-[0.2em] uppercase text-bronze">Email</label>
              <input 
                name="email"
                type="email" 
                className="w-full bg-charcoal/50 border border-bronze/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all text-champagne placeholder:text-champagne/20 font-light"
                placeholder="you@university.edu"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-light tracking-[0.2em] uppercase text-bronze">Password</label>
              <input 
                name="password"
                type="password" 
                className="w-full bg-charcoal/50 border border-bronze/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all text-champagne placeholder:text-champagne/20 font-light"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-light tracking-[0.2em] uppercase text-bronze">Role</label>
              <select 
                name="role"
                className="w-full bg-charcoal/50 border border-bronze/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all text-champagne font-light appearance-none"
              >
                <option value="STUDENT" className="bg-charcoal">Student</option>
                <option value="STAFF" className="bg-charcoal">Staff</option>
                <option value="ADMIN" className="bg-charcoal">Admin</option>
              </select>
            </div>

            {error && <p className="text-red-400 text-xs tracking-wide" role="alert">{error}</p>}

            <Button type="submit" className="w-full mt-6 tracking-widest" size="lg" disabled={signupMutation.isPending}>
              {signupMutation.isPending ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-champagne/40 tracking-wide font-light">
            Already have an account? <Link to="/login" className="text-gold hover:text-champagne transition-colors">Sign in</Link>
          </p>
        </motion.div>
      </GlassCard>
    </div>
  );
}
