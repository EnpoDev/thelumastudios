import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Shield, Zap, Award, Clock, Users2 } from 'lucide-react';

export default function About({ locale = 'en' }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const content = {
    en: {
      badge: "Why Choose Us",
      title: "Trusted Development Partner for International Businesses",
      description: "We specialize in building production-ready web and mobile applications for businesses and investors who need reliable, scalable solutions with clear communication and predictable timelines.",
      whoWeServe: {
        title: "Who We Serve",
        description: "International businesses, startups raising funding, and investors looking for a technical partner who delivers on time and communicates clearly in English.",
        items: [
          "B2B SaaS companies scaling internationally",
          "Startups preparing for funding rounds",
          "Investment firms evaluating tech ventures",
          "Established businesses entering digital markets"
        ]
      },
      whatWeDo: {
        title: "What We Do",
        description: "We build custom web and mobile applications from MVP to production, with transparent pricing and fixed delivery timelines."
      },
      values: [
        {
          icon: Clock,
          title: "Predictable Delivery",
          description: "Fixed timelines. MVP in 7 days. Clear milestones. No surprises."
        },
        {
          icon: Shield,
          title: "Transparent Process",
          description: "Daily progress updates. Complete visibility into development. Fixed-price contracts."
        },
        {
          icon: Target,
          title: "Business Results First",
          description: "We focus on what drives your business metrics, not just features."
        },
        {
          icon: Zap,
          title: "Modern Tech Stack",
          description: "React, Next.js, Node.js, React Native. Battle-tested, scalable architecture."
        },
        {
          icon: Award,
          title: "Quality Standards",
          description: "Enterprise-grade code. Comprehensive testing. Documentation included."
        },
        {
          icon: Users2,
          title: "English Communication",
          description: "Clear communication across time zones. Native-level English proficiency."
        }
      ],
      differentiators: {
        title: "What Sets Us Apart",
        items: [
          {
            title: "Based in Turkey, Global Standards",
            description: "Enterprise quality at competitive rates. Overlap with US and EU working hours."
          },
          {
            title: "Fixed-Price Projects",
            description: "No hourly billing. Scope defined upfront. Budget certainty from day one."
          },
          {
            title: "1-Week MVP Delivery",
            description: "Get your core product to market fast. Iterate based on real user feedback."
          },
          {
            title: "Post-Launch Support",
            description: "Ongoing maintenance, updates, and scalability support as you grow."
          }
        ]
      },
      cta: "Schedule a Free Consultation"
    },
    tr: {
      badge: "Neden Biz",
      title: "Uluslararası İşletmeler için Güvenilir Geliştirme Ortağı",
      description: "Güvenilir, ölçeklenebilir çözümlere ihtiyaç duyan, net iletişim ve öngörülebilir zaman çizelgeleri bekleyen işletmeler ve yatırımcılar için üretime hazır web ve mobil uygulamalar geliştirmede uzmanız.",
      whoWeServe: {
        title: "Kimlere Hizmet Veriyoruz",
        description: "Uluslararası işletmeler, finansman arayan startuplar ve zamanında teslim eden ve İngilizce net iletişim kuran teknik bir ortak arayan yatırımcılar.",
        items: [
          "Uluslararası ölçeklenen B2B SaaS şirketleri",
          "Finansman turlarına hazırlanan startuplar",
          "Teknoloji girişimlerini değerlendiren yatırım firmaları",
          "Dijital pazarlara giren köklü işletmeler"
        ]
      },
      whatWeDo: {
        title: "Ne Yapıyoruz",
        description: "Şeffaf fiyatlandırma ve sabit teslimat zaman çizelgeleri ile MVP'den üretime özel web ve mobil uygulamalar geliştiriyoruz."
      },
      values: [
        {
          icon: Clock,
          title: "Öngörülebilir Teslimat",
          description: "Sabit zaman çizelgeleri. 7 günde MVP. Net kilometre taşları. Sürpriz yok."
        },
        {
          icon: Shield,
          title: "Şeffaf Süreç",
          description: "Günlük ilerleme raporları. Geliştirmeye tam görünürlük. Sabit fiyat sözleşmeleri."
        },
        {
          icon: Target,
          title: "İş Sonuçları Öncelikli",
          description: "Sadece özelliklere değil, iş metriklerinizi yönlendiren şeylere odaklanıyoruz."
        },
        {
          icon: Zap,
          title: "Modern Teknoloji Yığını",
          description: "React, Next.js, Node.js, React Native. Test edilmiş, ölçeklenebilir mimari."
        },
        {
          icon: Award,
          title: "Kalite Standartları",
          description: "Kurumsal düzeyde kod. Kapsamlı testler. Dokümantasyon dahil."
        },
        {
          icon: Users2,
          title: "İngilizce İletişim",
          description: "Saat dilimleri arasında net iletişim. Anadil seviyesinde İngilizce yeterliği."
        }
      ],
      differentiators: {
        title: "Bizi Farklı Kılan",
        items: [
          {
            title: "Türkiye Merkezli, Küresel Standartlar",
            description: "Rekabetçi fiyatlarla kurumsal kalite. ABD ve AB çalışma saatleriyle örtüşme."
          },
          {
            title: "Sabit Fiyatlı Projeler",
            description: "Saatlik faturalandırma yok. Kapsam baştan tanımlanır. İlk günden bütçe kesinliği."
          },
          {
            title: "1 Haftalık MVP Teslimatı",
            description: "Temel ürününüzü hızla pazara sunun. Gerçek kullanıcı geri bildirimlerine dayalı olarak yineleyin."
          },
          {
            title: "Lansman Sonrası Destek",
            description: "Büyüdükçe sürekli bakım, güncellemeler ve ölçeklenebilirlik desteği."
          }
        ]
      },
      cta: "Ücretsiz Danışma Talep Et"
    }
  };

  const text = content[locale];

  return (
    <section id="about" className="py-32 bg-[#181818] relative overflow-hidden">
      {/* Minimal background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-700 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-700 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm font-semibold mb-6 border border-white/20">
            {text.badge}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {text.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {text.description}
          </p>
        </motion.div>

        {/* Who We Serve & What We Do */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-purple-500/50 transition-all duration-500"
          >
            <h3 className="text-3xl font-bold text-white mb-4">{text.whoWeServe.title}</h3>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              {text.whoWeServe.description}
            </p>
            <ul className="space-y-3">
              {text.whoWeServe.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-200">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-purple-500/50 transition-all duration-500"
          >
            <h3 className="text-3xl font-bold text-white mb-4">{text.whatWeDo.title}</h3>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              {text.whatWeDo.description}
            </p>
            <div className="bg-purple-600/10 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-6 h-6 text-purple-400" />
                <span className="text-white font-semibold text-lg">
                  {locale === 'en' ? 'Typical Timeline' : 'Tipik Zaman Çizelgesi'}
                </span>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li className="flex justify-between">
                  <span>{locale === 'en' ? 'Discovery & Planning' : 'Keşif ve Planlama'}</span>
                  <span className="text-purple-400 font-medium">{locale === 'en' ? '2-3 days' : '2-3 gün'}</span>
                </li>
                <li className="flex justify-between">
                  <span>{locale === 'en' ? 'MVP Development' : 'MVP Geliştirme'}</span>
                  <span className="text-purple-400 font-medium">{locale === 'en' ? '5-7 days' : '5-7 gün'}</span>
                </li>
                <li className="flex justify-between">
                  <span>{locale === 'en' ? 'Testing & Deployment' : 'Test ve Dağıtım'}</span>
                  <span className="text-purple-400 font-medium">{locale === 'en' ? '2-3 days' : '2-3 gün'}</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Core Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            {locale === 'en' ? 'Our Commitments' : 'Taahhütlerimiz'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {text.values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-white/30 transition-all duration-300"
                >
                  <div className="mb-4">
                    <div className="inline-flex p-3 bg-white/10 rounded-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            {text.differentiators.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {text.differentiators.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="bg-gradient-to-br from-purple-700/10 to-blue-700/10 rounded-xl p-6 border border-purple-500/30"
              >
                <h4 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center"
        >
          <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 text-lg mb-6 max-w-2xl">
              {locale === 'en' 
                ? "Let's discuss your project requirements and see if we're a good fit. No pressure, no obligations."
                : "Proje gereksinimlerinizi tartışalım ve uyumlu olup olmadığımızı görelim. Baskı yok, yükümlülük yok."}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-purple-700/50"
            >
              {text.cta}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
