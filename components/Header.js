import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';

export default function Header({ locale = 'en' }) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const changeLanguage = (newLocale) => {
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
    router.push(router.pathname, router.asPath, { locale: newLocale, scroll: false });
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: locale === 'tr' ? 'Uzmanlık' : 'Expertise', href: '#expertise' },
    { label: locale === 'tr' ? 'Demolar' : 'Demos', href: '#demos' },
    { label: locale === 'tr' ? 'Paketler' : 'Packages', href: '#packages' },
    { label: locale === 'tr' ? 'Kurallar' : 'Rules', href: '#rules' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-cyber-dark/90 backdrop-blur-xl border-b border-neon-cyan/10 shadow-[0_4px_30px_rgba(0,255,255,0.05)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="relative group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <Image
                  src="/dark-logo-mini.png"
                  alt="Luma Studios"
                  width={120}
                  height={40}
                  className="h-8 md:h-10 w-auto relative z-10"
                />
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-neon-cyan/20" />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="relative px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm group"
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Neon underline on hover */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-pink group-hover:w-3/4 transition-all duration-300" />
                  {/* Glow effect */}
                  <span className="absolute inset-0 rounded-lg bg-neon-cyan/0 group-hover:bg-neon-cyan/5 transition-colors duration-300" />
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language Switcher */}
              <motion.button
                onClick={() => changeLanguage(locale === 'en' ? 'tr' : 'en')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-gray-400 hover:text-neon-cyan transition-colors text-sm rounded-lg hover:bg-white/5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Globe className="w-4 h-4" />
                <span>{locale === 'en' ? 'TR' : 'EN'}</span>
              </motion.button>

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#contact"
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neon-cyan/50 bg-cyber-dark/50 hover:bg-neon-cyan/10 hover:border-neon-cyan transition-all duration-300 hover:shadow-neon-cyan-sm"
                >
                  <span className="text-sm font-medium text-white group-hover:text-neon-cyan transition-colors">
                    {locale === 'tr' ? 'Proje Başlat' : 'Start Project'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-neon-cyan group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={22} className="text-neon-cyan" />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-cyber-dark/95 backdrop-blur-xl z-40 md:hidden animate-fade-in"
          />

          {/* Menu */}
          <div className="fixed top-16 left-0 right-0 bg-cyber-dark/98 backdrop-blur-xl border-b border-neon-cyan/10 z-50 md:hidden animate-slide-down">
            <nav className="container mx-auto px-4 py-6">
              {/* Nav Links */}
              <div className="space-y-1">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all group"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-neon-cyan/50 group-hover:text-neon-cyan group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>

              {/* Bottom section */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => changeLanguage(locale === 'en' ? 'tr' : 'en')}
                    className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-neon-cyan transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{locale === 'en' ? 'Türkçe' : 'English'}</span>
                  </button>

                  <Link
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-5 py-2.5 bg-gradient-to-r from-neon-cyan to-neon-pink text-cyber-dark font-medium rounded-lg hover:shadow-neon-glow transition-shadow"
                  >
                    {locale === 'tr' ? 'Proje Başlat' : 'Start Project'}
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
