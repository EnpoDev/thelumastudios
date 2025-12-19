import "../public/styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Head from 'next/head';
import { defaultSEO } from '../config/seo.config';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Default SEO tags */}
        <title>{defaultSEO.defaultTitle}</title>
        <meta name="description" content={defaultSEO.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#7c3aed" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Luma Studios" />
        <meta property="og:title" content={defaultSEO.openGraph.title} />
        <meta property="og:description" content={defaultSEO.openGraph.description} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lumastudios" />
        
        {/* Additional meta tags */}
        {defaultSEO.additionalMetaTags.map((tag, index) => (
          tag.httpEquiv ? (
            <meta key={index} httpEquiv={tag.httpEquiv} content={tag.content} />
          ) : (
            <meta key={index} name={tag.name} content={tag.content} />
          )
        ))}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
