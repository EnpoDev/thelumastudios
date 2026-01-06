import { useRouter } from 'next/router';
import { Mail, MapPin, Phone, User } from 'lucide-react';

export default function Footer({ locale = 'en' }) {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const changeLanguage = (newLocale) => {
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
    router.push(router.pathname, router.asPath, { locale: newLocale, scroll: false });
    window.location.reload();
  };

  // Legal contact info required by Turkish Law 5651
  const legalContact = {
    name: "Enes POYRAZ",
    address: "Cumhuriyet Mah. Başak Sok. Yükselen Park Nilüfer Sitesi H Blok Kat 7 Daire 18 Nilüfer/Bursa",
    email: "enespoyraz380@gmail.com",
    phone: "0546 780 59 72"
  };

  const content = {
    en: {
      tagline: "Fullstack Web Development Studio",
      email: "hello@lumastudios.com",
      rights: "All rights reserved",
      sections: ["Expertise", "Demos", "Packages", "Rules", "Contact"],
      contactTitle: "Contact Information"
    },
    tr: {
      tagline: "Fullstack Web Geliştirme Stüdyosu",
      email: "hello@lumastudios.com",
      rights: "Tüm hakları saklıdır",
      sections: ["Uzmanlık", "Demolar", "Paketler", "Kurallar", "İletişim"],
      contactTitle: "İletişim Bilgileri"
    }
  };

  const text = content[locale];
  const sectionIds = ["expertise", "demos", "packages", "rules", "contact"];

  return (
    <footer className="bg-[#050505] text-white py-16 border-t border-white/5">
      <div className="container mx-auto px-4">
        {/* Main content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* Left - Branding */}
          <div>
            <h3 className="text-xl font-bold mb-2">Luma Studios</h3>
            <p className="text-gray-500 text-sm">{text.tagline}</p>
          </div>

          {/* Right - Navigation */}
          <nav className="flex flex-wrap gap-6">
            {text.sections.map((section, index) => (
              <a
                key={index}
                href={`#${sectionIds[index]}`}
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {section}
              </a>
            ))}
          </nav>
        </div>

        {/* Legal Contact Information - Required by Turkish Law 5651 */}
        <div className="border-t border-white/5 pt-8 mb-8">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <User className="w-4 h-4" />
            {text.contactTitle}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-400">{legalContact.name}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-400">{legalContact.address}</span>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <a href={`mailto:${legalContact.email}`} className="text-gray-400 hover:text-white transition-colors">
                {legalContact.email}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <a href={`tel:${legalContact.phone.replace(/\s/g, '')}`} className="text-gray-400 hover:text-white transition-colors">
                {legalContact.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-600 text-sm">
              © {currentYear} Luma Studios. {text.rights}.
            </p>

            {/* Email & Language */}
            <div className="flex items-center gap-6">
              <a
                href={`mailto:${text.email}`}
                className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                {text.email}
              </a>

              <button
                onClick={() => changeLanguage(locale === 'en' ? 'tr' : 'en')}
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {locale === 'en' ? 'TR' : 'EN'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
