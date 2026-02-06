import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X, Sparkles, ArrowRight, Clock } from 'lucide-react';
import { NeonButton } from './ui';

export default function Packages({ locale = 'en' }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const content = {
    en: {
      title: "Packages",
      subtitle: "Fixed scope. Fixed price. No hourly billing.",
      packages: [
        {
          name: "Starter",
          price: "From $2,500",
          description: "For new projects and websites",
          features: [
            { text: "Up to 5 Pages", included: true },
            { text: "Mobile-Friendly Design", included: true },
            { text: "Basic Backend System", included: true },
            { text: "Contact Form", included: true },
            { text: "Google-Friendly Setup", included: true },
            { text: "Admin Panel", included: false },
            { text: "Payment Integration", included: false },
            { text: "Custom Features", included: false }
          ],
          delivery: "7-10 days",
          popular: false,
          accent: "cyan"
        },
        {
          name: "Business",
          price: "From $5,000",
          description: "For web applications",
          features: [
            { text: "Full Web Application", included: true },
            { text: "Admin Panel", included: true },
            { text: "User Login System", included: true },
            { text: "Database Design", included: true },
            { text: "Backend System", included: true },
            { text: "Payment Integration", included: true },
            { text: "Email Notifications", included: true },
            { text: "Live Updates", included: false }
          ],
          delivery: "3-4 weeks",
          popular: true,
          accent: "pink"
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For complex platforms",
          features: [
            { text: "Everything in Business", included: true },
            { text: "Scalable Architecture", included: true },
            { text: "Live Updates", included: true },
            { text: "Advanced Security", included: true },
            { text: "Multi-Company Support", included: true },
            { text: "Automated Deployment", included: true },
            { text: "High-Traffic Ready", included: true },
            { text: "24/7 Monitoring", included: true }
          ],
          delivery: "To be discussed",
          popular: false,
          accent: "purple"
        }
      ],
      note: "Out-of-scope work is priced separately.",
      cta: "Request Quote"
    },
    tr: {
      title: "Paketler",
      subtitle: "Net kapsam. Net fiyat. Saatlik ücretlendirme yok.",
      packages: [
        {
          name: "Starter",
          price: "₺75.000'den",
          description: "Yeni projeler ve web siteleri için",
          features: [
            { text: "5 Sayfaya Kadar", included: true },
            { text: "Mobil Uyumlu Tasarım", included: true },
            { text: "Temel Altyapı Sistemi", included: true },
            { text: "İletişim Formu", included: true },
            { text: "Google Uyumlu Yapı", included: true },
            { text: "Admin Panel", included: false },
            { text: "Ödeme Entegrasyonu", included: false },
            { text: "Özel Özellikler", included: false }
          ],
          delivery: "7-10 gün",
          popular: false,
          accent: "cyan"
        },
        {
          name: "Business",
          price: "₺150.000'den",
          description: "Web uygulamaları için",
          features: [
            { text: "Tam Web Uygulaması", included: true },
            { text: "Admin Panel", included: true },
            { text: "Kullanıcı Giriş Sistemi", included: true },
            { text: "Veritabanı Tasarımı", included: true },
            { text: "Altyapı Sistemi", included: true },
            { text: "Ödeme Entegrasyonu", included: true },
            { text: "E-posta Bildirimleri", included: true },
            { text: "Canlı Güncellemeler", included: false }
          ],
          delivery: "3-4 hafta",
          popular: true,
          accent: "pink"
        },
        {
          name: "Enterprise",
          price: "Görüşme",
          description: "Karmaşık platformlar için",
          features: [
            { text: "Business'taki Her Şey", included: true },
            { text: "Ölçeklenebilir Mimari", included: true },
            { text: "Canlı Güncellemeler", included: true },
            { text: "Gelişmiş Güvenlik", included: true },
            { text: "Çoklu Şirket Desteği", included: true },
            { text: "Otomatik Yayınlama", included: true },
            { text: "Yüksek Trafik Desteği", included: true },
            { text: "7/24 İzleme", included: true }
          ],
          delivery: "Görüşülecek",
          popular: false,
          accent: "purple"
        }
      ],
      note: "Kapsam dışı işler ayrıca fiyatlandırılır.",
      cta: "Teklif Al"
    }
  };

  const text = content[locale];

  const accentStyles = {
    cyan: {
      border: 'border-neon-cyan/20',
      borderHover: 'hover:border-neon-cyan/40',
      glow: 'hover:shadow-neon-cyan-sm',
      badge: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30',
      price: 'text-neon-cyan',
      check: 'text-neon-cyan',
    },
    pink: {
      border: 'border-neon-pink/30',
      borderHover: 'hover:border-neon-pink/50',
      glow: 'hover:shadow-neon-pink-sm',
      badge: 'bg-neon-pink/10 text-neon-pink border-neon-pink/30',
      price: 'text-neon-pink',
      check: 'text-neon-pink',
    },
    purple: {
      border: 'border-neon-purple/20',
      borderHover: 'hover:border-neon-purple/40',
      glow: 'hover:shadow-neon-purple',
      badge: 'bg-neon-purple/10 text-neon-purple border-neon-purple/30',
      price: 'text-neon-purple',
      check: 'text-neon-purple',
    },
  };

  return (
    <section id="packages" className="py-24 bg-cyber-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-neon-pink/10 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="neon-text">{text.title}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {text.packages.map((pkg, index) => {
            const styles = accentStyles[pkg.accent];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${pkg.popular ? 'md:-mt-6 md:mb-6' : ''}`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ type: 'spring', delay: 0.3 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                  >
                    <span className="flex items-center gap-1.5 bg-gradient-to-r from-neon-cyan to-neon-pink text-cyber-dark text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-neon-glow">
                      <Sparkles className="w-3 h-3" />
                      {locale === 'tr' ? 'Popüler' : 'Popular'}
                    </span>
                  </motion.div>
                )}

                {/* Card */}
                <motion.div
                  whileHover={{ y: -8 }}
                  className={`
                    relative h-full flex flex-col rounded-xl overflow-hidden
                    bg-cyber-card/80 backdrop-blur-sm
                    border ${styles.border} ${styles.borderHover}
                    transition-all duration-300 ${styles.glow}
                    ${pkg.popular ? 'ring-1 ring-neon-pink/30' : ''}
                  `}
                >
                  {/* Gradient line on top */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${
                    pkg.accent === 'cyan' ? 'from-neon-cyan/50 to-neon-blue/50' :
                    pkg.accent === 'pink' ? 'from-neon-pink/50 to-neon-purple/50' :
                    'from-neon-purple/50 to-neon-pink/50'
                  }`} />

                  {/* Header */}
                  <div className="p-6 border-b border-white/5">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      {pkg.description}
                    </p>
                    <div className={`text-3xl font-bold ${styles.price}`}>
                      {pkg.price}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          className="flex items-center gap-3"
                        >
                          {feature.included ? (
                            <div className={`w-5 h-5 rounded-full bg-${pkg.accent === 'cyan' ? 'neon-cyan' : pkg.accent === 'pink' ? 'neon-pink' : 'neon-purple'}/10 flex items-center justify-center`}>
                              <Check className={`w-3 h-3 ${styles.check}`} />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center">
                              <X className="w-3 h-3 text-gray-600" />
                            </div>
                          )}
                          <span className={feature.included ? 'text-gray-300 text-sm' : 'text-gray-600 text-sm line-through'}>
                            {feature.text}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
                      <Clock className="w-3.5 h-3.5" />
                      {locale === 'tr' ? 'Teslim: ' : 'Delivery: '}{pkg.delivery}
                    </div>

                    <a
                      href="#contact"
                      className={`
                        group flex items-center justify-center gap-2 w-full py-3 rounded-lg font-medium
                        transition-all duration-300
                        ${pkg.popular
                          ? 'bg-gradient-to-r from-neon-cyan to-neon-pink text-cyber-dark hover:shadow-neon-glow'
                          : `border ${styles.border} text-white hover:bg-white/5`
                        }
                      `}
                    >
                      {text.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-10"
        >
          <p className="text-gray-500 text-sm px-6 py-3 rounded-lg border border-white/10 bg-cyber-card/30">
            {text.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
