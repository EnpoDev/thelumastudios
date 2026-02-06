import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/HeroSlider';
import Expertise from '../components/Services';
import Packages from '../components/About';
import Rules from '../components/Rules';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { detectLocale } from '../lib/i18n';
import { pageSEO } from '../config/seo.config';

export default function Home({ locale: initialLocale }) {
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState(initialLocale);

  useEffect(() => {
    setMounted(true);
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const cookieLocale = document.cookie.split('; ').find(row => row.startsWith('locale='))?.split('=')[1];

    if (urlLang === 'tr' || urlLang === 'en') {
      setLocale(urlLang);
    } else if (cookieLocale === 'tr' || cookieLocale === 'en') {
      setLocale(cookieLocale);
    }
  }, []);

  const seoConfig = locale === 'tr' ? {
    title: "Luma Studios | Fullstack Web Geliştirme Stüdyosu",
    description: "Web uygulamaları, admin paneller, API'ler ve komple dijital ürünler geliştiriyoruz. Paket bazlı çalışma, net fiyatlandırma.",
    canonical: "https://lumastudios.com",
    keywords: "web geliştirme, fullstack, react, node.js, web uygulama, yazılım stüdyosu"
  } : {
    title: "Luma Studios | Fullstack Web Development Studio",
    description: "We build web applications, admin panels, APIs, and complete digital products. Package-based work, clear pricing.",
    canonical: "https://lumastudios.com",
    keywords: "web development, fullstack, react, node.js, web application, software studio"
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.description} />
        <link rel="canonical" href={seoConfig.canonical} />
        <meta name="keywords" content={seoConfig.keywords} />

        {/* Open Graph */}
        <meta property="og:url" content={seoConfig.canonical} />
        <meta property="og:title" content={seoConfig.title} />
        <meta property="og:description" content={seoConfig.description} />
        <meta property="og:locale" content={locale === 'tr' ? 'tr_TR' : 'en_US'} />

        {/* Language alternates */}
        <link rel="alternate" hrefLang="en" href="https://lumastudios.com?lang=en" />
        <link rel="alternate" hrefLang="tr" href="https://lumastudios.com?lang=tr" />
        <link rel="alternate" hrefLang="x-default" href="https://lumastudios.com" />
      </Head>
      <Header locale={locale} />
      <main className="min-h-screen bg-[#0a0a0a]">
        <Hero locale={locale} />
        <Expertise locale={locale} />
        <Packages locale={locale} />
        <Rules locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}

export async function getStaticProps() {
  const locale = 'en';

  return {
    props: {
      locale,
    },
    revalidate: 3600,
  };
}
