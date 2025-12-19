// SEO Configuration for Luma Studios
// Optimized for international clients and investors

export const defaultSEO = {
  titleTemplate: '%s | Luma Studios - Enterprise Web Development',
  defaultTitle: 'Luma Studios - Custom Web & Mobile Development for International Businesses',
  description: 'Enterprise-grade web and mobile application development for international businesses and investors. From MVP to scalable production in 1 week. Based in Turkey, serving global clients.',
  canonical: 'https://lumastudios.com',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lumastudios.com',
    site_name: 'Luma Studios',
    title: 'Luma Studios - Enterprise Web Development for International Clients',
    description: 'Custom web and mobile solutions for businesses and investors worldwide. Rapid MVP delivery, scalable architecture, proven results.',
    images: [
      {
        url: 'https://lumastudios.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luma Studios - Web Development Agency',
      },
    ],
  },
  
  twitter: {
    handle: '@lumastudios',
    site: '@lumastudios',
    cardType: 'summary_large_image',
  },
  
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'web development, mobile app development, MVP development, software consulting, enterprise web solutions, international web development, Turkey software agency, React development, Next.js development',
    },
    {
      name: 'author',
      content: 'Luma Studios',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5',
    },
    {
      name: 'theme-color',
      content: '#7c3aed',
    },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    {
      name: 'language',
      content: 'English',
    },
    {
      name: 'geo.region',
      content: 'TR',
    },
    {
      name: 'geo.placename',
      content: 'Bursa',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
  ],
  
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
};

export const pageSEO = {
  homepage: {
    title: 'Enterprise Web & Mobile Development for International Businesses',
    description: 'Luma Studios delivers production-ready web and mobile applications for international businesses and investors. MVP in 1 week. Scalable architecture. Proven track record with global clients.',
    canonical: 'https://lumastudios.com',
    keywords: 'enterprise web development, MVP development, international software agency, rapid application development, scalable web solutions, Turkey tech company',
  },
  
  homepageTr: {
    title: 'Uluslararası İşletmeler için Kurumsal Web & Mobil Geliştirme',
    description: 'Luma Studios, uluslararası işletmeler ve yatırımcılar için üretime hazır web ve mobil uygulamalar sunuyor. 1 haftada MVP. Ölçeklenebilir mimari. Küresel müşterilerle kanıtlanmış başarı.',
    canonical: 'https://lumastudios.com?lang=tr',
    keywords: 'kurumsal web geliştirme, MVP geliştirme, uluslararası yazılım ajansı, hızlı uygulama geliştirme, ölçeklenebilir web çözümleri',
  },
};
