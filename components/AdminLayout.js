import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3, LogOut, Menu, X,
  LayoutDashboard, MessageSquare, Briefcase,
  Users, TrendingUp, Settings, Zap
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'cyan' },
  { href: '/admin/contacts', label: 'Contacts', icon: MessageSquare, color: 'pink' },
  { href: '/admin/projects', label: 'Projects', icon: Briefcase, color: 'purple' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Users, color: 'green' },
  { href: '/admin/statistics', label: 'Statistics', icon: TrendingUp, color: 'cyan' },
];

export default function AdminLayout({ children, title }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth?action=session')
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push('/admin');
        } else {
          setAuthenticated(true);
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth?action=logout', { method: 'POST' });
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center relative overflow-hidden">
        {/* Cyber grid background */}
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/10 rounded-full filter blur-3xl animate-pulse delay-1000" />

        <div className="text-center relative z-10">
          <motion.div
            className="inline-block"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-pink p-[2px]">
              <div className="w-full h-full rounded-xl bg-cyber-dark flex items-center justify-center">
                <Zap className="w-8 h-8 text-neon-cyan" />
              </div>
            </div>
          </motion.div>
          <p className="mt-4 text-gray-400 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  const currentPath = router.pathname;

  const getColorClasses = (color, isActive) => {
    if (isActive) {
      return color === 'cyan' ? 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50' :
             color === 'pink' ? 'bg-neon-pink/20 text-neon-pink border-neon-pink/50' :
             color === 'purple' ? 'bg-neon-purple/20 text-neon-purple border-neon-purple/50' :
             'bg-neon-green/20 text-neon-green border-neon-green/50';
    }
    return 'text-gray-400 hover:text-white border-transparent';
  };

  const getIconColor = (color, isActive) => {
    if (isActive) {
      return color === 'cyan' ? 'text-neon-cyan' :
             color === 'pink' ? 'text-neon-pink' :
             color === 'purple' ? 'text-neon-purple' :
             'text-neon-green';
    }
    return 'text-gray-500 group-hover:text-gray-300';
  };

  return (
    <>
      <Head>
        <title>{title} - Luma Studios Admin</title>
      </Head>
      <div className="min-h-screen bg-cyber-dark relative">
        {/* Background effects */}
        <div className="fixed inset-0 cyber-grid opacity-10 pointer-events-none" />
        <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-neon-pink/5 rounded-full filter blur-3xl pointer-events-none" />

        {/* Navigation */}
        <nav className="bg-cyber-darker/80 backdrop-blur-xl border-b border-neon-cyan/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Logo and Desktop Nav */}
              <div className="flex items-center space-x-8">
                <Link href="/admin/dashboard" className="flex-shrink-0 flex items-center group">
                  <motion.div
                    className="bg-gradient-to-r from-neon-cyan to-neon-pink w-10 h-10 rounded-lg flex items-center justify-center mr-3 shadow-neon-cyan-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <BarChart3 className="w-6 h-6 text-cyber-dark" />
                  </motion.div>
                  <h1 className="text-xl font-bold neon-text hidden lg:block">
                    Luma Studios
                  </h1>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:space-x-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = currentPath === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                      >
                        <motion.div
                          className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${getColorClasses(item.color, isActive)}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Icon className={`w-4 h-4 ${getIconColor(item.color, isActive)}`} />
                          <span>{item.label}</span>
                          {isActive && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-pink"
                              initial={false}
                            />
                          )}
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-3">
                {/* Logout Button */}
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-400 hover:text-red-400 bg-cyber-card/50 hover:bg-red-500/10 border border-white/10 hover:border-red-500/50 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </motion.button>

                {/* Mobile menu button */}
                <motion.button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden text-gray-400 hover:text-neon-cyan p-2 rounded-lg border border-white/10 hover:border-neon-cyan/30 transition-all"
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                      >
                        <X className="w-6 h-6 text-neon-cyan" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                      >
                        <Menu className="w-6 h-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-cyber-darker/95 backdrop-blur-xl border-t border-neon-cyan/10 overflow-hidden"
              >
                <div className="px-4 py-3 space-y-1">
                  {NAV_ITEMS.map((item, index) => {
                    const isActive = currentPath === item.href;
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all border ${getColorClasses(item.color, isActive)}`}
                        >
                          <Icon className={`w-5 h-5 ${getIconColor(item.color, isActive)}`} />
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="px-4 py-6 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      <style jsx global>{`
        /* Admin specific neon text variants */
        .neon-text-pink {
          background: linear-gradient(90deg, #FF00FF, #BF00FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .neon-text-purple {
          background: linear-gradient(90deg, #BF00FF, #FF00FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .neon-text-green {
          background: linear-gradient(90deg, #00FF88, #00FFFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </>
  );
}
