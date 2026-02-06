import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Globe, LayoutDashboard, Server, ShoppingCart,
  Repeat, Database, Lock, CreditCard, Bell, Cloud
} from 'lucide-react';

export default function Expertise({ locale = 'en' }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const content = {
    en: {
      title: "What We Build",
      subtitle: "Enterprise-grade solutions for modern businesses",
      items: [
        { name: "Web Applications", icon: Globe, color: "cyan" },
        { name: "Admin Panels & Dashboards", icon: LayoutDashboard, color: "pink" },
        { name: "Backend Systems", icon: Server, color: "purple" },
        { name: "E-Commerce Platforms", icon: ShoppingCart, color: "green" },
        { name: "Subscription-based Products", icon: Repeat, color: "cyan" },
        { name: "Database Design", icon: Database, color: "pink" },
        { name: "Login & Security Systems", icon: Lock, color: "purple" },
        { name: "Payment Integrations", icon: CreditCard, color: "green" },
        { name: "Live Updates & Notifications", icon: Bell, color: "cyan" },
        { name: "Server Setup & Hosting", icon: Cloud, color: "pink" }
      ]
    },
    tr: {
      title: "Ne Yapıyoruz",
      subtitle: "Modern işletmeler için kurumsal çözümler",
      items: [
        { name: "Web Uygulamaları", icon: Globe, color: "cyan" },
        { name: "Admin Panel & Yönetim Panelleri", icon: LayoutDashboard, color: "pink" },
        { name: "Altyapı Sistemleri", icon: Server, color: "purple" },
        { name: "E-Ticaret Platformları", icon: ShoppingCart, color: "green" },
        { name: "Abonelik Tabanlı Ürünler", icon: Repeat, color: "cyan" },
        { name: "Veritabanı Tasarımı", icon: Database, color: "pink" },
        { name: "Giriş & Güvenlik Sistemleri", icon: Lock, color: "purple" },
        { name: "Ödeme Entegrasyonları", icon: CreditCard, color: "green" },
        { name: "Canlı Güncellemeler & Bildirimler", icon: Bell, color: "cyan" },
        { name: "Sunucu Kurulumu & Barındırma", icon: Cloud, color: "pink" }
      ]
    }
  };

  const text = content[locale];

  const colorClasses = {
    cyan: {
      icon: 'text-neon-cyan',
      bg: 'bg-neon-cyan/10',
      border: 'border-neon-cyan/20',
      glow: 'group-hover:shadow-neon-cyan-sm',
    },
    pink: {
      icon: 'text-neon-pink',
      bg: 'bg-neon-pink/10',
      border: 'border-neon-pink/20',
      glow: 'group-hover:shadow-neon-pink-sm',
    },
    purple: {
      icon: 'text-neon-purple',
      bg: 'bg-neon-purple/10',
      border: 'border-neon-purple/20',
      glow: 'group-hover:shadow-neon-purple',
    },
    green: {
      icon: 'text-neon-green',
      bg: 'bg-neon-green/10',
      border: 'border-neon-green/20',
      glow: 'group-hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]',
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="expertise" className="py-24 bg-cyber-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-neon-pink/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {text.title.split(' ')[0]}{' '}
            <span className="neon-text">{text.title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {text.items.map((item, index) => {
              const colors = colorClasses[item.color];
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`
                    group relative flex items-center gap-4 p-4 rounded-xl
                    bg-cyber-card/50 border ${colors.border}
                    hover:bg-cyber-card hover:border-opacity-50
                    transition-all duration-300 cursor-default
                    ${colors.glow}
                  `}
                  whileHover={{ x: 5, scale: 1.01 }}
                >
                  {/* Icon */}
                  <div className={`
                    w-10 h-10 rounded-lg ${colors.bg}
                    flex items-center justify-center flex-shrink-0
                    transition-all duration-300
                    group-hover:scale-110
                  `}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>

                  {/* Text */}
                  <span className="text-gray-300 group-hover:text-white transition-colors text-lg">
                    {item.name}
                  </span>

                  {/* Hover line */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-8 bg-gradient-to-r from-transparent to-transparent group-hover:w-1 group-hover:bg-gradient-to-b group-hover:from-neon-cyan group-hover:to-neon-pink transition-all duration-300 rounded-r" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-6">
            {locale === 'tr' ? 'Teknolojiler' : 'Technologies'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Tailwind CSS', 'REST API'].map((tech, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 rounded-lg bg-cyber-card/50 border border-white/10 text-gray-400 text-sm hover:border-neon-cyan/30 hover:text-neon-cyan transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
