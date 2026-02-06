import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for better performance */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Theme color for mobile browsers - Neon Cyan */}
        <meta name="theme-color" content="#00FFFF" />

        {/* Google Ads Tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17861187514" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17861187514');
            `,
          }}
        />
        
        {/* Structured Data for SEO - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Luma Studios",
              "description": "Enterprise web and mobile development for international businesses and investors",
              "url": "https://lumastudios.com",
              "logo": "https://lumastudios.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+90-546-780-5972",
                "contactType": "Customer Service",
                "email": "enespoyraz380@gmail.com",
                "availableLanguage": ["English", "Turkish"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bursa",
                "addressCountry": "TR"
              },
              "sameAs": [
                "https://github.com/lumastudios",
                "https://linkedin.com/company/lumastudios"
              ]
            })
          }}
        />
        
        {/* Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Luma Studios",
              "image": "https://lumastudios.com/logo.png",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bursa",
                "addressCountry": "TR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.1826,
                "longitude": 29.0665
              },
              "url": "https://lumastudios.com",
              "telephone": "+90-546-780-5972",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              }
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
