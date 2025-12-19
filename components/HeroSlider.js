import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

export default function HeroSlider({ projects, locale = 'en' }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !projects || projects.length === 0) {
    return (
      <div className="relative h-screen bg-[#181818] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-[#181818] to-[#181818] opacity-90" />
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        <motion.div
          className="text-center text-white z-10 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 flex justify-center"
          >
            <Sparkles className="w-16 h-16 text-yellow-400" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Luma Studios
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6">Creative Web Design Solutions</p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold shadow-lg"
          >
            <Zap className="w-5 h-5" />
            {locale === 'tr' ? 'MVP 1 Haftada Teslim' : 'MVP in 1 Week'}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade, Parallax]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        effect="fade"
        parallax={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
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
                    alt={locale === 'tr' ? project.title_tr : project.title_en}
                    fill
                    className="object-cover scale-110"
                    priority={index === 0}
                  />
                </div>
              ) : (
                <div className="absolute inset-0 bg-[#181818]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />
              
              {/* Animated particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-purple-700 rounded-full opacity-30"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -100, 0],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 5 + Math.random() * 5,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                    }}
                  />
                ))}
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-5xl z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-6 flex flex-wrap gap-3 justify-center"
                  >
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                      <Sparkles className="w-4 h-4" />
                      {locale === 'tr' ? 'Öne Çıkan Proje' : 'Featured Project'}
                    </span>
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-sm font-semibold shadow-lg">
                      <Zap className="w-4 h-4" />
                      {locale === 'tr' ? 'MVP 1 Haftada Teslim' : 'MVP in 1 Week'}
                    </span>
                  </motion.div>

                  <motion.h1
                    className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    data-swiper-parallax="-300"
                  >
                    <span className="text-white">
                      {locale === 'tr' ? project.title_tr : project.title_en}
                    </span>
                  </motion.h1>

                  <motion.p
                    className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    data-swiper-parallax="-200"
                  >
                    {locale === 'tr' 
                      ? project.description_tr?.substring(0, 150) + '...'
                      : project.description_en?.substring(0, 150) + '...'}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    data-swiper-parallax="-100"
                  >
                    <Link
                      href={`/projects/${project.slug}?lang=${locale}`}
                      className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 shadow-2xl hover:shadow-purple-700/50 hover:scale-105"
                    >
                      {locale === 'tr' ? 'Projeyi İncele' : 'Explore Project'}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
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
        }
        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }
        .hero-swiper .swiper-button-next::after,
        .hero-swiper .swiper-button-prev::after {
          font-size: 20px;
        }
        .hero-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: white;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 40px;
          border-radius: 6px;
          background: white;
        }
      `}</style>
    </div>
  );
}

