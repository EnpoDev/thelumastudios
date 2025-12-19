import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

export default function Portfolio({ projects, locale = 'en' }) {
  const [filter, setFilter] = useState('all');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const categories = [
    { id: 'all', label: locale === 'tr' ? 'Tümü' : 'All' },
    { id: 'ecommerce', label: locale === 'tr' ? 'E-Ticaret' : 'E-commerce' },
    { id: 'web', label: locale === 'tr' ? 'Web Uygulama' : 'Web App' },
    { id: 'mobile', label: locale === 'tr' ? 'Mobil' : 'Mobile' },
  ];

  return (
    <section id="portfolio" className="py-32 bg-[#181818] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-700 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-700 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm font-semibold mb-6 border border-white/20">
            {locale === 'tr' ? 'Başarı Hikayelerimiz' : 'Success Stories'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {locale === 'tr' ? 'Örnek Çalışmalar' : 'Case Studies'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
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
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-white text-black shadow-lg shadow-purple-700/50'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/projects/${project.slug}?lang=${locale}`}>
                  <div className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 hover:border-white transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-purple-700/20 cursor-pointer">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      {project.hero_image && (project.hero_image.startsWith('http') || project.hero_image.startsWith('/')) ? (
                        <Image
                          src={project.hero_image}
                          alt={locale === 'tr' ? project.title_tr : project.title_en}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-700/20 to-blue-700/20" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-purple-700/0 group-hover:bg-purple-700/20 transition-all duration-500 flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1, opacity: 1 }}
                          className="bg-white text-black p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <ExternalLink className="w-6 h-6" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {locale === 'tr' ? project.title_tr : project.title_en}
                      </h3>
                      
                      {/* Client info if available */}
                      {project.client && (
                        <div className="text-sm text-gray-400 mb-3">
                          {locale === 'tr' ? 'Müşteri: ' : 'Client: '}{project.client}
                        </div>
                      )}

                      <p className="text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                        {locale === 'tr' 
                          ? project.description_tr?.substring(0, 120) + '...'
                          : project.description_en?.substring(0, 120) + '...'}
                      </p>

                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* View project link */}
                      <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                        <span className="font-medium">
                          {locale === 'tr' ? 'Örnek Çalışmayı İncele' : 'View Case Study'}
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
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
            className="text-center mt-16"
          >
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold hover:shadow-lg hover:shadow-purple-700/50 transition-all hover:scale-105">
              {locale === 'tr' ? 'Tüm Projeleri Gör' : 'View All Projects'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
