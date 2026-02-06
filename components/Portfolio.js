import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

export default function Portfolio({ projects, locale = 'en' }) {
  const [filter, setFilter] = useState('all');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const categories = [
    { id: 'all', label: locale === 'tr' ? 'Tümü' : 'All', color: 'gradient' },
    { id: 'ecommerce', label: locale === 'tr' ? 'E-Ticaret' : 'E-commerce', color: 'cyan' },
    { id: 'web', label: locale === 'tr' ? 'Web Uygulama' : 'Web App', color: 'pink' },
    { id: 'mobile', label: locale === 'tr' ? 'Mobil' : 'Mobile', color: 'purple' },
  ];

  const colorAccents = ['cyan', 'pink', 'purple', 'green'];

  return (
    <section id="demos" className="py-24 bg-cyber-dark relative overflow-hidden">
      {/* Cyber background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neon-pink/5 rounded-full filter blur-3xl" />

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
            className="inline-flex items-center gap-2 px-5 py-2 bg-neon-cyan/10 backdrop-blur-sm rounded-full text-neon-cyan text-sm font-semibold mb-6 border border-neon-cyan/30"
          >
            <Sparkles className="w-4 h-4" />
            {locale === 'tr' ? 'Başarı Hikayelerimiz' : 'Success Stories'}
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            {locale === 'tr' ? 'Örnek ' : 'Case '}
            <span className="neon-text">{locale === 'tr' ? 'Çalışmalar' : 'Studies'}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {locale === 'tr'
              ? 'Uluslararası müşterilerimiz için hayata geçirdiğimiz ölçülebilir sonuçlara sahip projeler'
              : 'Projects with measurable results delivered for our international clients'}
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                filter === category.id
                  ? category.color === 'gradient'
                    ? 'bg-gradient-to-r from-neon-cyan to-neon-pink text-cyber-dark shadow-neon-glow'
                    : category.color === 'cyan'
                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 shadow-neon-cyan-sm'
                    : category.color === 'pink'
                    ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/50 shadow-neon-pink-sm'
                    : 'bg-neon-purple/20 text-neon-purple border border-neon-purple/50 shadow-neon-purple'
                  : 'bg-cyber-card/50 text-gray-400 hover:text-white border border-white/10 hover:border-white/30'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects && projects.length > 0 ? (
            projects.map((project, index) => {
              const accentColor = colorAccents[index % colorAccents.length];
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

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/projects/${project.slug}?lang=${locale}`}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className={`relative bg-cyber-card/80 backdrop-blur-sm rounded-xl overflow-hidden border ${borderColor} transition-all duration-500 ${glowColor} cursor-pointer`}
                    >
                      {/* Gradient line on top */}
                      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${
                        accentColor === 'cyan' ? 'from-neon-cyan/50 to-neon-blue/50' :
                        accentColor === 'pink' ? 'from-neon-pink/50 to-neon-purple/50' :
                        accentColor === 'purple' ? 'from-neon-purple/50 to-neon-pink/50' :
                        'from-neon-green/50 to-neon-cyan/50'
                      }`} />

                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        {project.hero_image && (project.hero_image.startsWith('http') || project.hero_image.startsWith('/')) ? (
                          <Image
                            src={project.hero_image}
                            alt={locale === 'tr' ? project.title_tr : project.title_en}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${
                            accentColor === 'cyan' ? 'from-neon-cyan/10 to-neon-blue/10' :
                            accentColor === 'pink' ? 'from-neon-pink/10 to-neon-purple/10' :
                            accentColor === 'purple' ? 'from-neon-purple/10 to-neon-pink/10' :
                            'from-neon-green/10 to-neon-cyan/10'
                          }`} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/40 to-transparent" />

                        {/* Hover overlay */}
                        <div className={`absolute inset-0 ${
                          accentColor === 'cyan' ? 'bg-neon-cyan/0 group-hover:bg-neon-cyan/10' :
                          accentColor === 'pink' ? 'bg-neon-pink/0 group-hover:bg-neon-pink/10' :
                          accentColor === 'purple' ? 'bg-neon-purple/0 group-hover:bg-neon-purple/10' :
                          'bg-neon-green/0 group-hover:bg-neon-green/10'
                        } transition-all duration-500 flex items-center justify-center`}>
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            className={`${
                              accentColor === 'cyan' ? 'bg-neon-cyan' :
                              accentColor === 'pink' ? 'bg-neon-pink' :
                              accentColor === 'purple' ? 'bg-neon-purple' :
                              'bg-neon-green'
                            } text-cyber-dark p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                          >
                            <ExternalLink className="w-5 h-5" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                          {locale === 'tr' ? project.title_tr : project.title_en}
                        </h3>

                        {/* Client info if available */}
                        {project.client && (
                          <div className={`text-sm ${textColor} mb-2`}>
                            {locale === 'tr' ? 'Müşteri: ' : 'Client: '}{project.client}
                          </div>
                        )}

                        <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {locale === 'tr'
                            ? project.description_tr?.substring(0, 100) + '...'
                            : project.description_en?.substring(0, 100) + '...'}
                        </p>

                        {/* Technologies */}
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.slice(0, 3).map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 bg-cyber-surface/50 rounded-lg text-xs text-gray-300 border border-white/10"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="px-2.5 py-1 bg-cyber-surface/50 rounded-lg text-xs text-gray-400 border border-white/10">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* View project link */}
                        <div className={`flex items-center gap-2 ${textColor} group-hover:gap-3 transition-all text-sm font-medium`}>
                          <span>
                            {locale === 'tr' ? 'Örnek Çalışmayı İncele' : 'View Case Study'}
                          </span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-cyan/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-neon-cyan" />
              </div>
              <p className="text-gray-400 text-lg">
                {locale === 'tr' ? 'Proje bulunamadı' : 'No projects found'}
              </p>
            </div>
          )}
        </div>

        {/* View all button */}
        {projects && projects.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-pink text-cyber-dark rounded-lg font-semibold shadow-neon-glow hover:shadow-neon-glow-lg transition-all"
            >
              {locale === 'tr' ? 'Tüm Projeleri Gör' : 'View All Projects'}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
