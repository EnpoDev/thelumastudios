import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Expertise({ locale = 'en' }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const content = {
    en: {
      title: "What We Build",
      items: [
        "Web Applications",
        "Admin Panels & Dashboards",
        "REST & GraphQL APIs",
        "E-Commerce Platforms",
        "SaaS Products",
        "Database Design",
        "Authentication & Security",
        "Payment Integrations",
        "Real-time Features",
        "Cloud Deployment"
      ]
    },
    tr: {
      title: "Ne Yapıyoruz",
      items: [
        "Web Uygulamaları",
        "Admin Panel & Dashboard",
        "REST & GraphQL API'ler",
        "E-Ticaret Platformları",
        "SaaS Ürünleri",
        "Veritabanı Tasarımı",
        "Kimlik Doğrulama & Güvenlik",
        "Ödeme Entegrasyonları",
        "Gerçek Zamanlı Özellikler",
        "Cloud Deployment"
      ]
    }
  };

  const text = content[locale];

  return (
    <section id="expertise" className="py-24 bg-[#0a0a0a] relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-white mb-16 text-center"
        >
          {text.title}
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
            {text.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-4 py-3 border-b border-white/10"
              >
                <div className="w-2 h-2 bg-white/40" />
                <span className="text-gray-300 text-lg">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-6">
            {locale === 'tr' ? 'Teknolojiler' : 'Technologies'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Tailwind CSS', 'REST API'].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 border border-white/10 text-gray-400 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
