import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero({ locale = 'en' }) {
  const content = {
    en: {
      title: "Fullstack Web Development Studio",
      subtitle: "We build web applications, admin panels, APIs, and complete digital products.",
      statement: "No hourly billing. Package-based projects with clear scope only.",
      cta: "See How We Work",
      scroll: "Scroll"
    },
    tr: {
      title: "Fullstack Web Geliştirme Stüdyosu",
      subtitle: "Web uygulamaları, admin paneller, API'ler ve komple dijital ürünler geliştiriyoruz.",
      statement: "Saatlik ücretlendirme yok. Paket bazlı, net kapsamlı projeler alıyoruz.",
      cta: "Nasıl Çalıştığımızı Gör",
      scroll: "Kaydır"
    }
  };

  const text = content[locale];

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      {/* Minimal grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Single accent line */}
      <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight"
          >
            {text.title}
          </motion.h1>

          {/* Subtitle - What I do */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-6 leading-relaxed"
          >
            {text.subtitle}
          </motion.p>

          {/* Statement - How I work */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-white/60 mb-12 border-l-2 border-white/20 pl-4 inline-block text-left"
          >
            {text.statement}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              href="#rules"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 font-medium"
            >
              {text.cta}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest">{text.scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
