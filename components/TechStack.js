import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Database, 
  Cloud, 
  Lock, 
  Zap, 
  Globe, 
  Code2, 
  Server, 
  Shield,
  Rocket,
  BarChart,
  GitBranch,
  Layers
} from 'lucide-react';

export default function TechStack({ locale = 'en' }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const technologies = [
    {
      icon: Database,
      titleEn: 'Supabase Database',
      titleTr: 'Supabase Veritabanı',
      descriptionEn: 'Global database management with real-time capabilities and PostgreSQL power.',
      descriptionTr: 'Gerçek zamanlı yetenekler ve PostgreSQL gücü ile global veritabanı yönetimi.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Cloud,
      titleEn: 'Cloud Infrastructure',
      titleTr: 'Bulut Altyapısı',
      descriptionEn: 'Scalable cloud hosting on Vercel, AWS, and Google Cloud platforms.',
      descriptionTr: 'Vercel, AWS ve Google Cloud platformlarında ölçeklenebilir bulut barındırma.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Shield,
      titleEn: 'Enterprise Security',
      titleTr: 'Kurumsal Güvenlik',
      descriptionEn: 'SSL/TLS encryption, GDPR compliance, and advanced security measures.',
      descriptionTr: 'SSL/TLS şifreleme, GDPR uyumluluğu ve gelişmiş güvenlik önlemleri.',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Zap,
      titleEn: 'Performance Optimization',
      titleTr: 'Performans Optimizasyonu',
      descriptionEn: 'Lighthouse scores 90+, lazy loading, code splitting, and CDN integration.',
      descriptionTr: 'Lighthouse skoru 90+, lazy loading, code splitting ve CDN entegrasyonu.',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Globe,
      titleEn: 'SEO & Analytics',
      titleTr: 'SEO & Analitik',
      descriptionEn: 'Advanced SEO optimization, Google Analytics, and performance monitoring.',
      descriptionTr: 'Gelişmiş SEO optimizasyonu, Google Analytics ve performans izleme.',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Code2,
      titleEn: 'Modern Frameworks',
      titleTr: 'Modern Frameworkler',
      descriptionEn: 'Next.js 14+, React 18+, TypeScript, and latest web technologies.',
      descriptionTr: 'Next.js 14+, React 18+, TypeScript ve en son web teknolojileri.',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Server,
      titleEn: 'API Development',
      titleTr: 'API Geliştirme',
      descriptionEn: 'RESTful and GraphQL APIs with authentication and rate limiting.',
      descriptionTr: 'Kimlik doğrulama ve rate limiting ile RESTful ve GraphQL API\'ler.',
      color: 'from-teal-500 to-green-600'
    },
    {
      icon: GitBranch,
      titleEn: 'CI/CD Pipeline',
      titleTr: 'CI/CD Pipeline',
      descriptionEn: 'Automated testing, deployment, and continuous integration workflows.',
      descriptionTr: 'Otomatik test, deployment ve sürekli entegrasyon iş akışları.',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Layers,
      titleEn: 'Microservices',
      titleTr: 'Mikroservisler',
      descriptionEn: 'Scalable microservices architecture with Docker and Kubernetes.',
      descriptionTr: 'Docker ve Kubernetes ile ölçeklenebilir mikroservis mimarisi.',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      icon: BarChart,
      titleEn: 'Real-time Monitoring',
      titleTr: 'Gerçek Zamanlı İzleme',
      descriptionEn: 'Application monitoring, error tracking, and performance analytics.',
      descriptionTr: 'Uygulama izleme, hata takibi ve performans analitiği.',
      color: 'from-pink-500 to-rose-600'
    },
    {
      icon: Lock,
      titleEn: 'Authentication',
      titleTr: 'Kimlik Doğrulama',
      descriptionEn: 'OAuth, JWT, and multi-factor authentication implementation.',
      descriptionTr: 'OAuth, JWT ve çok faktörlü kimlik doğrulama implementasyonu.',
      color: 'from-violet-500 to-purple-600'
    },
    {
      icon: Rocket,
      titleEn: 'Edge Computing',
      titleTr: 'Edge Computing',
      descriptionEn: 'Edge functions and serverless architecture for lightning-fast response.',
      descriptionTr: 'Yıldırım hızında yanıt için edge fonksiyonları ve serverless mimari.',
      color: 'from-fuchsia-500 to-pink-600'
    }
  ];

  const standards = [
    {
      titleEn: 'Code Quality',
      titleTr: 'Kod Kalitesi',
      items: [
        { en: 'Clean Code Principles', tr: 'Clean Code Prensipleri' },
        { en: 'SOLID Design Patterns', tr: 'SOLID Tasarım Desenleri' },
        { en: 'Code Reviews', tr: 'Kod İncelemeleri' },
        { en: 'ESLint & Prettier', tr: 'ESLint & Prettier' }
      ]
    },
    {
      titleEn: 'Performance',
      titleTr: 'Performans',
      items: [
        { en: 'Core Web Vitals Optimization', tr: 'Core Web Vitals Optimizasyonu' },
        { en: 'Image Optimization', tr: 'Görsel Optimizasyonu' },
        { en: 'Caching Strategies', tr: 'Önbellekleme Stratejileri' },
        { en: 'Bundle Size Optimization', tr: 'Paket Boyutu Optimizasyonu' }
      ]
    },
    {
      titleEn: 'Security',
      titleTr: 'Güvenlik',
      items: [
        { en: 'HTTPS Everywhere', tr: 'Her Yerde HTTPS' },
        { en: 'XSS & CSRF Protection', tr: 'XSS & CSRF Koruması' },
        { en: 'SQL Injection Prevention', tr: 'SQL Injection Önleme' },
        { en: 'Regular Security Audits', tr: 'Düzenli Güvenlik Denetimleri' }
      ]
    },
    {
      titleEn: 'Accessibility',
      titleTr: 'Erişilebilirlik',
      items: [
        { en: 'WCAG 2.1 Compliance', tr: 'WCAG 2.1 Uyumluluğu' },
        { en: 'Keyboard Navigation', tr: 'Klavye Navigasyonu' },
        { en: 'Screen Reader Support', tr: 'Ekran Okuyucu Desteği' },
        { en: 'Semantic HTML', tr: 'Anlamsal HTML' }
      ]
    }
  ];

  return (
    <section className="py-32 bg-[#181818] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-700 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-700 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4 border border-white/20">
            {locale === 'tr' ? 'Teknoloji & Standartlar' : 'Technology & Standards'}
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">
              {locale === 'tr' ? 'Sektörel Standartlara Uygun Kodlama' : 'Industry-Standard Development'}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {locale === 'tr' 
              ? 'En son teknolojiler ve sektör standartlarını kullanarak güvenli, ölçeklenebilir ve performanslı uygulamalar geliştiriyoruz'
              : 'We develop secure, scalable, and performant applications using the latest technologies and industry standards'}
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-transparent transition-all duration-300 h-full overflow-hidden">
                  {/* Gradient border on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`} />
                  <div className="absolute inset-[1px] bg-[#1a1a1a] rounded-xl" />
                  
                  <div className="relative z-10">
                    <div className={`mb-4 inline-flex p-3 bg-gradient-to-br ${tech.color} rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {locale === 'tr' ? tech.titleTr : tech.titleEn}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {locale === 'tr' ? tech.descriptionTr : tech.descriptionEn}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Standards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-4xl font-bold text-white text-center mb-12">
            {locale === 'tr' ? 'Geliştirme Standartlarımız' : 'Our Development Standards'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {standards.map((standard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-gradient-to-br from-purple-700/10 to-blue-700/10 rounded-2xl p-6 border border-gray-800 hover:border-purple-500 transition-all duration-300"
              >
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  {locale === 'tr' ? standard.titleTr : standard.titleEn}
                </h4>
                <ul className="space-y-3">
                  {standard.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">
                        {locale === 'tr' ? item.tr : item.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Logos/Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-8 text-lg">
            {locale === 'tr' ? 'Kullandığımız Teknolojiler' : 'Technologies We Use'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Next.js',
              'React',
              'TypeScript',
              'Node.js',
              'PostgreSQL',
              'Supabase',
              'Tailwind CSS',
              'AWS',
              'Vercel',
              'Docker',
              'GraphQL',
              'Prisma',
              'Redis',
              'MongoDB'
            ].map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium border border-white/20 hover:border-white hover:bg-white/20 transition-all cursor-default"
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
