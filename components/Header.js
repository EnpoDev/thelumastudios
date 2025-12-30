import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-white font-bold text-lg">
              Luma Studios
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Switcher */}
              <button
                onClick={() => changeLanguage(locale === 'en' ? 'tr' : 'en')}
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                {locale === 'en' ? 'TR' : 'EN'}
              </button>

              {/* CTA Button */}
              <Link
                href="#contact"
                className="px-4 py-2 border border-white/20 text-white text-sm hover:bg-white hover:text-black transition-all"
              >
                {locale === 'tr' ? 'Proje Başlat' : 'Start Project'}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/90 z-40 md:hidden"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-16 left-0 right-0 bg-[#0a0a0a] border-b border-white/10 z-50 md:hidden"
            >
              <nav className="container mx-auto px-4 py-6 space-y-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => changeLanguage(locale === 'en' ? 'tr' : 'en')}
                    className="text-gray-500 hover:text-white transition-colors text-sm"
                  >
                    {locale === 'en' ? 'Türkçe' : 'English'}
                  </button>

                  <Link
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-2 bg-white text-black text-sm font-medium"
                  >
                    {locale === 'tr' ? 'Proje Başlat' : 'Start Project'}
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
