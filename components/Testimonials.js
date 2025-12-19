import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCards } from 'swiper/modules';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Star } from 'lucide-react';

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

  const renderStars = (rating) => {
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
              className={`w-5 h-5 ${
                i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
              }`}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-32 bg-[#1a1a1a] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-700 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-800 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm font-semibold mb-6 border border-white/20">
            {locale === 'tr' ? 'Müşteri Görüşleri' : 'Client Testimonials'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {locale === 'tr' ? 'Müşterilerimiz Ne Diyor' : 'What Our Clients Say'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {locale === 'tr'
              ? 'Dünya çapındaki müşterilerimizden gerçek geri bildirimler'
              : 'Real feedback from clients worldwide'}
          </p>
        </motion.div>

        <motion.div
          className="max-w-7xl mx-auto pt-8 pb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
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
            className="testimonials-swiper pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="h-auto">
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="h-full"
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-[#181818]/80 backdrop-blur-sm rounded-2xl p-8 min-h-[400px] h-full flex flex-col border border-gray-800 hover:border-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-700/20 relative overflow-hidden group">
                    {/* Quote icon background */}
                    <div className="absolute -top-6 -right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Quote className="w-32 h-32 text-white" />
                    </div>

                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-purple-700/0 group-hover:bg-purple-700/5 transition-all duration-500" />

                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        {testimonial.image_url && (testimonial.image_url.startsWith('http') || testimonial.image_url.startsWith('/')) ? (
                          <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-white/20">
                            <Image
                              src={testimonial.image_url}
                              alt={`${testimonial.name} - ${testimonial.position || 'Client'} at ${testimonial.company || 'Company'}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-purple-600/20 border-2 border-purple-500/30 flex items-center justify-center text-white text-xl font-bold mr-4">
                            {testimonial.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-bold text-white text-lg">
                            {testimonial.name}
                          </div>
                          {testimonial.position && (
                            <div className="text-sm text-gray-300 font-medium">
                              {testimonial.position}
                            </div>
                          )}
                          {testimonial.company && (
                            <div className="text-sm text-purple-400 font-medium">
                              {testimonial.company}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-6">
                        {renderStars(testimonial.rating)}
                      </div>

                      <div className="relative">
                        <Quote className="w-8 h-8 text-white/20 mb-2" />
                        <p className="text-gray-300 flex-grow leading-relaxed text-lg">
                          {locale === 'tr'
                            ? testimonial.content_tr
                            : testimonial.content_en}
                        </p>
                      </div>
                    </div>

                    {/* Animated corner accent */}
                    <motion.div
                      className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-700/10 rounded-full blur-2xl"
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
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <style jsx global>{`
        .testimonials-swiper {
          overflow: visible !important;
          padding-top: 20px;
          padding-bottom: 20px;
        }
        .testimonials-swiper .swiper-wrapper {
          padding-top: 10px;
          padding-bottom: 10px;
        }
        .testimonials-swiper .swiper-button-next,
        .testimonials-swiper .swiper-button-prev {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        .testimonials-swiper .swiper-button-next:hover,
        .testimonials-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }
        .testimonials-swiper .swiper-button-next::after,
        .testimonials-swiper .swiper-button-prev::after {
          font-size: 18px;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 30px;
          border-radius: 5px;
          background: white;
        }
      `}</style>
    </section>
  );
}

