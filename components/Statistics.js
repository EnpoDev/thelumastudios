import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, Users, Award, Target, Zap } from 'lucide-react';

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

  const accentColors = ['cyan', 'pink', 'purple', 'green'];

  return (
    <section className="py-24 bg-cyber-dark relative overflow-hidden">
      {/* Cyber background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/5 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full filter blur-3xl animate-pulse delay-1000" />

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
            className="inline-flex items-center gap-2 px-5 py-2 bg-neon-purple/10 backdrop-blur-sm rounded-full text-neon-purple text-sm font-semibold mb-6 border border-neon-purple/30"
          >
            <Zap className="w-4 h-4" />
            {locale === 'tr' ? 'Rakamlarla Biz' : 'Our Numbers'}
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            {locale === 'tr' ? 'Başarı ' : 'Our '}
            <span className="neon-text-purple">{locale === 'tr' ? 'Hikayemiz' : 'Achievements'}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {locale === 'tr'
              ? 'Yılların deneyimi ve müşteri memnuniyeti ile kanıtlanmış başarı hikayeleri'
              : 'Proven success stories with years of experience and customer satisfaction'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {statistics.map((stat, index) => {
            const Icon = getIcon(index);
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
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className={`relative bg-cyber-card/80 backdrop-blur-sm rounded-xl p-6 border ${borderColor} transition-all duration-300 ${glowColor} overflow-hidden`}>
                  {/* Gradient line on top */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${
                    accentColor === 'cyan' ? 'from-neon-cyan/50 to-neon-blue/50' :
                    accentColor === 'pink' ? 'from-neon-pink/50 to-neon-purple/50' :
                    accentColor === 'purple' ? 'from-neon-purple/50 to-neon-pink/50' :
                    'from-neon-green/50 to-neon-cyan/50'
                  }`} />

                  <div className="relative z-10">
                    <motion.div
                      className={`mb-4 inline-flex p-3 ${bgColor} rounded-xl border ${borderColor}`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className={`w-6 h-6 ${textColor}`} />
                    </motion.div>

                    <motion.div
                      className={`text-4xl md:text-5xl font-bold mb-2 ${textColor}`}
                      key={counters[stat.id]}
                    >
                      {counters[stat.id] || 0}+
                    </motion.div>

                    <div className="text-gray-300 font-medium">
                      {locale === 'tr' ? stat.label_tr : stat.label_en}
                    </div>
                  </div>

                  {/* Animated corner accent */}
                  <motion.div
                    className={`absolute -top-8 -right-8 w-24 h-24 ${bgColor} rounded-full blur-2xl`}
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
