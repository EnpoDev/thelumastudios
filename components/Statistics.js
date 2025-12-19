import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, Users, Award, Target } from 'lucide-react';

const iconMap = {
  trending: TrendingUp,
  users: Users,
  award: Award,
  target: Target,
};

export default function Statistics({ statistics, locale = 'en' }) {
  const [mounted, setMounted] = useState(false);
  const [counters, setCounters] = useState({});
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && statistics && inView) {
      const newCounters = {};
      statistics.forEach((stat) => {
        newCounters[stat.id] = 0;
      });
      setCounters(newCounters);

      // Animate counters
      statistics.forEach((stat) => {
        const duration = 2500;
        const steps = 80;
        const increment = stat.value / steps;
        const stepDuration = duration / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          setCounters((prev) => ({
            ...prev,
            [stat.id]: Math.floor(current),
          }));
        }, stepDuration);
      });
    }
  }, [mounted, statistics, inView]);

  if (!mounted || !statistics || statistics.length === 0) {
    return null;
  }

  const getIcon = (index) => {
    const icons = [TrendingUp, Users, Award, Target];
    const Icon = icons[index % icons.length];
    return Icon;
  };

  return (
    <section className="py-32 bg-[#1a1a1a] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-700 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4 border border-white/20">
            {locale === 'tr' ? 'Rakamlarla Biz' : 'Our Numbers'}
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">
              {locale === 'tr' ? 'Başarılarımız' : 'Our Achievements'}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {locale === 'tr' 
              ? 'Yılların deneyimi ve müşteri memnuniyeti ile kanıtlanmış başarı hikayeleri'
              : 'Proven success stories with years of experience and customer satisfaction'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => {
            const Icon = getIcon(index);
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <div className="relative bg-[#181818]/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-700/20 overflow-hidden">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-700/0 to-purple-700/0 group-hover:from-purple-700/5 group-hover:to-purple-700/5 transition-all duration-500" />
                  
                  <div className="relative z-10">
                    <motion.div
                      className="mb-6 inline-flex p-4 bg-white/10 rounded-2xl border border-white/20"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="text-6xl font-bold mb-3">
                      <span className="text-white">
                        {counters[stat.id] || 0}+
                      </span>
                    </div>

                    <div className="text-xl text-gray-300 font-semibold">
                      {locale === 'tr' ? stat.label_tr : stat.label_en}
                    </div>
                  </div>

                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute -top-10 -right-10 w-32 h-32 bg-purple-700/10 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

