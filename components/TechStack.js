import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';

export default function LiveDemo({ locale = 'en' }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const content = {
    en: {
      title: "Live Projects",
      subtitle: "Don't take our word for it. See it working.",
      demos: [
        {
          title: "E-Commerce Platform",
          description: "Full-stack e-commerce with admin panel, payments, and inventory",
          tech: "Next.js + Node.js + PostgreSQL + Stripe",
          link: "#",
          status: "Live"
        },
        {
          title: "SaaS Application",
          description: "Multi-tenant platform with subscriptions and team management",
          tech: "React + Express + MongoDB + Redis",
          link: "#",
          status: "Live"
        },
        {
          title: "Real-time Dashboard",
          description: "Analytics dashboard with live data and custom reporting",
          tech: "Next.js + GraphQL + WebSocket",
          link: "#",
          status: "Demo"
        }
      ],
      viewDemo: "View Demo",
      note: "Demo credentials will be provided upon request"
    },
    tr: {
      title: "Canlı Projeler",
      subtitle: "Lafla değil, görerek karar ver.",
      demos: [
        {
          title: "E-Ticaret Platformu",
          description: "Admin panel, ödeme ve stok yönetimli tam e-ticaret sistemi",
          tech: "Next.js + Node.js + PostgreSQL + Stripe",
          link: "#",
          status: "Canlı"
        },
        {
          title: "SaaS Uygulaması",
          description: "Abonelik ve takım yönetimli çoklu kiracı platform",
          tech: "React + Express + MongoDB + Redis",
          link: "#",
          status: "Canlı"
        },
        {
          title: "Gerçek Zamanlı Dashboard",
          description: "Canlı veri ve özel raporlama içeren analitik paneli",
          tech: "Next.js + GraphQL + WebSocket",
          link: "#",
          status: "Demo"
        }
      ],
      viewDemo: "Demo'yu Gör",
      note: "Demo giriş bilgileri talep üzerine paylaşılır"
    }
  };

  const text = content[locale];

  return (
    <section id="demos" className="py-24 bg-[#0f0f0f] relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {text.title}
          </h2>
          <p className="text-gray-500 text-lg">
            {text.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {text.demos.map((demo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-[#0a0a0a] border border-white/10 p-6 h-full flex flex-col hover:border-white/30 transition-all duration-300">
                {/* Status badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs uppercase tracking-widest text-gray-500">
                    {demo.status}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {demo.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 flex-grow">
                  {demo.description}
                </p>

                {/* Tech */}
                <p className="text-gray-600 text-xs mb-6">
                  {demo.tech}
                </p>

                {/* Link */}
                <a
                  href={demo.link}
                  className="inline-flex items-center gap-2 text-white text-sm font-medium group-hover:gap-3 transition-all"
                >
                  {text.viewDemo}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-gray-600 text-sm mt-8"
        >
          {text.note}
        </motion.p>
      </div>
    </section>
  );
}
