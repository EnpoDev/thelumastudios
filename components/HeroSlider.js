import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Globe, Users } from 'lucide-react';

export default function HeroSlider({ projects, locale = 'en' }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const heroContent = {
    en: {
      subtitle: "Enterprise Web & Mobile Development",
      title: "Production-Ready Solutions for International Businesses",
      description: "We build scalable web and mobile applications for businesses and investors worldwide. From MVP to production in 1 week. Transparent process. Measurable results.",
      cta: "Schedule Free Consultation",
      secondaryCta: "View Case Studies",
      benefits: [
        "MVP Delivered in 7 Days",
        "Fixed-Price Projects",
        "24/7 Support Across Time Zones",
        "Clear Communication in English"
      ],
      trusted: "Trusted by businesses in USA, UK, and EU"
    },
    tr: {
      subtitle: "Kurumsal Web & Mobil Geliştirme",
      title: "Uluslararası İşletmeler için Üretime Hazır Çözümler",
      description: "Dünya çapında işletmeler ve yatırımcılar için ölçeklenebilir web ve mobil uygulamalar geliştiriyoruz. MVP'den üretime 1 haftada. Şeffaf süreç. Ölçülebilir sonuçlar.",
      cta: "Ücretsiz Danışma Talep Et",
      secondaryCta: "Örnek Çalışmaları İncele",
      benefits: [
        "7 Günde MVP Teslimi",
        "Sabit Fiyat Projeler",
        "Tüm Saat Dilimlerinde 7/24 Destek",
        "İngilizce Net İletişim"
      ],
      trusted: "ABD, İngiltere ve AB'deki işletmeler tarafından güveniliyor"
    }
  };

  const content = heroContent[locale];

  if (!mounted || !projects || projects.length === 0) {
    return (
      <section className="relative h-screen bg-[#181818] flex items-center justify-center overflow-hidden">
        {/* Professional gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#181818] via-[#1a1a2e] to-[#181818]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
                  <Globe className="w-4 h-4" />
                  {content.subtitle}
                </span>
              </motion.div>

              {/* Main Heading - H1 for SEO */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white"
              >
                {content.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
              >
                {content.description}
              </motion.p>

              {/* Benefits List */}
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mb-8 space-y-3"
              >
                {content.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-200">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-base">{benefit}</span>
                  </li>
                ))}
              </motion.ul>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-purple-700/50 hover:scale-105"
                >
                  {content.cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#portfolio"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300"
                >
                  {content.secondaryCta}
                </a>
              </motion.div>

              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-8 flex items-center gap-2 text-sm text-gray-400"
              >
                <Users className="w-4 h-4" />
                <span>{content.trusted}</span>
              </motion.div>
            </motion.div>

            {/* Right Column - Stats/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:grid grid-cols-2 gap-6"
            >
              {/* Stat Cards */}
              {[
                { number: "50+", label: locale === 'en' ? "Projects Delivered" : "Teslim Edilen Proje", icon: CheckCircle },
                { number: "7", label: locale === 'en' ? "Days to MVP" : "Gün İçinde MVP", icon: Clock },
                { number: "15+", label: locale === 'en' ? "Countries Served" : "Ülkeye Hizmet", icon: Globe },
                { number: "98%", label: locale === 'en' ? "Client Satisfaction" : "Müşteri Memnuniyeti", icon: Users }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all duration-300"
                >
                  <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade, Parallax]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          enabled: true,
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: false,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        parallax={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1500}
        loop={projects.length > 1}
        className="h-full hero-swiper"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={project.id}>
            <div className="relative h-full w-full">
              {project.hero_image && (project.hero_image.startsWith('http') || project.hero_image.startsWith('/')) ? (
                <div className="absolute inset-0" data-swiper-parallax="-23%">
                  <Image
                    src={project.hero_image}
                    alt={`${locale === 'tr' ? project.title_tr : project.title_en} - Web development case study by Luma Studios`}
                    fill
                    className="object-cover scale-110"
                    priority={index === 0}
                    quality={90}
                  />
                </div>
              ) : (
                <div className="absolute inset-0 bg-[#181818]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-4 z-10">
                  <div className="max-w-4xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="mb-6"
                    >
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-full text-green-300 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        {locale === 'tr' ? 'Başarılı Proje' : 'Success Story'}
                      </span>
                    </motion.div>

                    <motion.h1
                      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      data-swiper-parallax="-300"
                    >
                      {locale === 'tr' ? project.title_tr : project.title_en}
                    </motion.h1>

                    <motion.p
                      className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      data-swiper-parallax="-200"
                    >
                      {locale === 'tr' 
                        ? project.description_tr?.substring(0, 180) + '...'
                        : project.description_en?.substring(0, 180) + '...'}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      data-swiper-parallax="-100"
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <Link
                        href={`/projects/${project.slug}?lang=${locale}`}
                        className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 shadow-xl hover:shadow-white/30 hover:scale-105"
                      >
                        {locale === 'tr' ? 'Örnek Çalışmayı İncele' : 'View Case Study'}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <a
                        href="#contact"
                        className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300"
                      >
                        {locale === 'tr' ? 'Benzer Proje Talebi' : 'Request Similar Project'}
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          z-index: 100;
        }
        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }
        .hero-swiper .swiper-button-next::after,
        .hero-swiper .swiper-button-prev::after {
          font-size: 20px;
          font-weight: bold;
        }
        .hero-swiper .swiper-button-disabled {
          opacity: 0.35;
          cursor: not-allowed;
          pointer-events: none;
        }
        .hero-swiper .swiper-pagination {
          z-index: 100;
          bottom: 30px !important;
          pointer-events: auto;
        }
        .hero-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: white;
          opacity: 0.5;
          transition: all 0.3s ease;
          cursor: pointer;
          pointer-events: auto;
        }
        .hero-swiper .swiper-pagination-bullet:hover {
          opacity: 0.8;
          transform: scale(1.2);
        }
        .hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 40px;
          border-radius: 6px;
          background: white;
        }
      `}</style>
    </section>
  );
}

