import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useQueries';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const { login } = useAuth();

  const [error, setError] = React.useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response: any = await loginMutation.mutateAsync({ email, password });
      if (response.data?.accessToken && response.data?.user) {
        login(response.data.user, response.data.accessToken);
        navigate('/dashboard');
      } else {
        throw new Error('No access token or user received');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center pt-20 px-4">
      <GlassCard className="w-full max-w-md p-10 border-bronze/10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2 className="text-4xl font-extralight tracking-tight text-champagne mb-2">Welcome Back</h2>
          <p className="text-champagne/40 text-sm font-light tracking-wide mb-8">Enter the dream.</p>

          <form onSubmit={handleLogin} className="space-y-6" noValidate>
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-light tracking-[0.2em] uppercase text-bronze">Email</label>
              <input 
                id="email"
                name="email"
                type="email" 
                required
                aria-required="true"
                className="w-full bg-charcoal/50 border border-bronze/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all text-champagne placeholder:text-champagne/20 font-light"
                placeholder="you@university.edu"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-light tracking-[0.2em] uppercase text-bronze">Password</label>
              <input 
                id="password"
                name="password"
                type="password" 
                required
                aria-required="true"
                className="w-full bg-charcoal/50 border border-bronze/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all text-champagne placeholder:text-champagne/20 font-light"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-400 text-xs tracking-wide" role="alert">{error}</p>}

            <Button type="submit" className="w-full mt-8 tracking-widest" size="lg" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-champagne/40 tracking-wide font-light">
            Don't have an account? <Link to="/signup" className="text-gold hover:text-champagne transition-colors">Sign up</Link>
          </p>
        </motion.div>
      </GlassCard>
    </div>
  );
}
