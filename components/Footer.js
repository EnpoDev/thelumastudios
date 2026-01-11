import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
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
    phone: "0546 780 59 72",
    vkn: "7330923351",
    kep: "enes.poyraz@hs01.kep.tr",
    taxExemption: {
      tr: "GVK Mükerrer 20/B kapsamında vergiden muaftır",
      en: "Tax exempt under Income Tax Law Article 20/B"
    }
  };

  const content = {
    en: {
      tagline: "Fullstack Web Development Studio",
      email: "hello@lumastudios.com",
      rights: "All rights reserved",
      sections: ["Expertise", "Demos", "Packages", "Rules", "Contact"],
      contactTitle: "Contact Information",
      legalLinks: {
        privacy: "Privacy Policy",
        distance: "Distance Sales Agreement",
        delivery: "Delivery & Returns"
      }
    },
    tr: {
      tagline: "Fullstack Web Geliştirme Stüdyosu",
      email: "hello@lumastudios.com",
      rights: "Tüm hakları saklıdır",
      sections: ["Uzmanlık", "Demolar", "Paketler", "Kurallar", "İletişim"],
      contactTitle: "İletişim Bilgileri",
      legalLinks: {
        privacy: "Gizlilik Politikası",
        distance: "Mesafeli Satış Sözleşmesi",
        delivery: "Teslimat ve İade Şartları"
      }
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
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
            <div className="flex items-start gap-2">
              <span className="text-gray-500 mt-0.5 flex-shrink-0 text-xs font-medium">VKN</span>
              <span className="text-gray-400">{legalContact.vkn}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-500 mt-0.5 flex-shrink-0 text-xs font-medium">KEP</span>
              <a href={`mailto:${legalContact.kep}`} className="text-gray-400 hover:text-white transition-colors">
                {legalContact.kep}
              </a>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4 italic">
            {legalContact.taxExemption[locale]}
          </p>
        </div>

        {/* Legal Links */}
        <div className="border-t border-white/5 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/gizlilik-politikasi" className="text-gray-500 hover:text-white text-sm transition-colors">
              {text.legalLinks.privacy}
            </Link>
            <Link href="/mesafeli-satis-sozlesmesi" className="text-gray-500 hover:text-white text-sm transition-colors">
              {text.legalLinks.distance}
            </Link>
            <Link href="/teslimat-ve-iade" className="text-gray-500 hover:text-white text-sm transition-colors">
              {text.legalLinks.delivery}
            </Link>
          </div>
        </div>

        {/* Payment Logos */}
        <div className="border-t border-white/5 pt-8 mb-8">
          <div className="flex flex-wrap justify-center items-center gap-6">
            {/* Visa Logo */}
            <svg className="h-8 w-auto" viewBox="0 0 750 471" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M278.198 334.228L311.576 138.259H364.875L331.497 334.228H278.198Z" fill="#3C58BF"/>
              <path d="M524.307 142.688C513.628 138.833 496.767 134.625 475.913 134.625C423.158 134.625 385.733 162.24 385.457 202.073C385.152 231.287 411.896 247.476 431.942 257.241C452.489 267.262 459.611 273.764 459.513 282.853C459.391 296.606 442.779 302.981 427.289 302.981C405.937 302.981 394.561 299.956 376.845 292.219L369.782 288.822L362.143 335.161C375.025 340.831 398.939 345.793 423.786 346.063C479.996 346.063 516.649 318.74 517.021 276.232C517.171 253.073 503.165 235.251 472.853 220.532C454.357 211.139 443.044 204.858 443.167 195.206C443.167 186.585 453.304 177.371 475.069 177.371C493.303 177.086 506.693 180.645 517.226 184.5L522.294 186.857L530.002 141.983L524.307 142.688Z" fill="#3C58BF"/>
              <path d="M612.39 138.259C601.711 138.259 593.624 141.526 588.6 152.22L509.939 334.228H566.088L577.263 304.18H645.407L652.052 334.228H701.745L657.853 138.259H612.39ZM593.037 261.392C597.275 250.403 615.263 203.006 615.263 203.006C614.983 203.519 619.424 191.826 621.983 184.469L625.465 201.408C625.465 201.408 636.482 252.115 638.755 261.392H593.037Z" fill="#3C58BF"/>
              <path d="M232.903 138.259L180.728 267.262L175.161 241.213C165.678 211.433 137.907 178.962 106.805 162.648L154.491 334.068H211.058L289.47 138.259H232.903Z" fill="#3C58BF"/>
              <path d="M119.076 138.259H32.7614L32 142.248C99.6108 159.047 144.892 200.893 163.815 251.659L144.489 152.502C141.209 141.949 131.105 138.607 119.076 138.259Z" fill="#FFBC00"/>
            </svg>

            {/* MasterCard Logo */}
            <svg className="h-8 w-auto" viewBox="0 0 750 471" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M434.008 235.5C434.008 340.978 348.493 426.5 243.004 426.5C137.516 426.5 52 340.978 52 235.5C52 130.022 137.516 44.5 243.004 44.5C348.493 44.5 434.008 130.022 434.008 235.5Z" fill="#EB001B"/>
              <path d="M698 235.5C698 340.978 612.484 426.5 506.996 426.5C401.508 426.5 316 340.978 316 235.5C316 130.022 401.508 44.5 506.996 44.5C612.484 44.5 698 130.022 698 235.5Z" fill="#F79E1B"/>
              <path d="M375.004 82.4993C327.532 120.884 297 179.812 297 235.5C297 291.188 327.532 350.116 375.004 388.501C422.476 350.116 453.008 291.188 453.008 235.5C453.008 179.812 422.476 120.884 375.004 82.4993Z" fill="#FF5F00"/>
            </svg>

            {/* iyzico Logo */}
            <Image
              src="/iyzico-logo-pack/footer_iyzico_ile_ode/Colored/logo_band_colored.svg"
              alt="iyzico ile güvenli ödeme"
              width={160}
              height={40}
              className="h-10 w-auto"
            />
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
