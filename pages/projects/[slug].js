import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, Clock, User, Code2, ExternalLink } from 'lucide-react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { detectLocale } from '../../lib/i18n';
import { dbHelpers } from '../../lib/db';

export default function ProjectDetail({ project, locale }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!project) {
    return (
      <>
        <Head>
          <title>Project Not Found - Luma Studios</title>
        </Head>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-white">
              {locale === 'tr' ? 'Proje Bulunamadı' : 'Project Not Found'}
            </h1>
            <Link 
              href={`/?lang=${locale}`} 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {locale === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </>
    );
  }

  const galleryImages = (project.gallery_images || []).filter(
    (img) => img && (img.startsWith('http') || img.startsWith('/'))
  );
  const technologies = project.technologies || [];

  return (
    <>
      <Head>
        <title>{locale === 'tr' ? project.title_tr : project.title_en} - Luma Studios</title>
        <meta name="description" content={locale === 'tr' ? project.description_tr : project.description_en} />
      </Head>
      
      <div className="min-h-screen bg-black">
        <Header locale={locale} />
        
        {/* Hero Section */}
        {project.hero_image && (project.hero_image.startsWith('http') || project.hero_image.startsWith('/')) && (
          <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
            <Image
              src={project.hero_image}
              alt={locale === 'tr' ? project.title_tr : project.title_en}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
            
            {/* Animated overlay */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/20 rounded-full filter blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-800/20 rounded-full filter blur-3xl animate-pulse delay-1000" />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4 max-w-5xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                    {locale === 'tr' ? project.title_tr : project.title_en}
                  </h1>
                  {project.client_name && (
                    <p className="text-xl md:text-2xl text-gray-300 font-medium">
                      {locale === 'tr' ? 'Müşteri:' : 'Client:'} {project.client_name}
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-20 max-w-7xl" ref={ref}>
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href={`/?lang=${locale}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all border border-white/20 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              {locale === 'tr' ? 'Portföye Dön' : 'Back to Portfolio'}
            </Link>
          </motion.div>

          {/* Project Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                {locale === 'tr' ? 'Proje Açıklaması' : 'Project Description'}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl leading-relaxed text-gray-300">
                  {locale === 'tr' ? project.description_tr : project.description_en}
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 sticky top-24">
                <h3 className="text-2xl font-bold text-white mb-6">
                  {locale === 'tr' ? 'Proje Detayları' : 'Project Details'}
                </h3>
                
                {project.client_name && (
                  <div className="mb-6 pb-6 border-b border-gray-800">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        {locale === 'tr' ? 'Müşteri' : 'Client'}
                      </h4>
                    </div>
                    <p className="text-xl font-semibold text-white ml-13">{project.client_name}</p>
                  </div>
                )}
                
                {project.timeline && (
                  <div className="mb-6 pb-6 border-b border-gray-800">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        {locale === 'tr' ? 'Süre' : 'Timeline'}
                      </h4>
                    </div>
                    <p className="text-xl font-semibold text-white ml-13">{project.timeline}</p>
                  </div>
                )}
                
                {technologies.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Code2 className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        {locale === 'tr' ? 'Teknolojiler' : 'Technologies'}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-13">
                      {technologies.map((tech, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.5 + index * 0.05 }}
                          className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Gallery */}
          {galleryImages.length > 0 && (
            <motion.div 
              className="mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white text-center">
                {locale === 'tr' ? 'Proje Galerisi' : 'Project Gallery'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer border-2 border-gray-800 hover:border-white transition-all"
                    onClick={() => setSelectedImage(image)}
                  >
                    {image && (image.startsWith('http') || image.startsWith('/')) && (
                      <>
                        <Image
                          src={image}
                          alt={`${locale === 'tr' ? project.title_tr : project.title_en} - ${index + 1}`}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                          <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all" />
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-7xl max-h-[90vh] w-full h-full">
              <Image
                src={selectedImage}
                alt="Gallery image"
                fill
                className="object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}

        <Footer locale={locale} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const locale = detectLocale(context.req);

  try {
    const project = dbHelpers.getProjectBySlug(slug);

    if (!project) {
      return {
        notFound: true,
      };
    }

    // Parse JSON fields with error handling
    let gallery_images = [];
    let technologies = [];
    
    try {
      gallery_images = project.gallery_images 
        ? (typeof project.gallery_images === 'string' ? JSON.parse(project.gallery_images) : project.gallery_images)
        : [];
    } catch (e) {
      console.error('Error parsing gallery_images:', e);
      gallery_images = [];
    }
    
    try {
      technologies = project.technologies 
        ? (typeof project.technologies === 'string' ? JSON.parse(project.technologies) : project.technologies)
        : [];
    } catch (e) {
      console.error('Error parsing technologies:', e);
      technologies = [];
    }

    const parsedProject = {
      ...project,
      gallery_images,
      technologies,
    };

    return {
      props: {
        project: parsedProject,
        locale,
      },
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return {
      notFound: true,
    };
  }
}

