import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Zap, Code2 } from 'lucide-react';
import { NeonButton } from './ui';
import CyberBackground, { FloatingParticles } from './ui/CyberBackground';
import { GradientHeading } from './ui/GlowText';

export default function Hero({ locale = 'en' }) {
  const content = {
    en: {
      badge: "Web Development Studio",
      title: "We Build",
      titleHighlight: "Digital Dreams",
      subtitle: "Web applications, admin panels, APIs, and complete digital products.",
      statement: "No hourly billing. Package-based projects with clear scope.",
      cta: "See How We Work",
      ctaSecondary: "View Packages",
      scroll: "Scroll to explore",
      features: [
        { icon: Zap, text: "Fast Delivery" },
        { icon: Code2, text: "Clean Code" },
        { icon: Sparkles, text: "Modern Stack" },
      ]
    },
    tr: {
      badge: "Web Geliştirme Stüdyosu",
      title: "Dijital",
      titleHighlight: "Hayalleri İnşa Ediyoruz",
      subtitle: "Web uygulamaları, admin paneller, API'ler ve komple dijital ürünler.",
      statement: "Saatlik ücretlendirme yok. Paket bazlı, net kapsamlı projeler.",
      cta: "Nasıl Çalışıyoruz?",
      ctaSecondary: "Paketleri Gör",
      scroll: "Keşfetmek için kaydır",
      features: [
        { icon: Zap, text: "Hızlı Teslimat" },
        { icon: Code2, text: "Temiz Kod" },
        { icon: Sparkles, text: "Modern Teknoloji" },
      ]
    }
  };

  const text = content[locale];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative min-h-screen bg-cyber-dark flex items-center justify-center overflow-hidden">
      {/* Cyber Background */}
      <CyberBackground
        variant="full"
        particleCount={20}
        className="absolute inset-0"
      />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large cyan orb */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
            top: '-20%',
            right: '-10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Large pink orb */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 255, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
            bottom: '-15%',
            left: '-10%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Purple accent orb */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(191, 0, 255, 0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating triangle */}
        <motion.div
          className="absolute w-20 h-20 border-2 border-neon-cyan/20"
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            top: '20%',
            left: '10%',
          }}
          animate={{
            rotate: [0, 360],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating square */}
        <motion.div
          className="absolute w-16 h-16 border-2 border-neon-pink/20 rounded-lg"
          style={{
            top: '60%',
            right: '15%',
          }}
          animate={{
            rotate: [0, -360],
            y: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating circle */}
        <motion.div
          className="absolute w-12 h-12 border-2 border-neon-purple/20 rounded-full"
          style={{
            top: '30%',
            right: '25%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Code brackets decoration */}
        <motion.div
          className="absolute text-6xl font-mono text-neon-cyan/10"
          style={{ top: '15%', right: '20%' }}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {'</>'}
        </motion.div>

        <motion.div
          className="absolute text-4xl font-mono text-neon-pink/10"
          style={{ bottom: '25%', left: '15%' }}
          animate={{ opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          {'{ }'}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="neon-badge neon-badge-cyan">
              <Sparkles className="w-3 h-3 mr-2" />
              {text.badge}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 tracking-tight">
              {text.title}{' '}
              <span className="neon-text glitch">{text.titleHighlight}</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-400 mb-6 max-w-3xl mx-auto leading-relaxed"
          >
            {text.subtitle}
          </motion.p>

          {/* Statement with neon border */}
          <motion.div
            variants={itemVariants}
            className="inline-block mb-10"
          >
            <p className="text-lg text-white/70 border-l-2 border-neon-cyan pl-4 text-left">
              {text.statement}
            </p>
          </motion.div>

          {/* Feature badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {text.features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
                whileHover={{
                  borderColor: 'rgba(0, 255, 255, 0.3)',
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
                }}
              >
                <feature.icon className="w-4 h-4 text-neon-cyan" />
                <span className="text-sm text-gray-300">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <NeonButton
              href="#rules"
              variant="cyan"
              size="lg"
            >
              {text.cta}
            </NeonButton>

            <NeonButton
              href="#packages"
              variant="outline"
              size="lg"
            >
              {text.ctaSecondary}
            </NeonButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest">
          {text.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <div className="w-6 h-10 border-2 border-neon-cyan/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-neon-cyan rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyber-dark to-transparent pointer-events-none" />
    </section>
  );
}
