import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Smartphone, ShoppingCart, Palette, Zap, Headphones } from 'lucide-react';

export default function Services({ locale = 'en' }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const services = [
    {
      icon: Code,
      titleEn: 'Web Development',
      titleTr: 'Web Geliştirme',
      descriptionEn: 'Custom web applications built with modern technologies for scalability and performance.',
      descriptionTr: 'Ölçeklenebilirlik ve performans için modern teknolojilerle özel web uygulamaları.',
      features: [
        { en: 'Responsive Design', tr: 'Responsive Tasarım' },
        { en: 'SEO Optimized', tr: 'SEO Optimize' },
        { en: 'Fast Loading', tr: 'Hızlı Yükleme' }
      ]
    },
    {
      icon: Smartphone,
      titleEn: 'Mobile Apps',
      titleTr: 'Mobil Uygulamalar',
      descriptionEn: 'Native and cross-platform mobile applications for iOS and Android.',
      descriptionTr: 'iOS ve Android için native ve cross-platform mobil uygulamalar.',
      features: [
        { en: 'iOS & Android', tr: 'iOS & Android' },
        { en: 'React Native', tr: 'React Native' },
        { en: 'App Store Ready', tr: 'App Store Hazır' }
      ]
    },
    {
      icon: ShoppingCart,
      titleEn: 'E-Commerce Solutions',
      titleTr: 'E-Ticaret Çözümleri',
      descriptionEn: 'Complete e-commerce platforms with payment integration and inventory management.',
      descriptionTr: 'Ödeme entegrasyonu ve stok yönetimi ile eksiksiz e-ticaret platformları.',
      features: [
        { en: 'Payment Gateway', tr: 'Ödeme Entegrasyonu' },
        { en: 'Admin Dashboard', tr: 'Admin Paneli' },
        { en: 'Analytics', tr: 'Analitik' }
      ]
    },
    {
      icon: Palette,
      titleEn: 'UI/UX Design',
      titleTr: 'UI/UX Tasarım',
      descriptionEn: 'Beautiful, intuitive designs that enhance user experience and engagement.',
      descriptionTr: 'Kullanıcı deneyimini ve etkileşimi artıran güzel, sezgisel tasarımlar.',
      features: [
        { en: 'User Research', tr: 'Kullanıcı Araştırması' },
        { en: 'Wireframing', tr: 'Wireframe' },
        { en: 'Prototyping', tr: 'Prototipleme' }
      ]
    },
    {
      icon: Zap,
      titleEn: 'MVP Development',
      titleTr: 'MVP Geliştirme',
      descriptionEn: 'Quick MVP delivery in 1 week to validate your business idea.',
      descriptionTr: 'İş fikrinizi doğrulamak için 1 haftada hızlı MVP teslimi.',
      features: [
        { en: '1 Week Delivery', tr: '1 Hafta Teslimat' },
        { en: 'Core Features', tr: 'Temel Özellikler' },
        { en: 'Scalable Base', tr: 'Ölçeklenebilir Temel' }
      ]
    },
    {
      icon: Headphones,
      titleEn: 'Support & Maintenance',
      titleTr: 'Destek & Bakım',
      descriptionEn: 'Ongoing support and maintenance to keep your application running smoothly.',
      descriptionTr: 'Uygulamanızın sorunsuz çalışmasını sağlamak için sürekli destek ve bakım.',
      features: [
        { en: '24/7 Support', tr: '7/24 Destek' },
        { en: 'Bug Fixes', tr: 'Hata Düzeltme' },
        { en: 'Updates', tr: 'Güncellemeler' }
      ]
    }
  ];

  return (
    <section id="services" className="py-32 bg-[#1a1a1a] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-purple-700 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-700 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4 border border-white/20">
            {locale === 'tr' ? 'Ne Yapıyoruz' : 'What We Do'}
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">
              {locale === 'tr' ? 'Hizmetlerimiz' : 'Our Services'}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {locale === 'tr' 
              ? 'İşinizi dijital dünyada bir adım öne taşıyacak kapsamlı çözümler'
              : 'Comprehensive solutions to take your business one step ahead in the digital world'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative bg-[#181818]/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-white transition-all duration-500 h-full shadow-xl hover:shadow-2xl hover:shadow-purple-700/20 overflow-hidden">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-700/0 to-purple-700/0 group-hover:from-purple-700/10 group-hover:to-blue-700/10 transition-all duration-500" />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className="mb-6 inline-flex p-4 bg-white/10 rounded-2xl border border-white/20"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                      {locale === 'tr' ? service.titleTr : service.titleEn}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {locale === 'tr' ? service.descriptionTr : service.descriptionEn}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-300">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                          <span className="text-sm">
                            {locale === 'tr' ? feature.tr : feature.en}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-700/10 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6 text-lg">
            {locale === 'tr' 
              ? 'Projeniz için en uygun çözümü birlikte bulalım'
              : "Let's find the best solution for your project together"}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold hover:shadow-lg hover:shadow-purple-700/50 transition-all hover:scale-105"
          >
            {locale === 'tr' ? 'İletişime Geç' : 'Get in Touch'}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
