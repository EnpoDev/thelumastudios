import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Star, MessageSquare } from 'lucide-react';

export default function Testimonials({ testimonials, locale = 'en' }) {
  const [mounted, setMounted] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !testimonials || testimonials.length === 0) {
    return null;
  }

  const accentColors = ['cyan', 'pink', 'purple', 'green'];

  const renderStars = (rating, color = 'cyan') => {
    const starColor = color === 'cyan' ? 'text-neon-cyan' :
                     color === 'pink' ? 'text-neon-pink' :
                     color === 'purple' ? 'text-neon-purple' :
                     'text-neon-green';
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.1 + 0.5 }}
          >
            <Star
              className={`w-4 h-4 ${
                i < rating ? `${starColor} fill-current` : 'text-gray-600'
              }`}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-24 bg-cyber-darker relative overflow-hidden">
      {/* Cyber background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-pink/5 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neon-purple/5 rounded-full filter blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ scale: 0.9 }}
            animate={inView ? { scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-5 py-2 bg-neon-pink/10 backdrop-blur-sm rounded-full text-neon-pink text-sm font-semibold mb-6 border border-neon-pink/30"
          >
            <MessageSquare className="w-4 h-4" />
            {locale === 'tr' ? 'Müşteri Görüşleri' : 'Client Testimonials'}
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            {locale === 'tr' ? 'Müşterilerimiz ' : 'What Our '}
            <span className="neon-text-pink">{locale === 'tr' ? 'Ne Diyor' : 'Clients Say'}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {locale === 'tr'
              ? 'Dünya çapındaki müşterilerimizden gerçek geri bildirimler'
              : 'Real feedback from clients worldwide'}
          </p>
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={testimonials.length > 3}
            className="testimonials-swiper-neon pb-16"
          >
            {testimonials.map((testimonial, index) => {
              const accentColor = accentColors[index % accentColors.length];
              const borderColor = accentColor === 'cyan' ? 'border-neon-cyan/20 hover:border-neon-cyan/50' :
                                 accentColor === 'pink' ? 'border-neon-pink/20 hover:border-neon-pink/50' :
                                 accentColor === 'purple' ? 'border-neon-purple/20 hover:border-neon-purple/50' :
                                 'border-neon-green/20 hover:border-neon-green/50';
              const glowColor = accentColor === 'cyan' ? 'hover:shadow-neon-cyan-sm' :
                               accentColor === 'pink' ? 'hover:shadow-neon-pink-sm' :
                               accentColor === 'purple' ? 'hover:shadow-neon-purple' :
                               'hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]';
              const textColor = accentColor === 'cyan' ? 'text-neon-cyan' :
                               accentColor === 'pink' ? 'text-neon-pink' :
                               accentColor === 'purple' ? 'text-neon-purple' :
                               'text-neon-green';
              const bgColor = accentColor === 'cyan' ? 'bg-neon-cyan/10' :
                             accentColor === 'pink' ? 'bg-neon-pink/10' :
                             accentColor === 'purple' ? 'bg-neon-purple/10' :
                             'bg-neon-green/10';

              return (
                <SwiperSlide key={testimonial.id} className="h-auto">
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="h-full"
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`bg-cyber-card/80 backdrop-blur-sm rounded-xl p-6 min-h-[380px] h-full flex flex-col border ${borderColor} transition-all duration-300 ${glowColor} relative overflow-hidden group`}>
                      {/* Gradient line on top */}
                      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${
                        accentColor === 'cyan' ? 'from-neon-cyan/50 to-neon-blue/50' :
                        accentColor === 'pink' ? 'from-neon-pink/50 to-neon-purple/50' :
                        accentColor === 'purple' ? 'from-neon-purple/50 to-neon-pink/50' :
                        'from-neon-green/50 to-neon-cyan/50'
                      }`} />

                      {/* Quote icon background */}
                      <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Quote className="w-24 h-24 text-white" />
                      </div>

                      <div className="relative z-10 flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center mb-4">
                          {testimonial.image_url && (testimonial.image_url.startsWith('http') || testimonial.image_url.startsWith('/')) ? (
                            <div className={`relative w-14 h-14 rounded-full overflow-hidden mr-4 ring-2 ${
                              accentColor === 'cyan' ? 'ring-neon-cyan/30' :
                              accentColor === 'pink' ? 'ring-neon-pink/30' :
                              accentColor === 'purple' ? 'ring-neon-purple/30' :
                              'ring-neon-green/30'
                            }`}>
                              <Image
                                src={testimonial.image_url}
                                alt={`${testimonial.name} - ${testimonial.position || 'Client'} at ${testimonial.company || 'Company'}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className={`w-14 h-14 rounded-full ${bgColor} border ${borderColor} flex items-center justify-center ${textColor} text-lg font-bold mr-4`}>
                              {testimonial.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="font-bold text-white">
                              {testimonial.name}
                            </div>
                            {testimonial.position && (
                              <div className="text-sm text-gray-400">
                                {testimonial.position}
                              </div>
                            )}
                            {testimonial.company && (
                              <div className={`text-sm ${textColor} font-medium`}>
                                {testimonial.company}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="mb-4">
                          {renderStars(testimonial.rating, accentColor)}
                        </div>

                        {/* Content */}
                        <div className="flex-grow">
                          <Quote className={`w-6 h-6 ${textColor} opacity-30 mb-2`} />
                          <p className="text-gray-300 leading-relaxed">
                            {locale === 'tr'
                              ? testimonial.content_tr
                              : testimonial.content_en}
                          </p>
                        </div>

                        {/* Animated corner accent */}
                        <motion.div
                          className={`absolute -bottom-8 -left-8 w-24 h-24 ${bgColor} rounded-full blur-2xl`}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.5, 0.3],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      </div>

      <style jsx global>{`
        .testimonials-swiper-neon {
          overflow: visible !important;
          padding-top: 10px;
          padding-bottom: 10px;
        }
        .testimonials-swiper-neon .swiper-wrapper {
          padding-top: 10px;
          padding-bottom: 10px;
        }
        .testimonials-swiper-neon .swiper-button-next,
        .testimonials-swiper-neon .swiper-button-prev {
          color: #00FFFF;
          background: rgba(0, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid rgba(0, 255, 255, 0.3);
          transition: all 0.3s ease;
        }
        .testimonials-swiper-neon .swiper-button-next:hover,
        .testimonials-swiper-neon .swiper-button-prev:hover {
          background: rgba(0, 255, 255, 0.2);
          border-color: rgba(0, 255, 255, 0.5);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        }
        .testimonials-swiper-neon .swiper-button-next::after,
        .testimonials-swiper-neon .swiper-button-prev::after {
          font-size: 16px;
          font-weight: bold;
        }
        .testimonials-swiper-neon .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(0, 255, 255, 0.3);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .testimonials-swiper-neon .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: linear-gradient(90deg, #00FFFF, #FF00FF);
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }
      `}</style>
    </section>
  );
}
