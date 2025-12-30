import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X } from 'lucide-react';

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
          description: "For MVPs and landing pages",
          features: [
            { text: "Up to 5 Pages", included: true },
            { text: "Responsive Design", included: true },
            { text: "Basic Backend API", included: true },
            { text: "Contact Form", included: true },
            { text: "SEO Optimization", included: true },
            { text: "Admin Panel", included: false },
            { text: "Payment Integration", included: false },
            { text: "Custom Features", included: false }
          ],
          delivery: "7-10 days",
          popular: false
        },
        {
          name: "Business",
          price: "From $5,000",
          description: "For web applications",
          features: [
            { text: "Full Web Application", included: true },
            { text: "Admin Panel", included: true },
            { text: "User Authentication", included: true },
            { text: "Database Design", included: true },
            { text: "REST API", included: true },
            { text: "Payment Integration", included: true },
            { text: "Email Notifications", included: true },
            { text: "Real-time Features", included: false }
          ],
          delivery: "3-4 weeks",
          popular: true
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For complex platforms",
          features: [
            { text: "Everything in Business", included: true },
            { text: "Microservices Architecture", included: true },
            { text: "Real-time Features", included: true },
            { text: "Advanced Security", included: true },
            { text: "Multi-tenant System", included: true },
            { text: "CI/CD Pipeline", included: true },
            { text: "Load Balancing", included: true },
            { text: "24/7 Monitoring", included: true }
          ],
          delivery: "To be discussed",
          popular: false
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
          description: "MVP ve tanıtım siteleri için",
          features: [
            { text: "5 Sayfaya Kadar", included: true },
            { text: "Responsive Tasarım", included: true },
            { text: "Temel Backend API", included: true },
            { text: "İletişim Formu", included: true },
            { text: "SEO Optimizasyonu", included: true },
            { text: "Admin Panel", included: false },
            { text: "Ödeme Entegrasyonu", included: false },
            { text: "Özel Özellikler", included: false }
          ],
          delivery: "7-10 gün",
          popular: false
        },
        {
          name: "Business",
          price: "₺150.000'den",
          description: "Web uygulamaları için",
          features: [
            { text: "Tam Web Uygulaması", included: true },
            { text: "Admin Panel", included: true },
            { text: "Kullanıcı Kimlik Doğrulama", included: true },
            { text: "Veritabanı Tasarımı", included: true },
            { text: "REST API", included: true },
            { text: "Ödeme Entegrasyonu", included: true },
            { text: "E-posta Bildirimleri", included: true },
            { text: "Gerçek Zamanlı Özellikler", included: false }
          ],
          delivery: "3-4 hafta",
          popular: true
        },
        {
          name: "Enterprise",
          price: "Görüşme",
          description: "Karmaşık platformlar için",
          features: [
            { text: "Business'taki Her Şey", included: true },
            { text: "Microservices Mimarisi", included: true },
            { text: "Gerçek Zamanlı Özellikler", included: true },
            { text: "Gelişmiş Güvenlik", included: true },
            { text: "Çoklu Kiracı Sistemi", included: true },
            { text: "CI/CD Pipeline", included: true },
            { text: "Load Balancing", included: true },
            { text: "7/24 İzleme", included: true }
          ],
          delivery: "Görüşülecek",
          popular: false
        }
      ],
      note: "Kapsam dışı işler ayrıca fiyatlandırılır.",
      cta: "Teklif Al"
    }
  };

  const text = content[locale];

  return (
    <section id="packages" className="py-24 bg-[#0a0a0a] relative">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {text.packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${pkg.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-white text-black text-xs font-bold px-4 py-1 uppercase tracking-wider">
                    {locale === 'tr' ? 'Popüler' : 'Popular'}
                  </span>
                </div>
              )}

              <div className={`bg-[#0f0f0f] border h-full flex flex-col ${
                pkg.popular
                  ? 'border-white/30'
                  : 'border-white/10'
              }`}>
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {pkg.description}
                  </p>
                  <div className="text-3xl font-bold text-white">
                    {pkg.price}
                  </div>
                </div>

                {/* Features */}
                <div className="p-6 flex-grow">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-white flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-gray-600 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-gray-300 text-sm' : 'text-gray-600 text-sm'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10">
                  <p className="text-gray-500 text-xs mb-4">
                    {locale === 'tr' ? 'Teslim: ' : 'Delivery: '}{pkg.delivery}
                  </p>
                  <a
                    href="#contact"
                    className={`block text-center py-3 font-medium transition-all ${
                      pkg.popular
                        ? 'bg-white text-black hover:bg-gray-200'
                        : 'border border-white/30 text-white hover:bg-white hover:text-black'
                    }`}
                  >
                    {text.cta}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-gray-500 text-sm mt-8 border border-white/10 inline-block mx-auto px-6 py-3"
          style={{ display: 'table', margin: '2rem auto 0' }}
        >
          {text.note}
        </motion.p>
      </div>
    </section>
  );
}
