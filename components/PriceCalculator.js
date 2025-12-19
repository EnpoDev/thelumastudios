import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Euro, Sparkles, Calculator } from 'lucide-react';

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

  useEffect(() => {
    calculatePrice();
  }, [selectedFeatures]);

  const calculatePrice = () => {
    const addonsTotal = selectedFeatures.reduce((total, featureId) => {
      const feature = features.find(f => f.id === featureId);
      return total + (feature ? feature.base_price : 0);
    }, 0);
    setTotalPrice(BASE_PRICE + addonsTotal);
  };

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

  return (
    <section className="py-32 bg-[#181818] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-700 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-800 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6 border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <Calculator className="w-4 h-4" />
              {locale === 'tr' ? 'Hesaplama Aracı' : 'Calculator Tool'}
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">
                {locale === 'tr' ? 'Fiyat Tahmini Alın' : 'Get an Estimate'}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {locale === 'tr'
                ? 'İhtiyacınız olan özellikleri seçin ve anında fiyat tahmini alın'
                : 'Select the features you need and get an instant price estimate'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#1c1c1c]/80 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-800 relative overflow-hidden"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-purple-700/5 opacity-50" />
            
            <div className="relative z-10">
              {/* Base Price Display */}
              <div className="bg-gray-900/30 rounded-2xl p-12 text-center border-2 border-dashed border-gray-700 mb-10">
                <div className="mb-6">
                  <div className="text-5xl font-bold text-white mb-2">€{BASE_PRICE.toLocaleString()}</div>
                  <div className="text-gray-400">{locale === 'tr' ? 'Temel Paket Fiyatı' : 'Base Package Price'}</div>
                </div>
              </div>

              {/* Additional Features */}
              {features && features.length > 0 && (
                <>
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    {locale === 'tr' ? 'Harici Eklentiler' : 'Additional Features'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                    {features.map((feature, index) => {
                      const isSelected = selectedFeatures.includes(feature.id);
                      return (
                        <motion.label
                          key={feature.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          whileHover={{ scale: 1.02, y: -3 }}
                          className={`flex items-start p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                            isSelected
                              ? 'bg-white/10 border-white shadow-lg shadow-purple-700/20'
                              : 'bg-[#1a1a1a]/80 border-gray-700 hover:border-white hover:shadow-md'
                          }`}
                        >
                          <div className="relative flex-shrink-0 mt-1">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleFeature(feature.id)}
                              className="sr-only"
                            />
                            <div
                              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                                isSelected
                                  ? 'bg-white border-white'
                                  : 'bg-gray-800 border-gray-600'
                              }`}
                            >
                              {isSelected && <Check className="w-4 h-4 text-black" />}
                            </div>
                          </div>
                          
                          <div className="ml-4 flex-1">
                            <div className="font-semibold text-white text-lg mb-1">
                              {locale === 'tr' ? feature.name_tr : feature.name_en}
                            </div>
                            <div className="flex items-center gap-2 text-white font-medium">
                              <Euro className="w-4 h-4" />
                              {feature.base_price.toFixed(0)}
                            </div>
                          </div>

                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2"
                            >
                              <Sparkles className="w-5 h-5 text-white" />
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
                  <div className="bg-white rounded-2xl p-8 text-center text-black shadow-2xl">
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }}
                      style={{
                        backgroundImage: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                        backgroundSize: '200% 200%',
                      }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="text-lg font-semibold">
                          {locale === 'tr' ? 'Toplam Fiyat' : 'Total Price'}
                        </span>
                      </div>
                      
                      <div className="space-y-4 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{locale === 'tr' ? 'Temel Paket' : 'Base Package'}</span>
                          <span className="font-semibold">€{BASE_PRICE.toLocaleString()}</span>
                        </div>
                        {selectedFeatures.length > 0 && (
                          <div className="border-t pt-2">
                            {selectedFeatures.map(featureId => {
                              const feature = features.find(f => f.id === featureId);
                              if (!feature) return null;
                              return (
                                <div key={featureId} className="flex items-center justify-between text-sm mb-1">
                                  <span className="text-gray-600">{locale === 'tr' ? feature.name_tr : feature.name_en}</span>
                                  <span className="font-medium text-green-600">+€{feature.base_price.toLocaleString()}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      
                      <motion.div
                        className="text-5xl md:text-6xl font-bold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={totalPrice}
                      >
                        €{totalPrice.toLocaleString()}
                      </motion.div>
                      
                      <p className="text-gray-700">
                        {locale === 'tr'
                          ? 'Fiyatlar projenin karmaşıklığına göre değişebilir'
                          : 'Prices may vary based on project complexity'}
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 px-8 py-3 bg-black text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-700/50 transition-all"
                      >
                        {locale === 'tr' ? 'Teklif Talep Et' : 'Request Quote'}
                      </motion.button>
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

