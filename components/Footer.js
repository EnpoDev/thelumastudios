import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer({ locale = 'en' }) {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const changeLanguage = (newLocale) => {
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
    router.push(router.pathname, router.asPath, { locale: newLocale, scroll: false });
    window.location.reload();
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-[#181818] text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-700 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6 text-white">
              Luma Studios
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {locale === 'tr'
                ? 'Yaratıcı web tasarım çözümleri ile markanızı dijital dünyada zirveye taşıyoruz.'
                : 'Taking your brand to the top in the digital world with creative web design solutions.'}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-white" />
                <a href="mailto:enespoyraz380@gmail.com">enespoyraz380@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-white" />
                <a href="tel:+905467805972">0546 780 59 72</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <MapPin className="w-5 h-5 text-white" />
                <span>Bursa, Türkiye</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-6 text-xl text-white">
              {locale === 'tr' ? 'Hızlı Linkler' : 'Quick Links'}
            </h4>
            <ul className="space-y-3">
              {[
                { label: locale === 'tr' ? 'Ana Sayfa' : 'Home', href: '/' },
                { label: locale === 'tr' ? 'Portföy' : 'Portfolio', href: '#portfolio' },
                { label: locale === 'tr' ? 'Hizmetler' : 'Services', href: '#services' },
                { label: locale === 'tr' ? 'Hakkımızda' : 'About', href: '#about' },
                { label: locale === 'tr' ? 'İletişim' : 'Contact', href: '#contact' },
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-6 text-xl text-white">
              {locale === 'tr' ? 'Hizmetler' : 'Services'}
            </h4>
            <ul className="space-y-3 text-gray-400">
              {[
                { label: locale === 'tr' ? 'Web Geliştirme' : 'Web Development', href: '#services' },
                { label: locale === 'tr' ? 'Mobil Uygulamalar' : 'Mobile Apps', href: '#services' },
                { label: locale === 'tr' ? 'E-Ticaret Çözümleri' : 'E-Commerce', href: '#services' },
                { label: locale === 'tr' ? 'UI/UX Tasarım' : 'UI/UX Design', href: '#services' },
                { label: locale === 'tr' ? 'MVP Geliştirme' : 'MVP Development', href: '#services' },
              ].map((service, i) => (
                <li key={i}>
                  <Link
                    href={service.href}
                    className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-6 text-xl text-white">
              {locale === 'tr' ? 'Bizi Takip Edin' : 'Follow Us'}
            </h4>
            <p className="text-gray-400 mb-6">
              {locale === 'tr'
                ? 'Sosyal medyada bizi takip edin ve son projelerimizden haberdar olun.'
                : 'Follow us on social media and stay updated with our latest projects.'}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 hover:border-white transition-colors group"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h5 className="text-white font-semibold mb-3">
                {locale === 'tr' ? 'Bülten' : 'Newsletter'}
              </h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={locale === 'tr' ? 'E-posta adresiniz' : 'Your email'}
                  className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-500 transition-colors"
                />
                <button className="px-4 py-2 bg-white text-black hover:bg-gray-100 rounded-lg transition-all">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              className="text-gray-400 text-center md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              © {currentYear} Luma Studios. {locale === 'tr' ? 'Tüm hakları saklıdır' : 'All rights reserved'}.
            </motion.p>

            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {locale === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {locale === 'tr' ? 'Kullanım Şartları' : 'Terms of Service'}
              </Link>
              <button
                onClick={() => changeLanguage(locale === 'en' ? 'tr' : 'en')}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-700 hover:border-white"
              >
                {locale === 'en' ? '🇹🇷 Türkçe' : '🇬🇧 English'}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white" />
    </footer>
  );
}

