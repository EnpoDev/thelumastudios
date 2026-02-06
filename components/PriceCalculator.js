import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Euro, Sparkles, Calculator, ArrowRight } from 'lucide-react';

export default function PriceCalculator({ features, locale = 'en' }) {
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [totalPrice, setTotalPrice] = useState(9800);
  const BASE_PRICE = 9800;
  const [mounted, setMounted] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculatePrice = useCallback(() => {
    const addonsTotal = selectedFeatures.reduce((total, featureId) => {
      const feature = features.find(f => f.id === featureId);
      return total + (feature ? feature.base_price : 0);
    }, 0);
    setTotalPrice(BASE_PRICE + addonsTotal);
  }, [selectedFeatures, features, BASE_PRICE]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  const toggleFeature = (featureId) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  if (!mounted || !features || features.length === 0) {
    return null;
  }

  const accentColors = ['cyan', 'pink', 'purple', 'green'];

  return (
    <section className="py-24 bg-cyber-darker relative overflow-hidden">
      {/* Cyber background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-pink/5 rounded-full filter blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={inView ? { scale: 1 } : {}}
              className="inline-flex items-center gap-2 px-5 py-2 bg-neon-green/10 backdrop-blur-sm rounded-full text-neon-green text-sm font-semibold mb-6 border border-neon-green/30"
            >
              <Calculator className="w-4 h-4" />
              {locale === 'tr' ? 'Hesaplama Aracı' : 'Calculator Tool'}
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              {locale === 'tr' ? 'Fiyat ' : 'Get an '}
              <span className="neon-text-green">{locale === 'tr' ? 'Tahmini Alın' : 'Estimate'}</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {locale === 'tr'
                ? 'İhtiyacınız olan özellikleri seçin ve anında fiyat tahmini alın'
                : 'Select the features you need and get an instant price estimate'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-cyber-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-neon-cyan/20 relative overflow-hidden"
          >
            {/* Gradient lines */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan/50 via-neon-pink/50 to-neon-purple/50" />
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-purple/50 via-neon-pink/50 to-neon-cyan/50" />

            <div className="relative z-10">
              {/* Base Price Display */}
              <div className="bg-cyber-surface/50 rounded-xl p-8 text-center border border-neon-cyan/20 mb-8">
                <div className="mb-4">
                  <motion.div
                    className="text-5xl md:text-6xl font-bold neon-text mb-2"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                  >
                    €{BASE_PRICE.toLocaleString()}
                  </motion.div>
                  <div className="text-gray-400">{locale === 'tr' ? 'Temel Paket Fiyatı' : 'Base Package Price'}</div>
                </div>
              </div>

              {/* Additional Features */}
              {features && features.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-neon-pink" />
                    {locale === 'tr' ? 'Harici Eklentiler' : 'Additional Features'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {features.map((feature, index) => {
                      const isSelected = selectedFeatures.includes(feature.id);
                      const accentColor = accentColors[index % accentColors.length];
                      const borderColor = isSelected
                        ? accentColor === 'cyan' ? 'border-neon-cyan/50' :
                          accentColor === 'pink' ? 'border-neon-pink/50' :
                          accentColor === 'purple' ? 'border-neon-purple/50' :
                          'border-neon-green/50'
                        : 'border-white/10 hover:border-white/30';
                      const bgColor = isSelected
                        ? accentColor === 'cyan' ? 'bg-neon-cyan/10' :
                          accentColor === 'pink' ? 'bg-neon-pink/10' :
                          accentColor === 'purple' ? 'bg-neon-purple/10' :
                          'bg-neon-green/10'
                        : 'bg-cyber-surface/30';
                      const textColor = accentColor === 'cyan' ? 'text-neon-cyan' :
                                       accentColor === 'pink' ? 'text-neon-pink' :
                                       accentColor === 'purple' ? 'text-neon-purple' :
                                       'text-neon-green';
                      const checkBg = accentColor === 'cyan' ? 'bg-neon-cyan' :
                                     accentColor === 'pink' ? 'bg-neon-pink' :
                                     accentColor === 'purple' ? 'bg-neon-purple' :
                                     'bg-neon-green';

                      return (
                        <motion.label
                          key={feature.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 border ${borderColor} ${bgColor} relative overflow-hidden`}
                        >
                          {/* Gradient line on top when selected */}
                          {isSelected && (
                            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${
                              accentColor === 'cyan' ? 'from-neon-cyan/50 to-neon-blue/50' :
                              accentColor === 'pink' ? 'from-neon-pink/50 to-neon-purple/50' :
                              accentColor === 'purple' ? 'from-neon-purple/50 to-neon-pink/50' :
                              'from-neon-green/50 to-neon-cyan/50'
                            }`} />
                          )}

                          <div className="relative flex-shrink-0">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleFeature(feature.id)}
                              className="sr-only"
                            />
                            <div
                              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                                isSelected
                                  ? `${checkBg} border-transparent`
                                  : 'bg-cyber-dark border-gray-600'
                              }`}
                            >
                              {isSelected && <Check className="w-4 h-4 text-cyber-dark" />}
                            </div>
                          </div>

                          <div className="ml-4 flex-1">
                            <div className="font-medium text-white">
                              {locale === 'tr' ? feature.name_tr : feature.name_en}
                            </div>
                          </div>

                          <div className={`flex items-center gap-1 ${isSelected ? textColor : 'text-gray-400'} font-semibold`}>
                            <Euro className="w-4 h-4" />
                            {feature.base_price.toFixed(0)}
                          </div>

                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2"
                            >
                              <Sparkles className={`w-4 h-4 ${textColor}`} />
                            </motion.div>
                          )}
                        </motion.label>
                      );
                    })}
                  </div>
                </>
              )}

              {totalPrice > BASE_PRICE && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-neon-cyan/10 via-neon-pink/10 to-neon-purple/10 rounded-xl p-6 border border-neon-pink/30">
                    <div className="relative z-10">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-neon-pink" />
                        <span className="text-lg font-semibold text-white">
                          {locale === 'tr' ? 'Toplam Fiyat' : 'Total Price'}
                        </span>
                      </div>

                      {/* Price breakdown */}
                      <div className="space-y-2 mb-4 max-w-md mx-auto">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">{locale === 'tr' ? 'Temel Paket' : 'Base Package'}</span>
                          <span className="font-semibold text-neon-cyan">€{BASE_PRICE.toLocaleString()}</span>
                        </div>
                        {selectedFeatures.length > 0 && (
                          <div className="border-t border-white/10 pt-2">
                            {selectedFeatures.map((featureId, idx) => {
                              const feature = features.find(f => f.id === featureId);
                              if (!feature) return null;
                              const accentColor = accentColors[idx % accentColors.length];
                              const textColor = accentColor === 'cyan' ? 'text-neon-cyan' :
                                               accentColor === 'pink' ? 'text-neon-pink' :
                                               accentColor === 'purple' ? 'text-neon-purple' :
                                               'text-neon-green';
                              return (
                                <div key={featureId} className="flex items-center justify-between text-sm">
                                  <span className="text-gray-400">{locale === 'tr' ? feature.name_tr : feature.name_en}</span>
                                  <span className={`font-medium ${textColor}`}>+€{feature.base_price.toLocaleString()}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      <motion.div
                        className="text-5xl md:text-6xl font-bold text-center mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={totalPrice}
                      >
                        <span className="neon-text">€{totalPrice.toLocaleString()}</span>
                      </motion.div>

                      <p className="text-gray-400 text-sm text-center mb-6">
                        {locale === 'tr'
                          ? 'Fiyatlar projenin karmaşıklığına göre değişebilir'
                          : 'Prices may vary based on project complexity'}
                      </p>

                      <div className="text-center">
                        <motion.a
                          href="#contact"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-neon-cyan to-neon-pink text-cyber-dark font-semibold rounded-lg shadow-neon-glow hover:shadow-neon-glow-lg transition-all"
                        >
                          {locale === 'tr' ? 'Teklif Talep Et' : 'Request Quote'}
                          <ArrowRight className="w-5 h-5" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
