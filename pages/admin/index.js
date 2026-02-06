import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Mail, LogIn, Zap, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if already logged in
    fetch('/api/auth?action=session')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          router.push('/admin/dashboard');
        }
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth?action=login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Memoize particles to prevent re-render
  const particles = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      key: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 3,
      color: ['#00FFFF', '#FF00FF', '#BF00FF', '#00FF88'][Math.floor(Math.random() * 4)],
    }));
  }, []);

  return (
    <>
      <Head>
        <title>Admin Login - Luma Studios</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-cyber-dark relative overflow-hidden">
        {/* Cyber grid background */}
        <div className="absolute inset-0 cyber-grid opacity-20" />

        {/* Animated background orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-neon-purple/10 rounded-full filter blur-3xl animate-pulse delay-500" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.key}
              className="absolute w-1.5 h-1.5 rounded-full opacity-30"
              style={{
                left: particle.left,
                top: particle.top,
                backgroundColor: particle.color,
                boxShadow: `0 0 6px ${particle.color}`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-4 relative z-10"
        >
          <div className="bg-cyber-card/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-neon-cyan/20 relative overflow-hidden">
            {/* Gradient lines */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple" />
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan" />

            {/* Logo & Title */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-neon-cyan to-neon-pink rounded-xl mb-4 shadow-neon-cyan-sm"
              >
                <Zap className="w-8 h-8 text-cyber-dark" />
              </motion.div>
              <h1 className="text-3xl font-bold neon-text mb-2">
                Luma Studios
              </h1>
              <p className="text-gray-400">Admin Panel</p>
            </div>

            <form onSubmit={handleSubmit}>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
                >
                  <span className="text-red-400">!</span>
                  <span>{error}</span>
                </motion.div>
              )}

              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Email / Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-neon-cyan transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-cyber-dark border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/30 transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-neon-pink transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-cyber-dark border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/30 transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-neon-cyan to-neon-pink hover:from-neon-cyan/90 hover:to-neon-pink/90 text-cyber-dark font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:ring-offset-2 focus:ring-offset-cyber-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-neon-glow hover:shadow-neon-glow-lg"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-cyber-dark/30 border-t-cyber-dark rounded-full animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Login to Dashboard</span>
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-cyan text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Website
              </Link>
            </div>
          </div>

          {/* Decorative glow elements */}
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-neon-pink/20 rounded-full filter blur-3xl" />
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-neon-cyan/20 rounded-full filter blur-3xl" />
        </motion.div>
      </div>
    </>
  );
}
