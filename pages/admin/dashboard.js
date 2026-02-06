import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/AdminLayout';
import { FolderKanban, MessageSquare, TrendingUp, Plus, Mail, Zap, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, testimonials: 0, contacts: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [projectsRes, testimonialsRes, contactsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/testimonials'),
        fetch('/api/contacts'),
      ]);

      const projects = await projectsRes.json();
      const testimonials = await testimonialsRes.json();
      const contacts = await contactsRes.json();

      setStats({
        projects: projects.length,
        testimonials: testimonials.length,
        contacts: Array.isArray(contacts) ? contacts.length : 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FolderKanban,
      color: 'cyan',
      href: '/admin/projects',
      linkText: 'Manage projects',
    },
    {
      title: 'Contact Requests',
      value: stats.contacts,
      icon: Mail,
      color: 'pink',
      href: '/admin/contacts',
      linkText: 'View requests',
    },
    {
      title: 'Total Testimonials',
      value: stats.testimonials,
      icon: MessageSquare,
      color: 'purple',
      href: '/admin/testimonials',
      linkText: 'Manage testimonials',
    },
  ];

  const getColorClasses = (color) => ({
    border: color === 'cyan' ? 'border-neon-cyan/20 hover:border-neon-cyan/50' :
            color === 'pink' ? 'border-neon-pink/20 hover:border-neon-pink/50' :
            'border-neon-purple/20 hover:border-neon-purple/50',
    glow: color === 'cyan' ? 'hover:shadow-neon-cyan-sm' :
          color === 'pink' ? 'hover:shadow-neon-pink-sm' :
          'hover:shadow-neon-purple',
    icon: color === 'cyan' ? 'from-neon-cyan to-neon-blue' :
          color === 'pink' ? 'from-neon-pink to-neon-purple' :
          'from-neon-purple to-neon-pink',
    text: color === 'cyan' ? 'text-neon-cyan' :
          color === 'pink' ? 'text-neon-pink' :
          'text-neon-purple',
    bg: color === 'cyan' ? 'bg-neon-cyan/10' :
        color === 'pink' ? 'bg-neon-pink/10' :
        'bg-neon-purple/10',
    gradient: color === 'cyan' ? 'from-neon-cyan/50 to-neon-blue/50' :
              color === 'pink' ? 'from-neon-pink/50 to-neon-purple/50' :
              'from-neon-purple/50 to-neon-pink/50',
  });

  return (
    <AdminLayout title="Dashboard">
      {/* Welcome Section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Welcome <span className="neon-text">Back</span>
        </h2>
        <p className="text-gray-400 text-lg">Here&apos;s what&apos;s happening with your projects today.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => {
          const colors = getColorClasses(card.color);
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className={`relative bg-cyber-card/80 backdrop-blur-sm border ${colors.border} rounded-xl overflow-hidden transition-all duration-300 ${colors.glow}`}>
                {/* Gradient line on top */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colors.gradient}`} />

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`bg-gradient-to-r ${colors.icon} w-14 h-14 rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-cyber-dark" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-400 mb-1">{card.title}</p>
                      <motion.p
                        className={`text-4xl font-bold ${colors.text}`}
                        key={card.value}
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                      >
                        {card.value}
                      </motion.p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <Link
                      href={card.href}
                      className={`flex items-center justify-between text-sm font-medium ${colors.text} hover:opacity-80 transition-opacity group`}
                    >
                      <span>{card.linkText}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-cyber-card/80 backdrop-blur-sm border border-neon-green/20 rounded-xl p-6 relative overflow-hidden"
      >
        {/* Gradient line on top */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-green/50 to-neon-cyan/50" />

        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-neon-green to-neon-cyan w-10 h-10 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-cyber-dark" />
          </div>
          <h3 className="text-xl font-bold text-white">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/admin/projects">
            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-neon-cyan to-neon-blue text-cyber-dark font-semibold py-4 px-6 rounded-xl text-center transition-all shadow-neon-cyan-sm hover:shadow-neon-cyan"
            >
              <div className="flex items-center justify-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Add Project</span>
              </div>
            </motion.div>
          </Link>
          <Link href="/admin/testimonials">
            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-neon-pink to-neon-purple text-cyber-dark font-semibold py-4 px-6 rounded-xl text-center transition-all shadow-neon-pink-sm hover:shadow-neon-pink"
            >
              <div className="flex items-center justify-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Add Testimonial</span>
              </div>
            </motion.div>
          </Link>
          <Link href="/admin/statistics">
            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-neon-green to-neon-cyan text-cyber-dark font-semibold py-4 px-6 rounded-xl text-center transition-all shadow-[0_0_15px_rgba(0,255,136,0.3)] hover:shadow-[0_0_25px_rgba(0,255,136,0.4)]"
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Update Stats</span>
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
