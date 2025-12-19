import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Users, Lightbulb, Award, Rocket, Heart } from 'lucide-react';

export default function About({ locale = 'en' }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const values = [
    {
      icon: Target,
      titleEn: 'Quality First',
      titleTr: 'Kalite Önceliğimiz',
      descriptionEn: 'We never compromise on quality. Every project is crafted with attention to detail.',
      descriptionTr: 'Kaliteden asla ödün vermeyiz. Her proje detaylara dikkat edilerek hazırlanır.',
    },
    {
      icon: Rocket,
      titleEn: 'Fast Delivery',
      titleTr: 'Hızlı Teslimat',
      descriptionEn: 'We deliver MVPs in just 1 week, without sacrificing quality.',
      descriptionTr: 'Kaliteden ödün vermeden MVP\'leri sadece 1 haftada teslim ediyoruz.',
    },
    {
      icon: Users,
      titleEn: 'Client Focused',
      titleTr: 'Müşteri Odaklı',
      descriptionEn: 'Your success is our success. We work closely with you throughout the process.',
      descriptionTr: 'Sizin başarınız bizim başarımızdır. Süreç boyunca sizinle yakın çalışırız.',
    },
    {
      icon: Lightbulb,
      titleEn: 'Innovation',
      titleTr: 'İnovasyon',
      descriptionEn: 'We use cutting-edge technologies to create future-proof solutions.',
      descriptionTr: 'Geleceğe hazır çözümler oluşturmak için en son teknolojileri kullanırız.',
    },
  ];

  const team = [
    {
      role: locale === 'tr' ? 'Kurucu & Baş Geliştirici' : 'Founder & Lead Developer',
      description: locale === 'tr' 
        ? '10+ yıllık deneyimle modern web teknolojilerinde uzman'
        : 'Expert in modern web technologies with 10+ years of experience',
    },
    {
      role: locale === 'tr' ? 'UI/UX Tasarımcı' : 'UI/UX Designer',
      description: locale === 'tr' 
        ? 'Kullanıcı deneyimini önceliğe alan yaratıcı tasarımlar'
        : 'Creative designs that prioritize user experience',
    },
    {
      role: locale === 'tr' ? 'Full-Stack Geliştirici' : 'Full-Stack Developer',
      description: locale === 'tr' 
        ? 'Frontend ve backend teknolojilerinde uzman'
        : 'Specialized in both frontend and backend technologies',
    },
    {
      role: locale === 'tr' ? 'Proje Yöneticisi' : 'Project Manager',
      description: locale === 'tr' 
        ? 'Projelerin zamanında ve bütçe dahilinde teslimini sağlar'
        : 'Ensures projects are delivered on time and within budget',
    },
  ];

  return (
    <section id="about" className="py-32 bg-[#181818] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-700 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-700 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4 border border-white/20">
            {locale === 'tr' ? 'Bizi Tanıyın' : 'Get to Know Us'}
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">
              {locale === 'tr' ? 'Hakkımızda' : 'About Us'}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {locale === 'tr' 
              ? 'Luma Studios, işletmelerin dijital vizyonlarını hayata geçiren tutkulu bir ekiptir. Modern teknolojiler ve yaratıcı tasarımlarla, müşterilerimizin başarısını öncelik edinen çözümler üretiyoruz.'
              : 'Luma Studios is a passionate team that brings businesses\' digital visions to life. With modern technologies and creative designs, we create solutions that prioritize our clients\' success.'}
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-white transition-all duration-500"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-purple-700/20 rounded-2xl">
                <Target className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-3xl font-bold text-white">
                {locale === 'tr' ? 'Misyonumuz' : 'Our Mission'}
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-lg">
              {locale === 'tr'
                ? 'Her ölçekteki işletmeye, yüksek kaliteli ve uygun maliyetli dijital çözümler sunarak, dijital dönüşüm yolculuklarında güvenilir bir partner olmak.'
                : 'To be a trusted partner in the digital transformation journey of businesses of all sizes by providing high-quality and cost-effective digital solutions.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-white transition-all duration-500"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-blue-700/20 rounded-2xl">
                <Lightbulb className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-white">
                {locale === 'tr' ? 'Vizyonumuz' : 'Our Vision'}
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-lg">
              {locale === 'tr'
                ? 'Teknoloji ve yaratıcılığı birleştirerek, dünya çapında tanınan ve tercih edilen bir dijital ajans olmak.'
                : 'To become a globally recognized and preferred digital agency by combining technology and creativity.'}
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-4xl font-bold text-white text-center mb-12">
            {locale === 'tr' ? 'Değerlerimiz' : 'Our Values'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-purple-500 transition-all duration-300 text-center group"
                >
                  <div className="mb-4 inline-flex p-4 bg-white/10 rounded-2xl group-hover:bg-purple-700/20 transition-colors">
                    <Icon className="w-8 h-8 text-white group-hover:text-purple-400 transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    {locale === 'tr' ? value.titleTr : value.titleEn}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {locale === 'tr' ? value.descriptionTr : value.descriptionEn}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-4xl font-bold text-white text-center mb-12">
            {locale === 'tr' ? 'Ekibimiz' : 'Our Team'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-700/20 to-blue-700/20 rounded-2xl p-6 border border-gray-800 hover:border-white transition-all duration-300 text-center"
              >
                <div className="w-20 h-20 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  {member.role}
                </h4>
                <p className="text-gray-400 text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold mb-6">
            <Heart className="w-5 h-5" />
            {locale === 'tr' ? 'Birlikte Harika İşler Yapalım!' : "Let's Create Something Amazing Together!"}
          </div>
          <p className="text-gray-400 text-lg mb-6">
            {locale === 'tr' 
              ? 'Projenizi hayata geçirmek için sabırsızlanıyoruz'
              : "We can't wait to bring your project to life"}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold hover:shadow-lg hover:shadow-purple-700/50 transition-all hover:scale-105"
          >
            {locale === 'tr' ? 'Hadi Başlayalım' : "Let's Get Started"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
